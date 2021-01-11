import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserToken} from '../../../model/user-token';
import {AuthenticationService} from '../../../Services/authentication.service';
import {HttpClient} from '@angular/common/http';
import {Post} from '../../../model/post';
import {User} from '../../../model/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  currentUser: UserToken;
  listPost: Post[];
  content = 'share';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      console.log(this.currentUser);
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {

  }

  login() {
  }

  register() {

  }

  search() {
    console.log(this.currentUser.id);
    console.log(this.content);
    const url = 'http://localhost:8080/api/findPostByContent/' + this.currentUser.id + '/' + this.content;
    this.http.get<Post[]>(url).subscribe((resJson) => {
      this.listPost = resJson;
      console.log('this.listPost------------');
      console.log(this.listPost);
    });
  }
}
