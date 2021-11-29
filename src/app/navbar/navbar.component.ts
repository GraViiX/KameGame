import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _router: Router, public _profile: UserService) { }

  ngOnInit(): void {
    this._profile.IsLogged.subscribe()
    if(localStorage.getItem('id')){
      this._profile.ProfileBehavior.next(true);
    }
  }

  GoToHome(){
    this._router.navigate(['/home'])
  }

  LogOut(){

  }

}
