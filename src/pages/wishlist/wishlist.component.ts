import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IProduct } from '../../core/shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  wishlistData: WritableSignal<IProduct[] | null> = signal(null);

  ngOnInit(): void {
    this.getWishlist();
  }
  getWishlist(){
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        console.log(res)
        this.wishlistService.wishlistItemsCount.set(res.count)
        this.wishlistData.set(res.data)
      }
    })
  }
  addProductToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
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
        this.getWishlist()
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
