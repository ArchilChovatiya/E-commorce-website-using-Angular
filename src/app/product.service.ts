import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from './models/item';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private fireStore:AngularFirestore) { }

  addProduct(product:Item){
    this.fireStore.collection('products').add(product);
  }

  getAll(){
    return this.fireStore.collection('products').snapshotChanges()
  }

  get(id:string)
  {
    return this.fireStore.doc('products/' + id).snapshotChanges() 
  }

  update(product:Item,id:string){
    this.fireStore.doc('products/'+id).update(product)
  }
  delete(id:string){
    this.fireStore.doc('products/'+id).delete()
  }
}
