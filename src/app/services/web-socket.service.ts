import {EventEmitter, Injectable} from '@angular/core';
import io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket: any;
  private interval: any;
  events = ['new-user', 'bye-user'];
  cbEvent: EventEmitter<any> = new EventEmitter<any>();

  public socketStatus = false;

  constructor() {
    this.socket = io(environment.soketServer);
    this.checkStatus();
    this.listener();
    this.startPing();
  }

  checkStatus(){
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    });
  }

  listener = () => {
    this.events.forEach(evenName => {
      this.socket.on(evenName, (data: any) => this.cbEvent.emit({
        name: evenName,
        data
      }));
    });
  };

  private startPing() {
    this.interval = setInterval(() => {
      if (this.socketStatus) {
        this.emit('ping', { timestamp: Date.now() });
      }
    }, 30000);
  }

  joinRoom = (data: any) => {
    this.socket.emit('join', data);
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  on(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.socket.disconnect();
  }
}
