import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPostcode } from '../Interface/ipostcode';
import { IUser } from '../Interface/iuser';
import { UserService } from '../Services/user.service';
import { PostcodeService } from '../Services/postcode.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  postcodes : IPostcode[] = [];
  postcode : IPostcode[] = [{
    postcodeId : 0,
    city : "",
    postcode : 0
  }];

  loginForm = new FormGroup({
    username : new FormControl('' ),
    uPassword : new FormControl('')
  })
  user : IUser = {
    username : "",
    uPassword : ""
  };
  //#region Create Form
  CreateAccountForm = new FormGroup({
    Username : new FormControl('',Validators.required),
    uPassword : new FormControl('',[Validators.required, Validators.minLength(8)]),
    Email : new FormControl('',[Validators.required , Validators.email]),
    UTLF : new FormControl(0, [Validators.required , Validators.minLength(8)]),
    Roleid : new FormControl(1),
    AddressId: new FormControl(0),
    Address : new FormGroup({
      AddressId: new FormControl(0),
      // For at få denne, skal der laves et get statement på PostCode tabellen, hvor vi returnere ID. Postcode sætter vi i en liste, som man kan søge i.
      PostCodeId : new FormControl(null, Validators.required),
      StreetNames : new FormControl('', Validators.required)
    })
  });

  postcodeForm = new FormGroup({
    PostCode : new FormControl(null, Validators.required)
  });

  //#endregion

  constructor(private api:UserService, private apiPostcode : PostcodeService,private _profile: UserService) { }

  ngOnInit(): void {
    this._profile.IsLogged.subscribe();
    this.getPostcodes(),
    this.formGroupPostcodeChange();
  }

  getPostcodes(){
    this.apiPostcode.getPostcodes().subscribe((data) => {
      this.postcodes = data;
      // console.log(data);

    })
  }

  LoginClick() {
    this.user = this.loginForm.value;

    this.api.userLogin(this.user).subscribe(data => {
      this._profile.ProfileBehavior.next(true);
    })
  }

  CreateAccount(){
    if(this.CreateAccountForm.value.PostCodeId == null) {
      console.log("error: this.CreateAccountForm.value.PostCodeId er lig null!!!");
    }
    // this.api.UserCreate(this.CreateAccountForm.value).subscribe(data => {
    //   console.log(data);
    // })
    console.log(this.CreateAccountForm.value);

  }

  formGroupPostcodeChange(){
    this.postcodeForm.get('PostCode')?.valueChanges.subscribe((data : any)=> {
      // Den her indeholder 2750
      // this.CreateAccountForm.value.PostCodeId
      // console.log(data);
      this.postcode = this.postcodes.filter(function(element){
        if(element.postcode == data) {
          console.log(element);
          return element;
        }
        else{
          return null;
        }
      })
      this.CreateAccountForm.value.Address.PostCodeId = this.postcode[0].postcodeId;
    })
  }
}
