import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { OrderItem } from '../models/orderItem';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-successful',
  templateUrl: './order-successful.component.html',
  styleUrls: ['./order-successful.component.css']
})
export class OrderSuccessfulComponent implements OnInit,OnDestroy {

  constructor(private route:ActivatedRoute,private OrderSer:OrderService) { }
  id:string=''
  UserInfo:any={}
  products:any[]=[]
  totalCartPrice:number=0
  sub:Subscription
  shipping:any={}
  ngOnInit() {
    this.id=this.route.snapshot.paramMap.get('id')
    this.sub=this.OrderSer.getOrder(this.id).snapshotChanges().subscribe(info=>{
     let data=info.payload.data() as OrderItem
      this.UserInfo=data.user
      this.products=data.items
      this.totalCartPrice=data.totalCartPrice
      this.shipping=data.shipping
    })
  }
  ngOnDestroy(){
    this.sub.unsubscribe()
  }

}
