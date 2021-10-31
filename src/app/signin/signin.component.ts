import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var $: any

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    "email": new FormControl(null, [Validators.required, Validators.email]),
    "password": new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)])
  })
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  submitFormGroup() {
    if (this.loginForm.invalid) {
      return
    }
    this._AuthService.signIn(this.loginForm.value).subscribe((response) => {
      if (response.message === "success") {
        localStorage.setItem("stickyToken", response.token)
        this._Router.navigateByUrl("profile")
        // window.location.reload()
      }
    })
  }



  ngOnInit(): void {
    $('#signIn').particleground({
      density: 5000,
      dotColor: '#fff',
      lineColor: '#000'
    });
  }

}
