import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { SocketIo } from '../model/socket-model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {}

  socket = io(environment.urlSocket);

  public sendMessage(user: string, content: string) {
    this.socket.emit('message', {
      user,
      content,
    });
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };
}
