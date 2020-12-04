import { Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { CartServiceService } from '../cart-service.service';
@Component({
  selector: 'bs-nav',
  templateUrl: './bs-nav.component.html',
  styleUrls: ['./bs-nav.component.css']
}) 
export class BsNavComponent implements OnInit,OnDestroy{
  constructor(private authSer:AuthService,private userSer:UserService,private cartSer:CartServiceService) {
    this.isAdmin()
  }
  obser:Subscription;
  user:firebase.User;
  _isAdmin:boolean;
  count:number;
  sub:Subscription
  async ngOnInit(){
    this.obser=this.authSer.user$.subscribe(user=>{this.user=user})
    let x=await this.cartSer.getItems()
    this.sub=x.subscribe(data=>{
      this.count=0
      for(let i=0;i<data.length;i++)
      { 
          this.count+=data[i].payload.doc.data().quantity
      }
    })
  }
  logout(){
    this.authSer.logout();
  }
  ngOnDestroy()
  {
    this.obser.unsubscribe();
    this.sub.unsubscribe();
  }
  isAdmin()
  { 
      this.userSer.get()
      .subscribe(z=>{
        if(z)
        {
          z.subscribe(a=>{this._isAdmin=a})
        }
        })
      }
}
