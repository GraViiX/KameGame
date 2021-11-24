import { visitAll } from '@angular/compiler';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  public validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required' }
    ],
    'uPassword': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: '' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions' }
    ]
  }

  EditAccountForm = new FormGroup({
    Username: new FormControl('', [Validators.required]),
    uPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    UTLF: new FormControl(0, [Validators.required, Validators.minLength(8)]),
    CardId: new FormControl(0),
    Card: new FormGroup({
      CardId: new FormControl(0),
      CardTypeId: new FormControl(0),
      CardType: new FormGroup({
        CardTypeId: new FormControl(0),
        Type: new FormControl('', Validators.required)
      }),
      CardNumber: new FormControl(0, Validators.required),
      CardDate: new FormControl('', Validators.required),
      SecurityNumber: new FormControl(0, Validators.required),
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required)
    }),
    Roleid: new FormControl(1),
    AddressId: new FormControl(0),
    Address: new FormGroup({
      AddressId: new FormControl(0),
      PostCodeId: new FormControl(null, Validators.required),
      PostCode: new FormGroup({
        PostCodeId: new FormControl(0),
        PostCode: new FormControl(0, Validators.required),
        City: new FormControl('', Validators.required)
      }),
      StreetNames: new FormControl('', Validators.required)
    })
  });

  constructor() { }

  ngOnInit(): void {


  }


  Savechange() {
    console.log(this.EditAccountForm.value);

  }

}
