import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  constructor(private authSer:AuthService,private router:Router) {}
  canActivate(router,state:RouterStateSnapshot){
    return this.authSer.user$.pipe(map(user=>{
      if(user) return true; 
      this.router.navigate(['/login'],{ queryParams : {returnUrl : state.url}});
      return false;
    }))
    
  }
}
