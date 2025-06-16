import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CarritoService } from "src/app/services/carrito.service";
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/product.service';
import {environment} from 'src/environments/environment';

import { CuponService } from "src/app/services/cupons.service";
import { PostalService } from "src/app/services/postal.service";
import { DireccionService } from "src/app/services/direccion.service";
import { VentaService } from "src/app/services/venta.service";

declare var paypal;


declare var jQuery:any;
declare var $:any;

import { WebSocketService } from 'src/app/services/web-socket.service';
import * as io from "socket.io-client";
import { Direccion } from '../../models/direccion.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransferenciasService } from 'src/app/services/transferencias.service';
import { PaymentMethod } from 'src/app/models/paymenthmethod.model';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  @ViewChild('paypal',{static:true}) paypalElement : ElementRef;

  public direcciones:any =[];
  public identity;
  public carrito : Array<any> = [];
  public subtotal : any = 0;
  public url;
  public cupon;
  public msm_error_cupon=false;
  public msm_success_cupon=false;
  public new_data_descuento;
  public data_keyup = 0;
  public data_save_carrito;
  public msm_error = '';
  public productos : any = {};
  public cursos : any = {};

  public paypal;

  public postales;

  public precio_envio;

  public socket = io(environment.soketServer);

  public no_direccion = 'no necesita direccion';


  //DATA
  public radio_postal;
  public medio_postal : any = {};
  public data_cupon;
  public id_direccion = '';
  public direccion : any;
  public data_direccion : any = {};
  public data_detalle : Array<any> = [];
  public data_venta : any = {};
  public info_cupon_string = '';
  public error_stock = false;
  public date_string;

  selectedMethod: string = 'Selecciona un método de pago';

  habilitacionFormTransferencia:boolean = false;

  paymentMethods:PaymentMethod[] = []; //array metodos de pago para transferencia (dolares, bolivares, movil)
  paymentSelected!:PaymentMethod; //metodo de pago seleccionado por el usuario para transferencia

  formTransferencia = new FormGroup({
    metodo_pago: new FormControl('',Validators.required),
    bankName: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    referencia: new FormControl('',Validators.required),
    name_person: new FormControl('', Validators.required),
    phone: new FormControl('',Validators.required),
    paymentday: new FormControl('', Validators.required)
  });

  constructor(
    private _userService: UsuarioService,
    private _router : Router,
    private _route :ActivatedRoute,
    private _productoService : ProductoService,
    private _carritoService:CarritoService,
    private _cuponService :CuponService,
    private _postalService :PostalService,
    private _direccionService :DireccionService,
    private _ventaService :VentaService,
    private webSocketService: WebSocketService,
    private _trasferencias: TransferenciasService

  ) {
    this.identity = _userService.usuario;
    this.url = environment.baseUrl;
  }

  ngOnInit(): void {

    this.listar_direcciones();
    this.listar_postal();
    this.listar_carrito();
    this.obtenerMetodosdePago();
    
    if(this.identity){
      this.socket.on('new-stock', function (data) {
        this.listar_carrito();

      }.bind(this));

      $('#card-pay').hide();
      $('#btn-back-data').hide();
      $('#card-data-envio').hide();

      this.renderPayPalButton();
      this.url = environment.baseUrl;
      this.carrito_real_time();

    }else{
      this._router.navigate(['/']);
    }

  }

  private obtenerMetodosdePago(){
    this._trasferencias.getPayments().subscribe(data => {
      // console.log('metodos de pago: ',data.paymentMethods)
      this.paymentMethods = data.paymentMethods;
      console.log('metodos de pago: ',this.paymentMethods)
    });
  }

  // metodo para el cambio del select 'tipo de transferencia'
  onChangePayment(event:Event){
    const target = event.target as HTMLSelectElement; //obtengo el valor
    // console.log(target.value)

    // guardo el metodo seleccionado en la variable de clase paymentSelected
    this.paymentSelected = this.paymentMethods.filter(method => method._id===target.value)[0]
  }

  sendFormTransfer(){
    if(this.formTransferencia.valid){
      // llamo al servicio
      this._trasferencias.createTransfer(this.formTransferencia.value).subscribe(resultado => {
        console.log('resultado: ',resultado);
        this.verify_dataComplete();
        if(resultado.ok){
          // transferencia registrada con exito
          console.log(resultado.payment);
          alert('Transferencia registrada con exito');
        }
        else{
          // error al registar la transferencia
          alert('Error al registrar la transferencia');
          console.log(resultado.msg);
        }
      });
    }
  }

  // Método que se llama cuando cambia el select
  onPaymentMethodChange(event: any) {
    this.selectedMethod = event.target.value;
    this.renderPayPalButton(); // Renderiza el botón de nuevo según la opción seleccionada
  }

  private renderPayPalButton(){
    // Primero, limpiar el contenedor anterior
    this.paypalElement.nativeElement.innerHTML = '';

    if(this.selectedMethod==='card' || this.selectedMethod==='paypal'){
      // deshabilitar el formulario de pago con transferencia
      this.habilitacionFormTransferencia = false;
      // Cargar el botón de PayPal con las opciones seleccionadas
    this.paypalBotones();
    }
    else if(this.selectedMethod==='transferencia'){
      // transferencia bancaria => abrir formulario (en un futuro un modal con formulario)
      this.habilitacionFormTransferencia = true;
    }
    // 
  }

  private paypalBotones(){
    paypal.Buttons({

      createOrder: (data,actions)=>{
        //VALIR STOCK DE PRODUCTOS
        this.data_venta.detalles.forEach(element => {
            if(element.producto.stock == 0){
              this.error_stock = true;
            }else{
              this.error_stock = false;
            }

        });

        if(!this.error_stock){
          return actions.order.create({
            purchase_units : [{
              description : 'Compra en Linea',
              amount : {
                currency_code : 'USD',
                value: Math.round(this.subtotal),
              }

            }]
          });
        }else{
          this.error_stock = true;
          this.listar_carrito();
        }
      },
      onApprove : async (data,actions)=>{
        const order = await actions.order.capture();
        console.log(order);
        this.data_venta.idtransaccion = order.purchase_units[0].payments.captures[0].id;
        this._ventaService.registro(this.data_venta).subscribe(
          response =>{
            this.data_venta.detalles.forEach(element => {
              console.log(element);
              this._productoService.aumentar_ventas(element.producto._id).subscribe(
                response =>{
                },
                error=>{
                  console.log(error);

                }
              );
                this._productoService.reducir_stock(element.producto._id,element.cantidad).subscribe(
                  response =>{
                    this.remove_carrito();
                    this.listar_carrito();
                    this.socket.emit('save-carrito', {new:true});
                    this.socket.emit('save-stock', {new:true});
                    this._router.navigate(['/app/cuenta/ordenes']);
                  },
                  error=>{
                    console.log(error);

                  }
                );
            });

          },
          error=>{
            console.log(error);

          }
        );
      },
      // Define si el pago será con tarjeta o PayPal
      fundingSource: this.selectedMethod === 'card' ? paypal.FUNDING.CARD : paypal.FUNDING.PAYPAL, //agregado
      onError : err =>{
        console.log(err);

      }
    }).render(this.paypalElement.nativeElement);
  }

  remove_carrito(){
    this.carrito.forEach((element,index) => {
        this._carritoService.remove_carrito(element._id).subscribe(
          response =>{
            this.listar_carrito();
          },
          error=>{
            console.log(error);
          }
        );
    });
  }

 

  carrito_real_time(){
    this.socket.on('new-carrito_dos', function (data) {
      this.subtotal = 0;

      this._carritoService.preview_carrito(this.identity.uid).subscribe(
        response =>{
          this.carrito = response;

          this.carrito.forEach(element => {
            this.subtotal = Math.round(this.subtotal + (element.precio * element.cantidad));
          });

        },
        error=>{
          console.log(error);

        }
      );

    }.bind(this));
  }

  listar_postal(){
    this._postalService.listar().subscribe(
      response =>{
        this.postales = response.postales
        this.postales.forEach((element,index) => {
          if(index == 0){
            this.radio_postal = element._id;
            this.medio_postal = {
              tipo_envio : element.titulo,
              precio: element.precio,
              tiempo: element.tiempo,
              dias : element.dias
            };
            this.precio_envio = element.precio;
          }
        });

      },
      error=>{

      }
    );
  }
  select_postal(event,data){
    //RESTAR PRECIO POSTAL ANTERIOR
    this.subtotal = Math.round(this.subtotal - parseInt(this.medio_postal.precio));

    this.medio_postal = {
      tipo_envio : data.titulo,
      precio: data.precio,
      tiempo: data.tiempo,
      dias: data.dias,
    }
    this.subtotal = Math.round(this.subtotal + parseInt(this.medio_postal.precio));

  }

  listar_direcciones(){
    this._direccionService.listarUsuario(this.identity.uid).subscribe(
      response =>{
        this.direcciones = response;
        console.log(this.direcciones);
      },
      error=>{

      }
    );
  }

  get_direccion(id_direccion:any){
    this.data_direccion = id_direccion;
    this._direccionService.get_direccion(this.data_direccion).subscribe(
      response =>{
        this.data_direccion = response;
        console.log(this.data_direccion);
      }
    );

  }


  listar_carrito(){
    this._carritoService.preview_carrito(this.identity.uid).subscribe(
      response =>{
        this.carrito = response;
        this.subtotal = 0;
        this.carrito.forEach(element => {
          this.subtotal = Math.round(this.subtotal + (element.precio * element.cantidad));
          this.data_detalle.push({
            producto : element.producto,
            cantidad: element.cantidad,
            precio: Math.round(element.precio),
            color: element.color,
            selector : element.selector
          })
          console.log(this.carrito);

        });
        this.subtotal = Math.round(this.subtotal + parseInt(this.precio_envio));

      },
      error=>{
        console.log(error);

      }
    );
  }



  remove_producto(id){
    this._carritoService.remove_carrito(id).subscribe(
      response=>{
        this.subtotal = Math.round(this.subtotal - (response.carrito.precio*response.carrito.cantidad));
        this._carritoService.preview_carrito(this.identity.uid).subscribe(
          response =>{
            this.carrito = response;
            this.socket.emit('save-carrito', {new:true});
            this.listar_carrito();
          },
          error=>{
            console.log(error);

          }
        );
        this._carritoService.preview_carrito(this.identity.uid).subscribe(
          response =>{
            this.carrito = response.carrito;
            this.data_detalle = [];
            this.carrito.forEach(element => {
              this.data_detalle.push({
                producto : element.producto,
                cantidad: element.cantidad,
                precio: element.precio,
                color: element.color,
                selector : element.selector
              })
            });
            console.log(this.data_detalle);


          },
          error=>{
            console.log(error);

          }
        );


      },
      error=>{

      }
    );
  }

  
  get_data_cupon(event,cupon){
    this.data_keyup = this.data_keyup + 1;

    if(cupon){
      if(cupon.length == 13){
        console.log('siii');

        this._cuponService.get_cuponCode(cupon).subscribe(
          response =>{
            this.data_cupon = response[0];
            console.log(this.data_cupon);

            this.msm_error_cupon = false;
            this.msm_success_cupon = true;

            this.carrito.forEach((element,indice) => {
                if(response.tipo == 'subcategoria'){
                  if(response.subcategoria == element.producto.subcategoria){

                    if(this.data_keyup == 0 || this.data_keyup == 1){

                      let new_subtotal = element.precio - ((element.precio*response.descuento)/100);
                      console.log(new_subtotal);
                      element.precio = new_subtotal;

                      this.subtotal = 0;
                      this.carrito.forEach(element => {
                        this.subtotal = Math.round(this.subtotal + (element.precio * element.cantidad));
                      });

                    }
                  }
                }
                if(response.tipo == 'categoria'){
                  if(response.categoria == element.producto.categoria){

                    if(this.data_keyup == 0 || this.data_keyup == 1){

                      let new_subtotal = element.precio - ((element.precio*response.descuento)/100);
                      console.log(new_subtotal);
                      element.precio = new_subtotal;

                      this.subtotal = 0;
                      this.carrito.forEach(element => {
                        this.subtotal = Math.round(this.subtotal + (element.precio * element.cantidad));
                      });

                    }

                  }
                }
            });

          },
          error=>{
            this.data_keyup = 0;
            this.msm_error_cupon = true;

            this.msm_success_cupon = false;
            this.listar_carrito();
            this.listar_postal();
          }
        );
      }else{
        console.log('nooo');

        this.data_keyup = 0;
        this.msm_error_cupon = false;
        this.msm_success_cupon = false;
        this.listar_carrito();

      }
    }else{
      this.data_keyup = 0;
        this.msm_error_cupon = false;
        this.msm_success_cupon = false;
        this.listar_carrito();

    }

  }

  

  verify_data(){
    if(this.id_direccion){
      this.msm_error = '';
      $('#btn-verify-data').animate().hide();
      $('#btn-back-data').animate().show();

      $('#card-data-envio').animate().show();

      $('#card-pay').animate().show('fast');
      $('.cart-data-venta').animate().hide('fast');



      if(this.data_cupon){
        if(this.data_cupon.categoria){
          this.info_cupon_string = this.data_cupon.descuento + '% de descuento en ' + this.data_cupon.categoria.nombre;
        }else if(this.data_cupon.subcategoria){
          this.info_cupon_string = this.data_cupon.descuento + '% de descuento en ' + this.data_cupon.subcategoria;
        }
      }

      var fecha = new Date();

      var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Novimbre", "Deciembre"];
      fecha.setDate(fecha.getDate() + parseInt(this.medio_postal.dias));
      this.date_string =  fecha.getDate() +' de ' + months[fecha.getMonth()] + ' del ' + fecha.getFullYear();


      this.data_venta = {
        user : this.identity.uid,
        total_pagado : this.subtotal,
        codigo_cupon : this.cupon,
        info_cupon :  this.info_cupon_string,
        idtransaccion : null,
        // metodo_pago : 'Paypal',

        tipo_envio: this.medio_postal.tipo_envio,
        precio_envio: this.medio_postal.precio,
        tiempo_estimado: this.date_string,

        direccion: this.data_direccion.direccion,
        destinatario: this.data_direccion.nombres_completos,
        detalles:this.data_detalle,
        referencia: this.data_direccion.referencia,
        pais: this.data_direccion.pais,
        ciudad: this.data_direccion.ciudad,
        zip: this.data_direccion.zip,
      }

      console.log(this.data_venta);


    }else{
      this.msm_error = "Seleccione una dirección de envio.";
    }

  }

  verify_dataComplete(){
    if(this.id_direccion){
      this.msm_error = '';
      $('#btn-verify-data').animate().hide();
      $('#btn-back-data').animate().show();

      $('#card-data-envio').animate().show();

      $('#card-pay').animate().show('fast');
      $('.cart-data-venta').animate().hide('fast');



      if(this.data_cupon){
        if(this.data_cupon.categoria){
          this.info_cupon_string = this.data_cupon.descuento + '% de descuento en ' + this.data_cupon.categoria.nombre;
        }else if(this.data_cupon.subcategoria){
          this.info_cupon_string = this.data_cupon.descuento + '% de descuento en ' + this.data_cupon.subcategoria;
        }
      }

      var fecha = new Date();

      var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Novimbre", "Deciembre"];
      fecha.setDate(fecha.getDate() + parseInt(this.medio_postal.dias));
      this.date_string =  fecha.getDate() +' de ' + months[fecha.getMonth()] + ' del ' + fecha.getFullYear();


      this.data_venta = {
        user : this.identity.uid,
        total_pagado : this.subtotal,
        codigo_cupon : this.cupon,
        info_cupon :  this.info_cupon_string,
        idtransaccion : null,
        metodo_pago : this.selectedMethod,
        // metodo_pago : 'Paypal',

        tipo_envio: this.medio_postal.tipo_envio,
        precio_envio: this.medio_postal.precio,
        tiempo_estimado: this.date_string,

        direccion: this.data_direccion.direccion,
        destinatario: this.data_direccion.nombres_completos,
        detalles:this.data_detalle,
        referencia: this.data_direccion.referencia,
        pais: this.data_direccion.pais,
        ciudad: this.data_direccion.ciudad,
        zip: this.data_direccion.zip,
      }

      console.log(this.data_venta);

      this.saveVenta();

    }else{
      this.msm_error = "Seleccione una dirección de envio.";
    }

  }

  saveVenta(){
    this._ventaService.registro(this.data_venta).subscribe(response =>{
      this.data_venta.detalles.forEach(element => {
        console.log(element);
        this._productoService.aumentar_ventas(element.producto._id).subscribe(
          response =>{
          },
          error=>{
            console.log(error);

          }
        );
          this._productoService.reducir_stock(element.producto._id,element.cantidad).subscribe(
            response =>{
              this.remove_carrito();
              this.listar_carrito();
              this.socket.emit('save-carrito', {new:true});
              this.socket.emit('save-stock', {new:true});
              this._router.navigate(['/app/cuenta/ordenes']);
            },
            error=>{
              console.log(error);

            }
          );
      });

    },)
    }

    back_data(){
    $('#btn-verify-data').animate().show();
    $('#btn-back-data').animate().hide();

    $('#card-data-envio').animate().hide();

    $('#card-pay').animate().hide('fast');
      $('.cart-data-venta').animate().show('fast');
  }
}
