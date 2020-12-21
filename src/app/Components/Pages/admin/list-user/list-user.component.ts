import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {UserService} from "../../../../Services/user.service";
import {FormBuilder} from "@angular/forms";
import {AngularFireDatabase} from "@angular/fire/database";
import {User} from "../../../../model/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  role: string;
  sub: Subscription;
  userFirstName = '';
  userLastName = '';
  userGender = '';
  userPhoneNumber = '';
  userEmail = '1';
  arrayPicture = '';

  constructor(private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private db: AngularFireDatabase,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.role = localStorage.getItem("ROLE");
    if (this.role == "ROLE_USER") {
      this.router.navigate(['/']);
    }
  }

}
