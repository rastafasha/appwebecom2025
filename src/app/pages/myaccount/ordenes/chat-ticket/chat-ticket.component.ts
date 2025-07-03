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
  public socket = io(environment.soketServer);
  public close_ticket = false;
  public estado_ticket:any;

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
      console.log(this.identity);
    }
  }


  ngOnInit(): void {

    if(this.identity){
      this.url = environment.baseUrl;
      this._route.params.subscribe(
        params=>{
          this.id = params['id'];

        }
      );

      this.socket.on('new-formmsm', (data: any) => {
        if(data.data){
          this._ticketService.get_ticket(this.id).subscribe(
            response =>{
              this.ticket = response;
              this.estado_ticket = this.ticket.estado;


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

      this.listar_msms();

      this._userService.get_user('653fdd4c6ce3256e60272a06').subscribe(//hablar con admin
        response =>{
          console.log(response);
          this.poster_admin = response.usuario.img;
        },
        error=>{

        }
      );

      this._ticketService.get_ticket(this.id).subscribe(
        response =>{
          this.ticket = response.ticket;
          this.estado_ticket = this.ticket.estado;


        },
        error=>{

        }
      );

    }else{
      this._router.navigate(['/']);
    }




  }

  ngDoCheck(): void {

  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  listar_msms(){debugger
    this._ticketService.data(this.identity.uid,'653fdd4c6ce3256e60272a06').subscribe(
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
          para:'5ef640b75ee066601c6ed1c0',
          msm:msmForm.value.msm,
          ticket:this.id,
          status: 0,
          estado: 0
        }
        this._ticketService.send(data).subscribe(
          response =>{
            console.log(response);
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
          para:'5ef640b75ee066601c6ed1c0',
          msm:msmForm.value.msm,
          ticket:this.id,
          status: 0,
          estado: null
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
    // try {
    //   this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    // } catch(err) { }
  }

}
