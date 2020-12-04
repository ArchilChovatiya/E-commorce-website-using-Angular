import { Component, OnInit, OnDestroy} from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { ItemWithId } from '../models/ItemWithId';
import { CategoryService } from '../category.service';
import { CatItem } from '../models/categoryItem';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit,OnDestroy {
  private list:ItemWithId[];
  flist:ItemWithId[]=[];
  sub:Subscription;
  listCat:CatItem[];
  subCat:Subscription;
  category:string;
  cat:boolean=false

  constructor(private prodSer:ProductService,private catSer: CategoryService ,private route:ActivatedRoute) { 
    
    this.sub=this.prodSer.getAll().subscribe(data=>{
      this.list= data.map( s=>{
        this.cat=true
        return {id:s.payload.doc.id,
               ...s.payload.doc.data()} as ItemWithId
      })
      this.route.queryParamMap.subscribe(param=>{
        this.category=param.get('category')
         if(this.category)
         {
          this.flist=this.list.filter(product=>{return product.category===this.category})
         }
         else
         {
           this.flist=this.list
         }
      }) 
     }) 
    }
  async ngOnInit() {
     this.subCat=this.catSer.getCategories().subscribe(response=>{
      this.listCat=response.map(item=>{
          return  {
              key: item.payload.doc.id,
            ...item.payload.doc.data()
          } as CatItem
        })
      })
      
      
  }
  ngOnDestroy(){
    this.sub.unsubscribe()
    this.subCat.unsubscribe()
  }
}
