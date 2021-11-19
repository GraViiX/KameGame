import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../Interface/iuser';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username : new FormControl('' ),
    uPassword : new FormControl('')
  })
  user : IUser = {
    username : "",
    uPassword : ""
  };
  //#region validtors
  CreateAccountForm = new FormGroup({
    Username : new FormControl('',Validators.required),
    uPassword : new FormControl('',[Validators.required, Validators.minLength(8)]),
    Email : new FormControl('',[Validators.required , Validators.email]),
    UTLF : new FormControl(0, [Validators.required , Validators.minLength(8)]),
    CardId: new FormControl(null),
    Roleid : new FormControl(1),
    AddressId: new FormControl(0),
    Address : new FormGroup({
      AddressId: new FormControl(0),
      PostCodeId : new FormControl(0, Validators.required),
      StreetNames : new FormControl('', Validators.required)
    })
  })
  //#endregion

  constructor(private api:UserService) { }

  ngOnInit(): void {
  }

  LoginClick() {
    this.user = this.loginForm.value;

    this.api.userLogin(this.user).subscribe(data => {
      console.log(data);
    })
  }

  CreateAccount(){
    this.api.UserCreate(this.CreateAccountForm.value).subscribe(data => {
      console.log(data);
    })
    //console.log(this.CreateAccountForm.value);

  }
}
