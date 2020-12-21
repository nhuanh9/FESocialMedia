import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

const API_URL = environment.apiUrl+`/api/admin`;

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + `/users`);
  }

  block(id: number, user: User): Observable<User> {
    return this.http.put(API_URL + `/users/${id}/block`, user);
  }

  unblock(id: number, user: User): Observable<User> {
    return this.http.put(API_URL + `/users/${id}/unblock`, user);
  }
}
