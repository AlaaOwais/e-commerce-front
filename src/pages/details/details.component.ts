import { IProduct } from './../../core/shared/interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product/product.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../core/shared/interfaces/icart';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-details',
  imports: [FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute =inject(ActivatedRoute);
  private readonly productService =inject(ProductService);
  private readonly cartService =inject(CartService);
  private readonly wishlistService =inject(WishlistService);
  prodId:any;
  product:IProduct = {} as IProduct
  cart:ICart = {} as ICart
  Math = Math;
  quantity:number = 1
  mainImage:string = ''

  changeImage(newImage: string) {
    this.mainImage = newImage;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        this.prodId = res.get('id')
        this.productService.getProductsById(this.prodId).subscribe({
          next:(res)=>{
            console.log(res.data)
            this.product = res.data
            this.mainImage = this.product.imageCover
          }
        })
      }
    })
    this.updateQuantity(this.prodId,this.quantity)
  }
  addToCart() {
  this.addProductToCart(this.prodId);
  this.updateQuantity(this.prodId, this.quantity);
}
  updateQuantity(id:string, quantity:number):void{
    this.cartService.updateCartProductQuantity(id,quantity).subscribe({
        next:(res)=>{
        console.log(res.data)
        this.cart = res.data.products.count
        this.cartService.itemsPerProduct.set(quantity)
      }
    })
  }
  addProductToCart(id:string){
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res.data)
        this.cartService.cartItemsNum.set(res.numOfCartItems)
        this.updateQuantity(this.prodId, this.quantity);
      }
    })
  }
  addToWishList(id:string){
    this.wishlistService.addProductToWishlist(id).subscribe({
      next:(res)=>{
        console.log(res)
      }
  })
  }
}
