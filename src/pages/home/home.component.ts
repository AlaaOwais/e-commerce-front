import { Component, ElementRef, inject, ViewChild, AfterViewInit, Input, Signal, signal } from '@angular/core';
import { CategoryService } from '../../core/services/category/category.service';
import { ICategory } from '../../core/shared/interfaces/icategory';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../../core/services/product/product.service';
import { IProduct } from '../../core/shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, ProductCardComponent ,ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // @Input() product: any;
  Math = Math;
  private readonly categoryService = inject(CategoryService);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  // products: IProduct[] = [];
  myCategory =  signal<ICategory[]>([])
  products =  signal<IProduct[]>([])

  customOptions: OwlOptions = {
    items: 5,                   // Show 5 items at once
    slideBy: 1,                 // Move 1 item at a time
    margin: 10,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 1500,      // 3s between transitions
    autoplaySpeed: 1000,        // 1s transition animation
    smartSpeed: 1000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 5 }         // Show 5 items on desktop
    },
    nav: true,
    navText: ['‹', '›']
}

  ngOnInit(): void {
    this.callCategory();
    this.callProduct();
  }
  callCategory() {
    this.categoryService.getAllCategory().subscribe({
      next: (res) => {
        console.log(res.data);
        this.myCategory.set(res.data);
      },
    });
  }
  callProduct(){
    this.productService.getAllProducts().subscribe({
      next:(res)=>{
        this.products.set(res.data)
      },
    })
  }

  addProductToCart(id:string){
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res.data)
        this.cartService.cartItemsNum.set(res.numOfCartItems)
      },
      error:(err)=>{
        console.log(err.error)
      }
    })
  }
  addToFav(id :string){
    this.wishlistService.addProductToWishlist(id).subscribe({
      next:(res)=>{
        console.log(res.data)
      }
    })
  }
  removeFromMyWishlist(id :string){
    this.wishlistService.removeProductFromWishlist(id).subscribe({
      next:(res)=>{
        console.log(res.data)
      }
    })
  }
}

