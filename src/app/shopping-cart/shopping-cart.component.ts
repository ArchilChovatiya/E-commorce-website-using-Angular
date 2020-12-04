import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartServiceService } from '../cart-service.service';
import { Subscription } from 'rxjs';
import { ItemWithId } from '../models/ItemWithId';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit,OnDestroy {

  count:number
  sub:Subscription
  item:ItemWithIdAndQuantity[]
 totalprice:number[]
 subTotal:number
  constructor(private cartSer:CartServiceService) { }
  async ngOnInit() {
    let x = await this.cartSer.getItems()
   this.sub= x.subscribe(data=>{
      this.item=data.map(y=>{return y.payload.doc.data() as ItemWithIdAndQuantity})
      this.totalprice=[]
      this.subTotal=0
      for(let i=0;i<this.item.length;i++)
      {
        this.subTotal+=(this.totalprice[i]=this.item[i].price*this.item[i].quantity)
      }
    })
    let y=await this.cartSer.getItems()
    this.sub=y.subscribe(data=>{
      this.count=0
      for(let i=0;i<data.length;i++)
      {   
          this.count+=data[i].payload.doc.data().quantity
      }
    })
  }

  addToCart(product:ItemWithIdAndQuantity)
  {
    this.cartSer.addToCart(product)
  }

  removeFromCart(productId:string){
    this.cartSer.removeFromCart(productId)
  }
  
  clearCart(){
    if(confirm('Do you really want to clear the cart?'))
      this.cartSer.clearCart()
  }
  ngOnDestroy(){
    this.sub.unsubscribe()
  }
}
