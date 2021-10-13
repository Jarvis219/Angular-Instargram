import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
})
export class MessengerComponent implements OnInit {
  newMessage?: string;
  messageList: string[] = [];
  constructor(private socket: SocketService) {}

  ngOnInit(): void {
    this.socket.sendMessage('61653cd06bb73563da951e99', 'check socket');
    this.socket.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
      console.log(this.messageList);
    });
  }
}
