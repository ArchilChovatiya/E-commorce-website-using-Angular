import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private userSer:UserService,private router:Router) { }
 
  canActivate():Observable<boolean>{
    return this.userSer.get().pipe(switchMap(z => { return z.pipe(map(a => {return a })) })).pipe(map(x=>{
      if(!x)
      {
         this.router.navigate(['/'])
      }  
      return x}))
         
      
    }
    
  
}
