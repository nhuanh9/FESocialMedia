import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../../model/user';
import {catchError} from 'rxjs/operators';


@Component({
  selector: 'app-general-friends',
  templateUrl: './general-friends.component.html',
  styleUrls: ['./general-friends.component.scss']
})
export class GeneralFriendsComponent implements OnInit {
  userFriend: User;
  user: User;
  listGeneralFriend: User[];
  listFriendOfFriend: User[];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.userFriend = JSON.parse(localStorage.getItem('userFriend'));
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getAllFriend();
    this.getAllGeneralFriend();
  }

  getAllFriend() {
    const url = 'http://localhost:8080/api/allFriendById/' + this.userFriend.id;
    this.http.get<User[]>(url).subscribe((resJson) => {
      this.listFriendOfFriend = resJson;
      console.log('listFriendOfFriend');
      console.log(this.listFriendOfFriend);
    });
  }

  getAllGeneralFriend() {
    const url = `http://localhost:8080/api/allMutualFriend/${this.user.id}/${this.userFriend.id}`;
    this.http.get<User[]>(url).subscribe((resJson) => {
      this.listGeneralFriend = resJson;
      console.log('listGeneralFriend');
      console.log(this.listGeneralFriend);
    });
  }

  deleteFriend(id) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    const url = `http://localhost:8080/api/deleteFriend/${this.user.id}/${id}`;
    this.http.delete(url).subscribe((resJson) => {
      console.log(resJson);
    });
  }

  addFriend(id) {
    const url = `http://localhost:8080/api/addFriend/${this.user.id}/${id}`;
    this.http.get(url).subscribe((resJson) => {
      alert('thành công');
    }, error => {
      alert('lỗi');
    });
  }

  checkFriend(user: User) {
    let check = false;
    for (let i = 0; i < this.listGeneralFriend.length; i++) {
      if (user.id === this.listGeneralFriend[i].id) {
        check = true;
      }
    }
    return check;
  }
}
