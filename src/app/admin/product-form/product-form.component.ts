import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { CatItem } from 'src/app/models/categoryItem';
import { ProductService } from 'src/app/product.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnDestroy,OnInit {
  id:string='';
  title2:string;
  price2:number;
  category2:string;
  imageUrl2:string;
  list:CatItem[];
  sub:Subscription;
  
  
  constructor(private catSer: CategoryService,private productSer:ProductService,private route:ActivatedRoute) {
    this.sub=this.catSer.getCategories().subscribe(response=>{
    this.list=response.map(item=>{
        return  {
            key: item.payload.doc.id,
          ...item.payload.doc.data()
        } as CatItem
      })
    })
   }
   ngOnInit(){
      this.id=this.route.snapshot.paramMap.get('id')
      if(this.id)
      {
        this.productSer.get(this.id).subscribe((data=>{
          this.title2=(data.payload.data() as Item).title
          this.price2=(data.payload.data() as Item).price
          this.category2=(data.payload.data() as Item).category
          this.imageUrl2=(data.payload.data() as Item).imageUrl 
        }))
      }
   }
   save(form:NgForm){
     if(this.id)
     {
        this.productSer.update(form.value,this.id)
     }
     else
     {
      this.productSer.addProduct(form.value)
     }
     form.reset()
   }
   isDelete()
   {
     if(this.id) return true
     return false
   }
   Delete(){
     if(confirm('Are you sure that you want to delete this product?'))
     {
      this.productSer.delete(this.id)
     }
     
   }
  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
