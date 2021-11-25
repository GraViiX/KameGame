import { visitAll } from '@angular/compiler';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  //#region validation messages
  public validation_messages = {
    'Username': [
      { type: 'required', message: 'Username is required' }
    ],
    'uPassword': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' },
      { type: 'passwordStrength', message: 'yess' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
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
  EditAccountForm = new FormGroup({
    Username: new FormControl('', [Validators.required]),
    uPassword: new FormControl('', [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    UTLF: new FormControl(null, [Validators.required, Validators.pattern("[0-9]{8}")]),
    CardId: new FormControl(0),
    Roleid: new FormControl(1),
    AddressId: new FormControl(0),
    Address: new FormGroup({
      AddressId: new FormControl(0),
      PostCodeId: new FormControl(null, Validators.required),
      PostCode: new FormGroup({
        PostCodeId: new FormControl(0),
        PostCode: new FormControl(null, [Validators.required]),
        City: new FormControl('', Validators.required)
      }),
      StreetNames: new FormControl('', Validators.required)
    })
  });
  //#endregion
  confirm_passwordForm = new FormGroup({
    confirm_password: new FormControl([Validators.required])
  })
  //#region Add Card Form
  AddCardForm = new FormGroup({
    CardId: new FormControl(0),
    UserId: new FormControl(0), //skal være lig med id som vi får da bruger logger ind
    CardTypeId: new FormControl(0),
    CardNumber: new FormControl(null, [Validators.required, Validators.pattern("[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}")]),
    CardDate: new FormControl('', Validators.required),
    SecurityNumber: new FormControl(null, [Validators.required, Validators.pattern("[0-9]{3}")]),
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required)
  })
  //#endregion
  constructor() { }

  ngOnInit(): void {
  }


  Savechange() {
    console.log(this.EditAccountForm.value);
  }

  AddCard() {
    let firstChar = this.AddCardForm.value.CardNumber.charAt(0);
    console.log(firstChar);

  }


}
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
