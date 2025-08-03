
import { CartService } from './../../core/services/cart/cart.service';
import { Component, computed, inject, input, OnInit, Signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  constructor(private cartService:CartService){}
  isLogged = input<boolean>(true)
  private readonly wishlistService = inject(WishlistService)
  isMobileMenuOpen:boolean = false;
  itemsNum: Signal<number> = computed( ()=> this.cartService.cartItemsNum())
  wishlistItemsCount: Signal<number> = computed( ()=> this.wishlistService.wishlistItemsCount())
  ngOnInit(): void {
    this.getusercart();
  }
  getusercart():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartService.cartItemsNum.set(res.numOfCartItems)
      }
    })
  }
  getuserwishList(){
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        this.wishlistService.wishlistItemsCount.set(res.count)
      }
    })
  }
  signout():void{
    localStorage.removeItem('myToken')
}
}
