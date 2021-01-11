import {Component, OnInit} from '@angular/core';
import {User} from '../../../../model/user';
import {HttpClient} from '@angular/common/http';
import {Post} from '../../../../model/post';
import * as firebase from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';
import {Images} from '../../../../model/images';
import {Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  listPost: Post[];
  post: Post;
  user: User;
  images: Images;
  statusPost: number;
  contentPost: string;
  arrayPicture = '';

  constructor(private http: HttpClient,
              private db: AngularFireDatabase,
              private router: Router) {
  }

  ngOnInit() {
    this.statusPost = 1;
    this.getAllPost();
    this.getImgUserLogin();
  }

  setIdUserPost(id) {
    localStorage.setItem('idUserPost', id);
    this.router.navigate(['/friendswall']);
  }

  getAllPost() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    const url = 'http://localhost:8080/api/allPost';
    this.http.get<Post[]>(url).subscribe((resJson) => {
      this.listPost = resJson;
      console.log('this.listPost');
      console.log(this.listPost);
      this.listPost.reverse();
      this.getPostShare();
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

  getPostShare() {
    for (let i = 0; i < this.listPost.length; i++) {
      if (this.listPost[i].postIdShear != null) {
        const url = 'http://localhost:8080/api/findPostById/' + this.listPost[i].postIdShear;
        this.http.get<Post>(url).subscribe((resJson) => {
          this.listPost[i].post = resJson;
          console.log('ppppppppppppppppppppp');
          console.log(this.listPost[i].post);
        });
      }
    }
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

  deletePost(id) {
    const url = 'http://localhost:8080/api/deletePost/' + id;
    this.http.post(url, id).subscribe((resJson) => {
      alert('remote thành công');
    }, error => {
      alert('remote lỗi');
    });
  }

  sharePost(id) {
    this.post = {id: null, createAt: null, notification: null, content: this.contentPost, status: this.statusPost, user: null, postIdShear: id, imgs: this.arrayPicture};
    const url = 'http://localhost:8080/api/addPost/' + this.user.id;
    console.log(this.post);
    this.http.post(url, this.post).subscribe((resJson) => {
      alert('create thành công');
    }, error => {
      alert('create lỗi');
    });
  }

  updatePostAndImg(idPost, idImg, linkImg) {
    if (this.arrayPicture === '') {
      this.arrayPicture = linkImg;
    }
    this.post = {id: idPost, createAt: null, notification: null, content: this.contentPost, status: this.statusPost, user: null, postIdShear: null, imgs: this.arrayPicture};
    const url = 'http://localhost:8080/api/editPostAndImg/' + idImg;
    console.log(idImg);
    this.http.post(url, this.post).subscribe((resJson) => {
      alert('edit thành công');
    }, error => {
      alert('edit lỗi');
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

  showUpdatePost = (id, content, status) => {
    this.contentPost = content;
    this.statusPost = status;
    $('#myModal' + id).modal('show');
  };
  showSharePost = (id) => {
    $('#modalShare' + id).modal('show');
  };
  closeEditPost = () => {
    this.contentPost = '';
    this.statusPost = 1;
    this.arrayPicture = null;
  };
}
