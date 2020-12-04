import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { AppUser } from './models/app-user';

import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy{
  constructor(private fireStore:AngularFirestore,private authSer:AuthService) {
    
  }
  async save(user:firebase.User)
  {
    let y:boolean
    let x=await this.isadmin(user)
    if(x.exists)
    {
      y=true
    }
    else
    {
      y=false
    }
      this.fireStore.collection('OshopUsers').doc(user.uid).set({
        userName:user.displayName,
        email:user.email,
        isAdmin: y  });
    
  }
async isadmin(user)
{
  return await this.fireStore.collection('admin').doc(user.uid).get().toPromise()
}
  
  obser:Subscription;
  isAdmin:boolean
  get(){
    return this.authSer.user$.pipe(map(user=>{
      if(user)
      {
        return this.fireStore.doc('OshopUsers/'+user.uid).valueChanges().pipe(map(
          (_user:AppUser)=>{
          if(_user.isAdmin)
          {
            return true
            
          }
          else{
            return false
          }
        }))}}))
            

    }

  ngOnDestroy()
  {
    this.obser.unsubscribe();
  }
}