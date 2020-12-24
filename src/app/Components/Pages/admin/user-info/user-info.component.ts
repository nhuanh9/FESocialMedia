import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {User} from "../../../../model/user";
import {UserService} from "../../../../Services/user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {AngularFireDatabase} from "@angular/fire/database";
import {AdminService} from "../../../../Services/admin.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  role: string;
  sub: Subscription;
  user: User;
  currentUsername: string;

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
      alert("Bạn không có quyền!")
      this.router.navigate(['/']);
    }
    this.getUser();
  }

  getUser() {
    this.sub = this.activatedRoute.paramMap.subscribe((paraMap: ParamMap) => {
      let id = paraMap.get('id');
      this.adminService.getUserById(id).subscribe(result => {
        this.user = result;
        console.log(this.user);
      }, error => {
        console.log(error);
      })
    });
  }
}
