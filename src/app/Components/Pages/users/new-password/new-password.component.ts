import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../Services/user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {User} from "../../../../model/user";
import {AngularFireDatabase} from "@angular/fire/database";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../../../Services/authentication.service";
import {UserToken} from "../../../../model/user-token";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  currentUser: User;
  sub: Subscription;
  currentUserToken: UserToken;
  userFirstName = '';
  userLastName = '';
  userGender = '';
  userPhoneNumber = '';
  userEmail = '1';
  arrayPicture = '';
  newPasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
  });

  constructor(private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private db: AngularFireDatabase,
              private activatedRoute: ActivatedRoute,
              private authService: AuthenticationService) {
    this.authService.currentUser.subscribe(
      currentUser => {
        this.currentUserToken = currentUser;
      }
    );
  }

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.getUserProfileById(id);
    });
  }

  private getUserProfileById(id: string) {
    this.userService.getUserProfile(id).subscribe(value => {
      this.currentUser = value;
      this.userFirstName = value.firstName;
      this.userLastName = value.lastName;
      this.userGender = value.gender;
      this.userPhoneNumber = value.phoneNumber;
      this.userEmail = value.email;
    }, () => {
      console.log('Lỗi!');
    });
  }

  changePassword() {
    const user = this.setNewUser();
    this.userService.newPassword(user, this.currentUser.id, this.currentUserToken.accessToken).subscribe(() => {
      console.log('Đổi mật khẩu thành công');
      this.newPasswordForm.reset();
      this.router.navigate(['/']);
    }, err => {
      console.log(user);
      console.log(this.currentUser)
      console.log(this.currentUserToken)
      console.log(err);
    });
    console.log(user);
  }

  private setNewUser() {
    const user: User = {
      username: this.currentUserToken.username,
      password: this.newPasswordForm.value.password,
      confirmPassword: this.newPasswordForm.value.confirmPassword,
      firstName: this.userFirstName,
      lastName: this.userLastName,
      email: this.userEmail,
      phoneNumber: this.userPhoneNumber,
      gender: this.userGender
    };
    return user;
  }
}
