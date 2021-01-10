import { Component, OnInit } from '@angular/core';
import {Post} from '../../../../model/post';
import {User} from '../../../../model/user';
import {Images} from '../../../../model/images';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-friendswall',
  templateUrl: './friendswall.component.html',
  styleUrls: ['./friendswall.component.scss']
})
export class FriendswallComponent implements OnInit {
  listPost: Post[];
  user: User;
  userPost: User;
  idUserPost: string;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllPost();
    this.getImgUserLogin();
    this.getImgUserPost();
  }
  getAllPost() {
    this.idUserPost = localStorage.getItem('idUserPost');
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    const url = 'http://localhost:8080/api/allPostByUserId/' + this.idUserPost;
    this.http.get<Post[]>(url).subscribe((resJson) => {
      this.listPost = resJson;
      console.log('this.listPost');
      console.log(this.listPost);
      this.listPost.reverse();
    });
  }
  getImgUserPost() {
    const url = 'http://localhost:8080/users/' + this.idUserPost;
    this.http.get<User>(url).subscribe((resJson) => {
      this.userPost = resJson;
    });
  }
  getImgUserLogin() {
    const url = 'http://localhost:8080/users/' + this.user.id;
    this.http.get<User>(url).subscribe((resJson) => {
      this.user = resJson;
      console.log('this.user');
      console.log(this.user);
    });
  }
}
