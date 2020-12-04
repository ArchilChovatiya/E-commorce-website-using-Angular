import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CartServiceService } from './cart-service.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private fireStore:AngularFirestore,private cartSer:CartServiceService ) { }

  placeOrder(data,userId){
     let x= this.fireStore.collection('PlacedOrders').add(data)
     this.fireStore.doc('MyOrders/'+userId).collection('orders').add(data)
     this.cartSer.clearCart()
     return x
  }
  getOrder(id:string){
    return this.fireStore.doc('PlacedOrders/'+id)
  }
  getMyOrders(id:string)
  {
    return this.fireStore.doc('MyOrders/'+id).collection('orders').snapshotChanges()
  }
}

