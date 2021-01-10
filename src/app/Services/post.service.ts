import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Comments} from "../model/comments";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  API_URL = environment.apiUrl+'/api/posts';
  constructor(private http: HttpClient) {
  }

  addComment(id, comment): Observable<Comments> {
    return this.http.post<Comments>(this.API_URL + `/${id}/comments`, comment);
  }

}
