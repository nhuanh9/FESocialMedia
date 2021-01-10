import { Component, OnInit } from '@angular/core';
import {Post} from '../../../../model/post';
import {HttpClient} from '@angular/common/http';
import {AngularFireDatabase} from '@angular/fire/database';
import {User} from '../../../../model/user';
import {Images} from '../../../../model/images';
import * as firebase from 'firebase';
import {ActivatedRoute} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-yourwall',
  templateUrl: './yourwall.component.html',
  styleUrls: ['./yourwall.component.scss']
})
export class YourwallComponent implements OnInit {
  listPost: Post[];
  post: Post;
  user: User;
  images: Images;
  statusPost: number;
  contentPost: string;
  arrayPicture = '';
  param1: number;
  constructor(private http: HttpClient,
              private db: AngularFireDatabase,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.param1 = parseInt(this.route.snapshot.paramMap.get('param1'));
    console.log(this.param1 + '++++++++++++++++++++');
    this.statusPost = 1;
    this.getAllPost();
    this.getImgUserLogin();
  }
  getAllPost() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    const url = 'http://localhost:8080/api/allPostByUserId/' + this.user.id;
    this.http.get<Post[]>(url).subscribe((resJson) => {
      this.listPost = resJson;
      console.log('this.listPost');
      console.log(this.listPost);
      this.listPost.reverse();
    });
  }
  saveImg(value) {
    const file = value.target.files;
    const uploadTask = firebase.storage().ref('img/' + Date.now()).put(file[0]);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
      },
      () => {
        console.log('Error');
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.arrayPicture = downloadURL;
          console.log(this.arrayPicture);
        });
      }
    );
  }
  getImgUserLogin() {
    const url = 'http://localhost:8080/users/' + this.user.id;
    this.http.get<User>(url).subscribe((resJson) => {
      this.user = resJson;
      console.log('this.user');
      console.log(this.user);
    });
  }

  savePost() {
    this.post = {id: null, createAt: null, notification: null, content: this.contentPost, status: this.statusPost, user: null, postIdShear: null, imgs: this.arrayPicture};
    const url = 'http://localhost:8080/api/addPost/' + this.user.id;
    console.log(this.post);
    this.http.post(url, this.post).subscribe((resJson) => {
      alert('create thành công');
    }, error => {
      alert('create lỗi');
    });
  }
  updatePostNoImg(id) {
    this.post = {id: id, createAt: null, notification: null, content: this.contentPost, status: this.statusPost, user: null, postIdShear: null, imgs: this.arrayPicture};
    const url = 'http://localhost:8080/api/editPost/' + this.user.id;
    console.log(this.post);
    this.http.post(url, this.post).subscribe((resJson) => {
      alert('edit thành công');
    }, error => {
      alert('edit lỗi');
    });
  }

  updatePostAndImg(idPost, idImg) {
    this.post = {id: idPost, createAt: null, notification: null, content: this.contentPost, status: this.statusPost, user: null, postIdShear: null, imgs: this.arrayPicture};
    const url = 'http://localhost:8080/api/editPostAndImg/' + idImg;
    console.log(idImg);
    this.http.post(url, this.post).subscribe((resJson) => {
      alert('edit thành công');
    }, error => {
      alert('edit lỗi');
    });
  }

  showUpdatePost = (id, content, status) => {
    this.contentPost = content;
    this.statusPost = status;
    $('#myModal' + id).modal('show');
  }
  closeEditPost = () => {
    this.contentPost = '';
    this.statusPost = 1;
  }
}
