import { Component, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPostcode } from '../Interface/ipostcode';
import { PostcodeService } from '../Services/postcode.service';
import { checkPasswords, createPasswordStrengthValidator, UserService } from '../Services/user.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _router: Router, public _profile: UserService, private api: UserService, private apiPostcode: PostcodeService) { }

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
    'Type': [
      { type: 'required', message: 'Cardtype is required' }
    ],
    'CardNumber': [
      { type: 'required', message: 'Card Number is required' }
    ],
    'CardDate': [
      { type: 'required', message: 'Card Date is required' }
    ],
    'SecurityNumber': [
      { type: 'required', message: 'CVV/CVC is required' },
      { type: 'pattern', message: 'Enter a valid CVV/CVC' }
    ],
    'FirstName': [
      { type: 'required', message: 'FirstName is required' }
    ],
    'LastName': [
      { type: 'required', message: 'LastName is required' }
    ],
    'PostCode': [
      { type: 'required', message: 'PostCode is required' }
    ],
    'City': [
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
    UTLF: new FormControl(0, [Validators.required, Validators.minLength(8)]),
    Roleid: new FormControl(1),
    AddressId: new FormControl(0),
    Address: new FormGroup({
      AddressId: new FormControl(0),
      // For at få denne, skal der laves et get statement på PostCode tabellen, hvor vi returnere ID. Postcode sætter vi i en liste, som man kan søge i.
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
    this._profile.IsLogged.subscribe()
    if (localStorage.getItem('id')) {
      this._profile.ProfileBehavior.next(true);
    }
    this.getPostcodes()
    this.formGroupPostcodeChange();
  }

  //#region login
  LoginClick() {
    this.api.userLogin(this.loginForm.value).subscribe(data => {
      sessionStorage.setItem('id', data.toString())
      this._profile.ProfileBehavior.next(true);
    })
  }

  //#endregion

  //#region getPoscodes
  getPostcodes() {
    this.apiPostcode.getPostcodes().subscribe((data) => {
      this.postcodes = data;
      // console.log(data);
    })
  }
  formGroupPostcodeChange() {
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

  openCreateModal() {
    var newModal = document.getElementById('openModalButton')
    newModal?.click();
  }


  GoToHome() {
    this._router.navigate(['/home'])
  }

  LogOut() {
    this._profile.ProfileBehavior.next(false);
    this.loginForm.setValue({
      UserName:"",
      uPassword:""
    })
  }

}
