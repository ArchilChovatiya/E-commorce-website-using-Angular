import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoginService implements CanActivate{
static isLog:boolean
  constructor(private authSer:AuthService,private router:Router) { }
  canActivate(){
    return this.authSer.user$.pipe(map(user=>{
      if(user)
      {
        this.router.navigate(['/']);
        return false
      }
      return true
    }))
  }
}
