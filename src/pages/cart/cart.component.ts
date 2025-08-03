import { RouterLink } from '@angular/router';
import { ICart } from '../../core/shared/interfaces/icart';
import { CartService } from './../../core/services/cart/cart.service';
import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService)
  cartDetailes : ICart = {} as ICart
  itemsNum: Signal<number> = computed( ()=> this.cartService.cartItemsNum())
  itemPerProd: Signal<number> = computed( ()=> this.cartService.itemsPerProduct())
  ngOnInit()
  {
    this.getUserCart();
  }
  getUserCart(){
      this.cartService.getLoggedUserCart().subscribe({
        next:(res)=>{
              console.log(res.data)
              this.cartDetailes = res.data
              this.cartService.cartItemsNum.set(res.numOfCartItems)
            }
  })
  }
  clearAll():void{
    this.cartService.clearUserCart().subscribe({
        next:(res)=>{
        console.log(res)
        this.cartDetailes = {} as ICart
        this.cartService.cartItemsNum.set(res.numOfCartItems)
      },
    })
  }
  deleteItem(id:string):void{
    this.cartService.removeSpecificCartItem(id).subscribe({
        next:(res)=>{
        console.log(res.data)
        this.cartDetailes = res.data
        this.cartService.cartItemsNum.set(res.numOfCartItems)
      }
    })
  }
  updateQuantity(id:string, quantity:number):void{
    this.cartService.updateCartProductQuantity(id,quantity).subscribe({
        next:(res)=>{
        console.log(res.data)
        this.cartDetailes = res.data
      }
    })
  }
}
