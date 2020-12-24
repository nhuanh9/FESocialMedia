import { Component, OnInit } from '@angular/core';
import {User} from '../../../../model/user';
import {HttpClient} from '@angular/common/http';



@Component({
  selector: 'app-all-friend',
  templateUrl: './all-friend.component.html',
  styleUrls: ['./all-friend.component.scss']
})
export class AllFriendComponent implements OnInit {
  listUserFriend: User[];
  user: User;
  constructor(private http: HttpClient) { }


  ngOnInit() {
    this.getAllFriend();
  }

  getAllFriend() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
    const url = 'http://localhost:8080/api/allFriendById/' + this.user.id;
    this.http.get<User[]>(url).subscribe((resJson) => {
      this.listUserFriend = resJson;
      console.log(this.listUserFriend);
    });
  }
  deleteFriend(id) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    const url = `http://localhost:8080/api/deleteFriend/${this.user.id}/${id}`;
    this.http.delete(url).subscribe((resJson) => {
      console.log(resJson);
    });
  }

  setFriendService(user: User) {
    localStorage.setItem('userFriend', JSON.stringify(user));
  }

}
