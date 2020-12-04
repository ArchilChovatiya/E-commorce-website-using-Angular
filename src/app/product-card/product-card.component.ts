import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ItemWithId } from '../models/ItemWithId';
import { CartServiceService } from '../cart-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit,OnDestroy {
@Input() product:ItemWithId
  constructor(private cartSer:CartServiceService) { }
  quantity:number=0
  sub:Subscription
  async ngOnInit(){
    let item$=await this.cartSer.getcount(this.product.id)
    this.sub=item$.subscribe(item=>{
      if(item.payload.data())
      {
        this.quantity=(item.payload.data() as Quantity).quantity
      } 
      else{
        this.quantity=0
      }})
    }
  addToCart(){
     this.cartSer.addToCart(this.product)
  }


  removeFromCart(){
    this.cartSer.removeFromCart(this.product.id)
  }

ngOnDestroy(){
    this.sub.unsubscribe()
  }

}

class Quantity{
  quantity:number
}