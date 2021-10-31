import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';





@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  token= localStorage.getItem("stickyToken")



  constructor(private _Router: Router, private _AuthService : AuthService) { }

  logout() {
    localStorage.removeItem("stickyToken")
    this._Router.navigateByUrl("login")
    window.location.reload()
  }


  stickyToken = localStorage.getItem("stickyToken")
  logged:boolean=false
  ngOnInit(): void {

    // this._AuthService.userData.subscribe(()=>{
    //   if(this._AuthService.userData.getValue()!=null){
    //     this.logged = true
    //   }
    //   else{
    //     this.logged=false
    //   }
    // })

    if (this.stickyToken) {
      this.logged = true
    }
    else {
      this.logged = false
    }
  }
}

