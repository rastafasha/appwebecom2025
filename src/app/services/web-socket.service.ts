import {EventEmitter, Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  events = ['new-user', 'bye-user'];
  cbEvent: EventEmitter<any> = new EventEmitter<any>();


  public socketStatus = false;

  constructor(private socket: Socket) {
    this.checkStatus();
    this.listener();
  }


  checkStatus(){
    this.socket.on('evento', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });

  }


  listener = () => {
    this.events.forEach(evenName => {
      this.socket.on(evenName, data => this.cbEvent.emit({
        name: evenName,
        data
      }));
    });
  };

  joinRoom = (data) => {
    this.socket.emit('join', data);
  }
}
