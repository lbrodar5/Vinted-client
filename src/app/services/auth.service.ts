import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: BehaviorSubject<User> = new BehaviorSubject<User>({_id:"",token:"",username:"",email:""});
  
  url = "https://vinted-server.onrender.com";


  error = "";
  message = "";

  constructor( private http: HttpClient, private router : Router) { }

  login(data : {username : String, password : string}) {
    return this.http.post(this.url+"/api/login",{username: data.username, password: data.password}).pipe(
      tap((res : any) => {
        if (res.error) {
          console.log(res.error)
          this.error = res.error;
        } else {
          this.user.next(res);
          this.error = "";
          localStorage.setItem("vinted",JSON.stringify(this.user.value));
          this.router.navigate([""]);
        }
      })
    );
  }

  register(data : {username : String, password : string}) {
    return this.http.post(this.url+"/api/register",{username: data.username, password: data.password}).pipe(
      tap((res : any) => {
        if (res.error) {
          console.log(res.error)
          this.error = res.error;
        } else {
          this.message = res.message;
        }
      })
    );
  }

  logoff() {
    localStorage.removeItem("vinted");
    this.user.next({_id:"",token:"",username:"", email:""});
  }

  isAuthorised() {
    if (this.user.value.token !== "") {
      return true;
    }
    return false;
  }

  checkLocalStroage(){
    let data = localStorage.getItem("vinted");
    if(data) {
      this.user.next(JSON.parse(data));
    }
  }
}
