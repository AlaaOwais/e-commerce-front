import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }
  getAllProducts(categoryId?:string ): Observable<any>{
    let params = new HttpParams()
    if(categoryId){
      params= params.set('category[in]',categoryId)
    }
    // if(price){
    //   params.set('price[lte]',price)
    // }
    // if(brand){
    //   params.set('brand',brand)
    // }
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products`,{params})
  }
  
  getProductsById(id:string): Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }
}
