import { visitAll } from '@angular/compiler';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { UserService, createPasswordStrengthValidator, checkPasswords } from '../Services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private api: UserService, private _router: Router, private _auth: AuthService) { }

  public errorMessages: string = "";

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

  //#region edit form
  public EditAccountForm = new FormGroup({
    userId: new FormControl(0),
    userName: new FormControl(this._auth.userName, [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    utlf: new FormControl(null, [Validators.required, Validators.pattern("[0-9]{8}")]),
    roleId: new FormControl(1),
    role: new FormGroup({
      roleId: new FormControl(1),
      role: new FormControl('')
    }),
    addressId: new FormControl(0),
    address: new FormGroup({
      addressId: new FormControl(0),
      postCodeId: new FormControl(0),
      postCode: new FormGroup({
        postcodeId: new FormControl(0),
        postcode: new FormControl(0, [Validators.required]),
        city: new FormControl('', Validators.required)
      }),
      streetNames: new FormControl('', Validators.required)
    })
  });
  //#endregion
  //#region confirm_passwordForm
  confirm_passwordForm = new FormGroup({
    uPassword: new FormControl('', [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]),
    confirm_password: new FormControl('', [Validators.required])
  }, { validators: checkPasswords() })
  //#endregion
  //#region Add Card Form
  AddCardForm = new FormGroup({
    CardId: new FormControl(0),
    UserId: new FormControl(0), //skal være lig med id som vi får da bruger logger ind
    CardTypeId: new FormControl(0),
    CardNumber: new FormControl(null, [Validators.required, Validators.pattern("[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}")]),
    CardDate: new FormControl(''),
    SecurityNumber: new FormControl(null, [Validators.required, Validators.pattern("[0-9]{3}")]),
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required)
  })

  month: any;
  year: any;
  //#endregion

  ngOnInit(): void {
    if (!this._auth.authenticated) {
      this._router.navigate(['/home'])
    }
    if (sessionStorage.getItem('token')) {
      this.api.GetUserById(this._auth.id).subscribe(data => {
        this.EditAccountForm.setValue(data)
      })
    }
  }

  //#region method to upload the changes to the user
  Savechange() {
    if (this.EditAccountForm.valid && this.confirm_passwordForm.valid) {
      this.EditAccountForm.addControl('uPassword', new FormControl())
      this.EditAccountForm.get('uPassword')?.setValue(this.confirm_passwordForm.get('uPassword')?.value)
      this.api.edituser(this.EditAccountForm.value,this._auth.id).subscribe(data => {
        console.log(data);
      })
    }
    else{
      this.errorPopupMessages("you need fill the form")
    }
  }
  //#endregion

  //#region method to upload the changes to the card
  selectmonth(month: any) {
    this.month = month.target.value
  }

  selectyear(year: any) {
    this.year = year.target.value
  }
  AddCard() {
    if (this.year && this.month) {
      this.AddCardForm.get('CardDate')?.setValue(this.month + '/' + this.year)
    }
    else {
      this.errorPopupMessages("you need fill the date")
    }
    //let firstChar = this.AddCardForm.value.CardNumber.charAt(0);
  }
  //#endregion

  errorPopupMessages(Messages: string) {
    this.errorMessages = Messages
    document.getElementById("errorpopup")?.click();
  }
}

