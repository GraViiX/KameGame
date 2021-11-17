import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IUser } from '../Interface/iuser';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username : new FormControl(''),
    uPassword : new FormControl('')
  })
  user : IUser = {
    username : "",
    uPassword : ""
  };

  constructor(private api:UserService) { }

  ngOnInit(): void {
  }

  LoginClick() {
    this.user = this.loginForm.value;

    this.api.userLogin(this.user).subscribe(data => {
      console.log(data);

    })
  }
}
