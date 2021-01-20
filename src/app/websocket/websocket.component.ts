import {Component, OnInit} from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import {log} from 'util';
import {User} from '../model/user';
import {Post} from '../model/post';
import {HttpClient} from '@angular/common/http';
import {Messenger} from '../model/messenger';

declare var $: any;

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
  userNameFriend = 'johntoan98';
  greetings: string[] = [];
  disabled = true;
  name: string;
  message = '';
  private stompClient = null;
  listUserFriend: User[];
  listMessenger: Messenger[];


  constructor(private http: HttpClient) {
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
  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  async showChatModal(id, userNameFriend) {
    const idRom = await this.connect(userNameFriend);
    const mess = await this.getAllMessengerByIdRom();
    $('#modalChat' + id).modal('show');

  };

  test() {
    console.log(this.userNameFriend);
    this.userNameFriend = 'johntoan982';
    console.log(this.userNameFriend);
  }

  async connect(userNameFriend) {

    let username = this.user.username;
    const createRom = await this.createRomChat(username, userNameFriend);
    const getRom = await this.getRomChat(username, userNameFriend);
    let idRomChat = this.idRomChat;
    let message = this.message;

    const socket = new WebSocket('ws://localhost:8080/gkz-stomp-endpoint/websocket');
    this.stompClient = Stomp.over(socket);
    const thisSocket = this;

    this.stompClient.connect({}, function(frame) {
      thisSocket.setConnected(true);
      // thisSocket.stompClient.subscribe('/topic/public/' + idRomChat, function(hello) {
      //   thisSocket.showGreeting(hello.body);
      // });
      thisSocket.stompClient.subscribe('/topic/public/' + idRomChat, function(hello) {
        thisSocket.showGreeting();
      });
      thisSocket.stompClient.send('/gkz/chatVsUser', {},
        JSON.stringify({'name': username, 'userNameFriend': userNameFriend}));

    });
  }

  getAllMessengerByIdRom() {
    const url = 'http://localhost:8080/api/allChat/' + this.idRomChat;
    this.http.get<Messenger[]>(url).subscribe((resJson) => {
      this.listMessenger = resJson;
      console.log(this.listMessenger);
    });
  }

  getAllFriend() {
    const url = 'http://localhost:8080/api/allFriendById/' + this.user.id;
    this.http.get<User[]>(url).subscribe((resJson) => {
      this.listUserFriend = resJson;
      console.log(this.listUserFriend);
    });
  }

  async getRomChat(userName1, userName2) {
    const url = 'http://localhost:8080/api/findRomChat/' + userName1 + '/' + userName2;
    this.idRomChat = await this.http.get<number>(url).toPromise();
    console.log('-----------------------------');
    console.log(this.idRomChat);
    console.log('-----------------------------');

  }

  createRomChat(userName1, userName2) {
    const url = 'http://localhost:8080/api/addRomchat/' + userName1 + '/' + userName2;
    this.http.get(url).subscribe((resJson) => {
        console.log('tạo phòng oke');
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
    this.message = '';
  }

  showGreeting() {
    this.getAllMessengerByIdRom();
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getAllFriend();
  }
}
