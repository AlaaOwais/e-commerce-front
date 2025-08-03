import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { }
  getAllCategory():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories`)
  }
  getSpecificCategory(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`)
  }
}
