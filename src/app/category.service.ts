import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private fireStore:AngularFirestore) { }
  getCategories(){
    return this.fireStore.collection('Category').snapshotChanges()
  }
}
