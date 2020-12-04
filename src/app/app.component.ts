import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { CartServiceService } from './cart-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  cartId:string
  roter:boolean=true
  constructor(private authSer:AuthService,router:Router
    ,private userSer:UserService,private cartSer:CartServiceService,private toastr:ToastrService)
    {
    this.authSer.user$.subscribe(user=>{
      let returnUrl=localStorage.getItem('returnUrl')
      this.roter=false
      if(user)
      {
        this.toastr.success('Logged in as '+user.displayName,null,{tapToDismiss:true,closeButton:true})
        this.userSer.save(user);
        if(returnUrl)
        {
          router.navigateByUrl(returnUrl);
          localStorage.removeItem('returnUrl');
        }
        
      }
    })
    
  }
 async ngOnInit(){
    this.cartId= await this.cartSer.CreateOrGetID()
  }
  
}
