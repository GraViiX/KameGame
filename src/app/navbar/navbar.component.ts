import { Component, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPostcode } from '../Interface/ipostcode';
import { PostcodeService } from '../Services/postcode.service';
import { checkPasswords, createPasswordStrengthValidator, UserService } from '../Services/user.service';
import * as $ from 'jquery';
import { AuthService } from '../Services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _router: Router, public _profile: UserService, private apiPostcode: PostcodeService , private _auth:AuthService) { }

  //#region validation messages
  public validation_messages = {
    'Username': [
      { type: 'required', message: 'Username is required' }
    ],
    'uPassword': [
      { type: 'required', message: 'this is required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' },
      { type: 'passwordStrength', message: 'The Password is not strong enough' }
    ],
    'confirm_password': [
      { type: 'required', message: 'this password is required' },
      { type: 'confirm', message: 'Password mismatch' }
    ],
    'Email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email' }
    ],
    'UTLF': [
      { type: 'required', message: 'UTLF is required' },
      { type: 'pattern', message: 'Enter a valid  phone number' }
    ],
    'PostCode': [
      { type: 'required', message: 'PostCode is required' }
    ],
    'City': [ //city need to be validators?
      { type: 'required', message: 'City is required' }
    ],
    'StreetNames': [
      { type: 'required', message: 'StreetNames is required' }
    ]
  }
  //#endregion

  //#region loginform
  loginForm = new FormGroup({
    UserName: new FormControl(''),
    uPassword: new FormControl('')
  })
  //#endregion

  //#region Create Form
  CreateAccountForm = new FormGroup({
    Username: new FormControl('', Validators.required),
    uPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    UTLF: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    Roleid: new FormControl(1),
    AddressId: new FormControl(0),
    Address: new FormGroup({
      AddressId: new FormControl(0),
      PostCodeId: new FormControl(null, Validators.required),
      StreetNames: new FormControl('', Validators.required)
    })
  });

  postcodes: IPostcode[] = [];
  postcode: IPostcode[] = [{
    postcodeId: 0,
    city: "",
    postcode: 0
  }]
  postcodeForm = new FormGroup({
    PostCode: new FormControl(null, Validators.required)
  });

  confirm_passwordForm = new FormGroup({
    uPassword: new FormControl('', [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]),
    confirm_password:new FormControl('',[Validators.required])
  },{ validators: checkPasswords()})
  //#endregion

  ngOnInit(): void {
    this._profile.IsLogged.subscribe() //to change the user icon in the navbar
    if (localStorage.getItem('id')) {
      this._profile.ProfileBehavior.next(true); // change the user icon to a dropdown menu where the user can logout or go til edit
    }
    this.getPostcodes() // get the postcode from the api
    this.formGroupPostcodeChange(); // make it so we can handle that postcodeid need a number to make a user
  }

  //#region login
  LoginClick() {
    this._auth.login(this.loginForm.value)

    this._auth.OnLoginSuccessful.subscribe(next=>{
      this._profile.ProfileBehavior.next(true);   // change the user icon to a dropdown menu where the user can logout or go til edit
    })
  }

  //#endregion

  //#region getPoscodes
  getPostcodes() {
    this.apiPostcode.getPostcodes().subscribe((data) => { // get all the postcode from the database
      this.postcodes = data;  //add it to a variable so we can handle it in html
    })
  }
  /* get FormControl where we set the postcode and make a subscribe on valueChanges so that each time the value changes,
  we can select the id for the element the user has select*/
  formGroupPostcodeChange() { //maybe look at it again
    this.postcodeForm.get('PostCode')?.valueChanges.subscribe((data: any) => {
      this.postcode = this.postcodes.filter(function (element) {
        if (element.postcode == data) {
          console.log(element);
          return element;
        }
        else {
          return null;
        }
      })
      this.CreateAccountForm.value.Address.PostCodeId = this.postcode[0].postcodeId;
    })
  }
  //#endregion

  //#region create
  CreateAccount() {
    if (this.CreateAccountForm.value.PostCodeId == null) {
      console.log("error: this.CreateAccountForm.value.PostCodeId er lig null!!!");
    }
    // this.api.UserCreate(this.CreateAccountForm.value).subscribe(data => {
    //   console.log(data);
    // })
    console.log(this.CreateAccountForm.value);
  }
  //#endregion

  //open the create modal
  openCreateModal() {
    var newModal = document.getElementById('openModalButton')
    newModal?.click();
  }

  //logout the user and set the loginform to "null" and change the user icon back to a button
  LogOut() {
    this._auth.logout()
    this.loginForm.setValue({
      UserName:"",
      uPassword:""
    })
  }

}
