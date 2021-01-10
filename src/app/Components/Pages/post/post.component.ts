import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {HttpClient} from '@angular/common/http';
import {Post} from '../../../model/post';
import * as firebase from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';
import {Images} from '../../../model/images';
import {PostLikeService} from "../../../Services/post-like.service";
import {UserService} from "../../../Services/user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {Subscription} from "rxjs";
import {LikePost} from "../../../model/like-post";
import {CurrentUserLikePost} from "../../../model/CurrentUserLikePost";

declare var $: any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  listPost: Post[];
  listCurrentUserLikePost: CurrentUserLikePost[];
  post: Post;
  user: User;
  statusPost: number;
  contentPost: string;
  arrayPicture = '';
  currentUser: User;
  sub: Subscription;
  listLikePost: LikePost[];
  allLike: LikePost[];

  constructor(private http: HttpClient,
              private db: AngularFireDatabase,
              private postLikeService: PostLikeService,
              private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit() {
    this.getAllPost();
    this.getImgUserLogin();
  }

  getAllPost() {

    this.listCurrentUserLikePost = [];
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    const url = 'http://localhost:8080/api/allPost';
    const url1 = 'http://localhost:8080/users/' + this.user.id;
    this.http.get<User>(url1).subscribe((result) => {
      this.currentUser = result;
      this.http.get<Post[]>(url).subscribe((resJson) => {
        this.listPost = resJson;
        this.listPost.reverse();
        this.postLikeService.getAll().subscribe(value => {
          this.allLike = value;
          console.log(value)
          for (let i = 0; i < this.listPost.length; i++) {
            let currPost: CurrentUserLikePost = {
              user: this.currentUser,
              post: this.listPost[i],
            }
            for (let j = 0; j < this.allLike.length; j++) {
              if (this.allLike[j].user.id == this.currentUser.id
                && this.allLike[j].postEntity.id == this.listPost[i].id
                && this.allLike[j].liked)
                currPost.is_liked = true;
            }
            this.listCurrentUserLikePost.push(currPost);
          }
          console.log(this.listCurrentUserLikePost);
        })

      });
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

  savePost() {
    this.post = {
      id: null,
      createAt: null,
      notification: null,
      content: this.contentPost,
      status: this.statusPost,
      user: null,
      postIdShear: null,
      imgs: this.arrayPicture
    };
    const url = 'http://localhost:8080/api/addPost/' + this.user.id;
    console.log(this.post);
    this.http.post(url, this.post).subscribe((resJson) => {
      alert('create thành công');
      this.getAllPost();
    }, error => {
      alert('create lỗi');
    });
  }

  updatePost(id) {
    this.post = {
      id: id,
      createAt: null,
      notification: null,
      content: this.contentPost,
      status: this.statusPost,
      user: null,
      postIdShear: null,
      imgs: this.arrayPicture
    };
    const url = 'http://localhost:8080/api/editPost/' + this.user.id;
    console.log(this.post);
    this.http.post(url, this.post).subscribe((resJson) => {
      alert('edit thành công');
    }, error => {
      alert('edit lỗi');
    });
  }

  getAllLikesByPostId(id) {
    const url = 'http://localhost:8080/api/posts/' + id + '/post-likes';
    this.http.get<LikePost[]>(url).subscribe(value => {
      this.listLikePost = value;
      let str = 'Người dùng đã thích bài viết: ';
      for (let j = 0; j < this.listLikePost.length; j++) {
        str += this.listLikePost[j].user.username;
      }
    })
  }

  updatePostAndImg(idPost, idImg) {
    this.post = {
      id: idPost,
      createAt: null,
      notification: null,
      content: this.contentPost,
      status: this.statusPost,
      user: null,
      postIdShear: null,
      imgs: this.arrayPicture
    };
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

  showUpdatePost = (id) => {
    $('#myModal' + id).modal('show');
  }

  like(id) {
    const url1 = 'http://localhost:8080/users/' + this.user.id;
    this.http.get<User>(url1).subscribe((result) => {
      const url = 'http://localhost:8080/api/findPostById/' + id;
      this.http.get<LikePost>(url).subscribe(value => {
        let like: LikePost = {
          user: result,
          postEntity: value,
        }
        this.postLikeService.like(like).subscribe(() => {
          // alert("Liked");
          this.getAllPost();
        }, error => {
          console.log(error);
        })
      });
    });

  }

  unlike(id) {
    const url1 = 'http://localhost:8080/users/' + this.user.id;
    this.http.get<User>(url1).subscribe((result) => {
      const url = 'http://localhost:8080/api/findPostById/' + id;
      this.http.get<LikePost>(url).subscribe(value => {
        let like: LikePost = {
          user: result,
          postEntity: value,
        }
        this.postLikeService.unlike(like).subscribe(() => {
          // alert("Liked");
          this.getAllPost();
        }, error => {
          console.log(error);
        })
      });
    });

  }

}
