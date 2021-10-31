import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = "https://routeegypt.herokuapp.com/";
  // userData= new BehaviorSubject(null)
  // saveUserDAta(){
  //   let stickyToken=JSON.stringify(localStorage.getItem("sticyNote"))
  //   this.userData.next(jwtDecode(stickyToken))
  // }

  constructor(private http: HttpClient) {
    // if(localStorage.getItem("stickyToken")!=null){
    //   this.saveUserDAta();
    // }
  }
  signUp(registerData: any): Observable<any> {
    return this.http.post(this.baseUrl+"signup", registerData)
  }
  signIn(loginData: any): Observable<any> {
    return this.http.post(this.baseUrl+"signin", loginData)
  }




  isLoggedIn() {
    return !!localStorage.getItem("stickyToken")
  }
}
