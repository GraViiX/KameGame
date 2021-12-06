import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { IToken } from '../Interface/itoken';
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
  userLogin(userToPost : IUser):Observable<IToken>{
    return this.http.post<IToken>(`${this.url}Login`, userToPost,httpOptions);
  }

  UserCreate(UserToCreate:IUser):Observable<IUser>{
    return this.http.post<IUser>(`${this.url}CreateUser`,UserToCreate,httpOptions)
  }

  GetUserById(id:any):Observable<IUser>{
    return this.http.get<IUser>(`${this.url}GetUser/${id}`, httpOptions)
  }

  edituser(editinfo:IUser,id:any):Observable<IUser>{
    return this.http.post<IUser>((`${this.url}UpdateUser/${id}`),editinfo,httpOptions)
  }
  deleteuser(id:any){
    return this.http.delete(`${this.url}${id}`,httpOptions)
  }
}
//https://localhost:44349/api/UserModels/GetUser/8

//#region custom validation
export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    const hasLowerCase = /[a-z]+/.test(value);

    const hasNumeric = /[0-9]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    return !passwordValid ? { passwordStrength: true } : null;
  }
}

export function checkPasswords(): ValidatorFn{
  return (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('uPassword')?.value;
    let confirmPass = group.get('confirm_password')?.value
    return pass === confirmPass ? null : { confirm: true }
  }
}
//#endregion
