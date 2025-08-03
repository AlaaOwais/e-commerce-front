import { Component, inject, Input, input, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ProductService } from '../../core/services/product/product.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IProduct } from '../../core/shared/interfaces/iproduct';
import { ICategory } from '../../core/shared/interfaces/icategory';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  myCategory: ICategory[] = [];
  isAddedToWishlist:boolean =false
  @Input({required: true}) products :IProduct[] = []
  Math = Math;


  addProductToCart(id:string){
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res.data)
        this.cartService.cartItemsNum.set(res.numOfCartItems)
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
  addRemoveWhishlist(prodId:string):void{
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        console.log(res)
        this.isAddedToWishlist = res.data.include(prodId)
        console.log(this.isAddedToWishlist)
      }
    })
  }
    calculateDiscountPercentage(originalPrice: number, discountedPrice: number): number {
    if (typeof originalPrice !== 'number' || typeof discountedPrice !== 'number') {
      return 0;
    }
    if (originalPrice <= 0 || discountedPrice <= 0 || discountedPrice >= originalPrice) {
      return 0;
    }

    const discountAmount = originalPrice - discountedPrice;
    const discountPercentage = (discountAmount / originalPrice) * 100;
    return Math.round(discountPercentage);
  }
}
