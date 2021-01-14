import {Component, OnInit} from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import {log} from 'util';
import {User} from '../model/user';
import {Post} from '../model/post';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.scss']
})
export class WebsocketComponent implements OnInit {
  idRomChat: number;
  title = 'grokonez';
  description = 'Angular-WebSocket Demo';
  user: User;
  greetings: string[] = [];
  disabled = true;
  name: string;
  message: string;
  private stompClient = null;

  constructor(private http: HttpClient) {
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
  async connect(username, userNameFriend, idRomChat, name, message) {

    userNameFriend = 'tuyet';
    username = 'toan';

    const id = await this.getRomChat(username, userNameFriend);
    idRomChat = this.idRomChat;
    name = 'toan';
    message = this.message;

    const socket = new WebSocket('ws://localhost:8080/gkz-stomp-endpoint/websocket');
    this.stompClient = Stomp.over(socket);
    const thisSocket = this;
    this.stompClient.connect({}, function(frame) {
      thisSocket.setConnected(true);
      thisSocket.stompClient.subscribe('/topic/public/' + idRomChat, function(hello) {
        thisSocket.showGreeting(hello.body);
      });
      thisSocket.stompClient.send('/gkz/chatVsUser', {},
        JSON.stringify({'name': name, 'message': message, 'userNameFriend': userNameFriend}));

    });
  }

  async getRomChat(userName1, userName2) {
    const url = 'http://localhost:8080/api/findRomChat/' + userName1 + '/' + userName2;
    this.idRomChat = await this.http.get<number>(url).toPromise();
    console.log('-----------------------------');
    console.log(this.idRomChat);
    console.log('-----------------------------');

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
