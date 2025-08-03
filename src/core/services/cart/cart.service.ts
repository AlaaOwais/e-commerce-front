import { HttpClient } from '@angular/common/http';
import {  Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient) { }


  // myToken = localStorage.getItem("myToken")!;
  // cartItemsNum :BehaviorSubject<number> = new BehaviorSubject(0);
  cartItemsNum: WritableSignal<number> = signal(0)
  itemsPerProduct: WritableSignal<number> = signal(1)

  addProductToCart(id:string): Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": id
      }
    )
  }
  getLoggedUserCart():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`)
  }
  removeSpecificCartItem(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`)
  }
  clearUserCart():Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`)
  }
  updateCartProductQuantity(id:string, quantity:number):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        "count": quantity
      })
  }
    }
