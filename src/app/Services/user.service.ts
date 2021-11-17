import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IUser } from '../Interface/iuser';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  url : string = "https://localhost:44349/api/UserModels/";
  userLogin(userToPost : IUser):Observable<IUser>{
    return this.http.post<IUser>(`${this.url}Login`, userToPost,httpOptions);
  }
}
