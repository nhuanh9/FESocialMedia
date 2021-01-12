import {Component, OnInit} from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import {log} from 'util';
import {User} from '../model/user';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.scss']
})
export class WebsocketComponent implements OnInit {
  title = 'grokonez';
  description = 'Angular-WebSocket Demo';
  user: User;
  greetings: string[] = [];
  disabled = true;
  name: string;
  message: string;
  private stompClient = null;

  constructor() {
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  // connect() {
  //   const socket = new WebSocket('ws://localhost:8080/gkz-stomp-endpoint/websocket');
  //   this.stompClient = Stomp.over(socket);
  //   const thisSocket = this;
  //   this.stompClient.connect({}, function (frame) {
  //     thisSocket.setConnected(true);
  //     console.log('Connected: -----' );
  //     console.log('Connected: ' + frame);
  //
  //     thisSocket.stompClient.subscribe('/topic/hii', function (hello) {
  //       thisSocket.showGreeting(JSON.parse(hello.body).greeting);
  //     });
  //   });
  // }
  connect(username, userNameFriend) {
    userNameFriend = 'johntoan';
    const socket = new WebSocket('ws://localhost:8080/gkz-stomp-endpoint/websocket');
    this.stompClient = Stomp.over(socket);
    const thisSocket = this;
    this.stompClient.connect({}, function(frame) {
      thisSocket.setConnected(true);
      console.log('Connected: -----');
      console.log('Connected: ' + frame);

      thisSocket.stompClient.subscribe('/topic/public/' + username + '/' + userNameFriend);
      thisSocket.stompClient.send('/gkz/chatVsUser', {},
        JSON.stringify({'name': this.name, 'message': this.message, 'userNameFriend': userNameFriend}));

    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }

  sendName() {
    console.log('AAAAAAAAA');
    console.log(this.stompClient);
    this.stompClient.send(
      '/gkz/chat.newUser',
      {},
      JSON.stringify({'name': this.user.username, 'message': this.message})
    );
  }

  showGreeting(message) {
    this.greetings.push(message);
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
    console.log(this.user.username);
  }
}
