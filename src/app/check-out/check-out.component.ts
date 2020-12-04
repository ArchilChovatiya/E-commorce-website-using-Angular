import { Component, OnInit } from '@angular/core';
import { ShippingData } from '../models/shipping';
import { CartServiceService } from '../cart-service.service';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
shipping:ShippingData={ name:'',addressLine1:'',addressLine2:'',city:''}
  item:ItemWithIdAndQuantity[]=[]
  userId:string
  name:string
  email:string
  sub:Subscription
  sub2:Subscription
  totalCartPrice:number
  totalQuantity:number
  totalPrice:number[]=[]
  constructor(private cartSer:CartServiceService,private OrderSer:OrderService,
    private authSer:AuthService,private router:Router) {}
  async ngOnInit() {
    let data=await this.cartSer.getItems()
    this.sub2=data.subscribe(item=>{
      this.item=item.map(x=>{
        return x.payload.doc.data() as ItemWithIdAndQuantity
      })
      this.totalCartPrice=0
      this.totalQuantity=0
      this.totalPrice=[]
      for(let i=0;i<this.item.length;i++)
      {
          this.totalCartPrice+=this.totalPrice[i]=this.item[i].price*this.item[i].quantity 
          this.totalQuantity+=this.item[i].quantity
      }
    })



    this.sub=this.authSer.user$.subscribe(user=>{
      this.userId=user.uid,
      this.name=user.displayName,
      this.email=user.email
    })
  }

  async placeOrder(){
    let order={
      user:{
        userId:this.userId,
        name:this.name,
        email:this.email
      },
      totalCartPrice:this.totalCartPrice,
      datePlaced:new Date().getTime(),
      shipping:this.shipping,
      items:this.item.map(x=>{
        return {
          product:{
            title:x.title,
            price:x.price,
            imageUrl:x.imageUrl,
            category:x.category
          },
          quantity:x.quantity,
          totalCost:x.quantity*x.price
        }
      })
    }
    let x=await this.OrderSer.placeOrder(order,this.userId)
    this.router.navigate(['/order-success',x.id])
      
  }
}
