import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {UserService} from "../../../../Services/user.service";
import {FormBuilder} from "@angular/forms";
import {AngularFireDatabase} from "@angular/fire/database";
import {User} from "../../../../model/user";
import {Subscription} from "rxjs";
import {AdminService} from "../../../../Services/admin.service";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  role: string;
  sub: Subscription;
  users: User[];

  constructor(private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private db: AngularFireDatabase,
              private activatedRoute: ActivatedRoute,
              private adminService: AdminService) {
  }

  ngOnInit() {
    this.role = localStorage.getItem("ROLE");
    if (this.role == "ROLE_USER") {
      this.router.navigate(['/']);
    }
    this.getAllUsers()
  }

  getAllUsers() {
    this.adminService.getAll().subscribe(result => {
      this.users = result;
      console.log(result);
    })
  }

  blockUser(id, user) {
    this.adminService.block(id, user).subscribe(next => {
      alert("Bạn đã khoá thành công tài khoản "+user.username);
      this.getAllUsers();
    }, error => {
      console.log(error);
    })
  }
  unblockUser(id, user) {
    this.adminService.unblock(id, user).subscribe(next => {
      alert("Bạn đã mở khoá tài khoản "+user.username);
      this.getAllUsers();
    }, error => {
      console.log(error);
    })
  }


}
