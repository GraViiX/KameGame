import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
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

  public ProfileBehavior: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public IsLogged: Observable<boolean> = this.ProfileBehavior.asObservable();

  constructor(private http:HttpClient) { }

  url : string = "https://localhost:44349/api/UserModels/";
  userLogin(userToPost : IUser):Observable<IUser>{
    return this.http.post<IUser>(`${this.url}Login`, userToPost,httpOptions);
  }

  UserCreate(UserToCreate:IUser):Observable<IUser>{
    return this.http.post<IUser>(`${this.url}CreateUser`,UserToCreate,httpOptions)
  }
}
