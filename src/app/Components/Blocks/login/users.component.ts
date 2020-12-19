import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  user = {
    username: 'nhuanh',
    password: '123456'
  };
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
        username: [''],
        password: [''],
      }
    );
  }

  login() {
    if (this.loginForm.get('username').value === this.user.username && this.loginForm.get('password').value === this.user.password) {
      alert('Hello!');
    }
  }
}
