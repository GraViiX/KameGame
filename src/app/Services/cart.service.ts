import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPurchase } from '../Interface/ipurchase';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class CartService {


  constructor(private http:HttpClient) { }

  url : string = "https://localhost:44349/api/ShopModels/";

  PurchaseService(purchase:IPurchase[]):Observable<IPurchase[]>{
    return this.http.post<IPurchase[]>(`${this.url}SavePurchases`,purchase,httpOptions)
  }
}
