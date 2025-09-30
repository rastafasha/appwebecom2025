import { Component, OnInit, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import io from "socket.io-client";
import { environment } from '../../../../../environments/environment';
import { TicketService } from '../../../../services/ticket.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { FooterComponent } from '../../../../shared/footer/footer.component';
import { AsideCuentaComponent } from '../../aside-cuenta/aside-cuenta.component';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from '../../../../pipes/imagen-pipe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAgoPipe } from '../../../../pipes/date-ago.pipe';
import { Usuario } from '../../../../models/usuario.model';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-chat-ticket',
  imports:[
    CommonModule,
    RouterModule,
    HeaderComponent,
    RouterModule,
    FooterComponent,
    AsideCuentaComponent,
    ReactiveFormsModule,
    FormsModule,
    DateAgoPipe
  ],
  templateUrl: './chat-ticket.component.html',
  styleUrls: ['./chat-ticket.component.css']
})
export class ChatTicketComponent implements OnInit, DoCheck {

  // @ViewChild('scrollMe', {static: false}) private myScrollContainer: ElementRef;


  public identity: any = {};
  public url!:string;
  public id!:string;
  public msm = '';
  public msm_error=false;
  public mensajes : Array<any> = [];
  public poster_admin:any;
  public ticket : any = {};
  public tickets : any = {};
  public socket = io(environment.soketServer);
  public close_ticket = false;
  public estado_ticket:any;
  public usuarios!:Usuario[];
  public usuario!:Usuario;
  vendedorSeleccionado!: Usuario;
  id_vendedor!: Usuario;
  myScrollContainer: any;


  constructor(
    private _userService: UsuarioService,
    private _router : Router,
    private _route :ActivatedRoute,
    private http: HttpClient,
    private _ticketService : TicketService
  ) {
     let USER = localStorage.getItem('user');
    if(USER){
      this.identity = JSON.parse(USER);
    }
  }


  ngOnInit(): void {
    // this.getUserAdmin();
    if(this.identity){
      this.url = environment.baseUrl;
      this._route.params.subscribe(
        params=>{this.id = params['id']; }
      );

      this._ticketService.get_ticketVenta(this.id).subscribe(
            (resp:any) =>{
              console.log(resp)
              this.tickets = resp.tickets;
              this.estado_ticket = this.tickets.estado;
    
            }
          );


      this.socket.on('new-formmsm', (data: any) => {
        if(data.data){
          this._ticketService.get_ticketVenta(this.id).subscribe(
            (resp:any) =>{
              this.ticket = resp.ticket;
              this.estado_ticket = this.ticket.estado;
              console.log(resp)

            },
            error=>{

            }
          );
        }
      });

      this.socket.on('new-mensaje', function (this: ChatTicketComponent, data: any) {
        this.mensajes = [];
        this.listar_msms();

      }.bind(this));

      // this.listar_msms();

      this._userService.get_user(this.identity.uid).subscribe(//hablar con admin
        (response:any) =>{
          this.poster_admin = response.usuario.img;
        },
        error=>{

        }
      );

      

    }else{
      this._router.navigate(['/']);
    }




  }

  getUserAdmin(){
    this._userService.cargarTodosUsuarios().subscribe((resp:any)=>{
      this.usuarios = resp.filter((user: Usuario) =>  user.role === 'VENTAS' || user.role === 'TIENDA' || user.role === 'ALMACEN');
      // this.usuarios = resp;
      // console.log(this.usuarios)
      
    })
  }

  get_vendedor(id_vendedor:any){
    id_vendedor = this.id_vendedor
    this.listar_msms();
  }

  

  ngDoCheck(): void {

  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  listar_msms(){
    this._ticketService.data(this.identity.uid,this.id_vendedor).subscribe(
      response=>{

        this.mensajes = response;

        this.mensajes.forEach(element => {
          if(element.ticket == this.id){
            this.mensajes.push(element);
          }
        });
        this.scrollToBottom();
        console.log(this.mensajes);

      },
      error=>{
        console.log(error);

      }
    );
  }

  sendMessage(msmForm:any){
    if(msmForm.valid){

      if(this.close_ticket){
        //  enviar y cerrar ticket
        let data={
          de:this.identity.uid,
          para:this.id_vendedor,
          msm:msmForm.value.msm,
          ticket:this.id,
          status: 0,
          estado: 0
        }
        this._ticketService.send(data).subscribe(
          response =>{
            this.msm = '';
            this.socket.emit('save-mensaje', {new:true});
            this.scrollToBottom();
            this.socket.emit('save-formmsm', {data:true});
          },
          error=>{
            console.log(error);

          }
        );
      }
      else{
        let data={
          de:this.identity.uid,
          para:this.id_vendedor,
          msm:msmForm.value.msm,
          ticket:this.id,
          status: 1,
          estado: 1
        }
        this._ticketService.send(data).subscribe(
          response =>{
            console.log(response);
            this.msm = '';
            this.socket.emit('save-mensaje', {new:true});
            this.scrollToBottom();
          },
          error=>{
            console.log(error);

          }
        );
      }
    }else{
      this.msm_error =true;
    }
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

}
