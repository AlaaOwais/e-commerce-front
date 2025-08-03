import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryService } from '../../core/services/category/category.service';
import { IProduct } from '../../core/shared/interfaces/iproduct';
import { ProductService } from '../../core/services/product/product.service';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ICategory } from '../../core/shared/interfaces/icategory';

@Component({
  selector: 'app-category',
  imports: [ProductCardComponent, RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productService = inject(ProductService);
  // private readonly categoryService = inject(CategoryService)
  // categoryId :Signal<string> = computed( ()=> )
    categoryId = signal<string | undefined>(undefined)
    // category =  signal<ICategory[]>([])
    products =  signal<IProduct[] | null>(null)

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        console.log(res)
        this.categoryId.set(res.get('id')!)
        this.callProduct(this.categoryId())
      }
    })
    // this.callcategory()
  }
    callProduct(cateId?:string):void{
    this.productService.getAllProducts(cateId).subscribe({
      next:(res)=>{
        if(cateId){
          // this.categoryId.set(cateId)
          this.products.set(res.data)
        }
        else{
          console.log("there is no products inthis catgory")
        }
      },
    })
  }
}
