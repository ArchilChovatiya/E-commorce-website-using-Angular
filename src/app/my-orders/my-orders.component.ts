import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { OrderItem } from '../models/orderItem';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  sub:Subscription
  data:OrderItem[]
  userId
  constructor(private orserSer:OrderService,private authSer:AuthService) {
    this.sub=this.authSer.user$.subscribe(user=>{
      this.userId=user.uid
    })
   }

  ngOnInit() {
    this.orserSer.getMyOrders(this.userId).subscribe(x=>{
      this.data=x.map(y=>{return y.payload.doc.data() as OrderItem})
    })
  }

}
