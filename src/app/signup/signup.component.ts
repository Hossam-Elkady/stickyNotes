import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var $: any


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    "first_name": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    "last_name": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    "email": new FormControl(null, [Validators.required, Validators.email]),
    "age": new FormControl(null, [Validators.required, Validators.min(12), Validators.max(60)]),
    "password": new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)])
  })

  submitFormGroup() {
    if (this.registerForm.invalid) {
      return
    }
    this._AuthService.signUp(this.registerForm.value).subscribe((response) => {
      if (response.message == "success") {

        this._Router.navigateByUrl("login")
      }

    })
  }

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  ngOnInit(): void {
    $('#signUp').particleground({
      density: 5000,
      dotColor: '#fff',
      lineColor: '#000'
    });
  }

}

