import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LikePost} from "../model/like-post";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PostLikeService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<LikePost[]> {
    return this.http.get<LikePost[]>(API_URL + `/post-likes`);
  }


  like(likePost: LikePost): Observable<LikePost> {
    return this.http.post<LikePost>(API_URL+ `/post-likes`, likePost);
  }

  unlike(likePost: LikePost): Observable<LikePost> {
    return this.http.post<LikePost>(API_URL+ `/post-likes/unlike`, likePost);
  }

}
