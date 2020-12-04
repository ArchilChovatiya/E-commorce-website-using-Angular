import { Component, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { ItemWithId } from 'src/app/models/ItemWithId';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
list:ItemWithId[]
flist:ItemWithId[]
sub:Subscription
  constructor(private prodSer:ProductService) { 
    this.sub=this.prodSer.getAll().subscribe(data=>{
     this.flist=this.list= data.map( s=>{
       return {id:s.payload.doc.id,
              ...s.payload.doc.data()} as ItemWithId
    }) 
    })
  }

  filter(query:string)
  {
      this.flist= (query) ? this.list.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())):this.list
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
