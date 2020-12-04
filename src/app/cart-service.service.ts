import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ItemWithId } from './models/ItemWithId';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartServiceService implements OnDestroy,OnInit{

  constructor(private firestore:AngularFirestore) {}
   ngOnInit(){
    this.getCartId()
  }
  sub:Subscription
  sub1:Subscription
  sub2:Subscription
  cartId:string
   async CreateOrGetID()
  {
    let cartId=localStorage.getItem('cartId')
      if(cartId) 
      {
      return  this.cartId=cartId
      }
      else{
        let result= await this.firestore.collection('product-cart').add({})
        localStorage.setItem('cartId',result.id)
        return this.cartId=result.id
      }  
  }

getCartId(){
  this.cartId=localStorage.getItem('cartId')
}

   addToCart(product:ItemWithId){
    let Item=this.firestore.doc('product-cart/'+this.cartId+'/items/'+product.id)
    let item$=Item.get()
    this.sub2=item$.subscribe(item=>{
      if(item.exists)
      {
        Item.update({quantity: item.data().quantity + 1})
      }
      else{
        Item.set({
          ...product,
          quantity: 1})
      }
    })
  }
  
removeFromCart(productID:string){
    let Item=this.firestore.doc('product-cart/'+this.cartId+'/items/'+productID)
    let item$=Item.get()
    this.sub1=item$.subscribe(item=>{
      if(item.exists)
      {
        if(item.data().quantity>1)
        {
          Item.update({quantity: item.data().quantity - 1})
        }
        else
        {
          Item.delete()
        }
      }
    })
  }
  

  async getcount(productID:string){
    return this.firestore.doc('product-cart/'+this.cartId+'/items/'+productID).snapshotChanges()
  }

 async getItems(){
    return this.firestore.doc('product-cart/'+this.cartId).collection('items').snapshotChanges()
    
}

async clearCart()
{
  
  let item$=this.firestore.doc('product-cart/'+this.cartId).collection('items')
  this.sub=item$.snapshotChanges().subscribe(value=>{
    for(let i=0;i<value.length;i++)
    {
      item$.doc(value[i].payload.doc.id).delete()
      this.firestore.collection('product-cart/').doc(this.cartId).delete()
    }
    item$.doc()
  })
}

ngOnDestroy(){
  this.sub.unsubscribe()
  this.sub1.unsubscribe()
  this.sub2.unsubscribe()
}
}
