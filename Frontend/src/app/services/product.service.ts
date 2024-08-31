import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { apiUrls } from '../api.urls';
import { AuthService } from './auth.service';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService{

  private http = inject(HttpClient);

  totalAmount !: number;
  create:boolean = false;
  join :boolean = false;
  owner:string ='';

  getProducts(){
    return this.http.get<Response<Product[]>>(`${apiUrls.apiUrl}/product`);
  }

  getProductDetails(productId:string){
     return this.http.get<Response<Product>>(`${apiUrls.productServiceApi}getProductDetails/${productId}`);
  }

  addToCartSer(productId:string, quantity:Number, userId:string){
    return this.http.post<any>(`${apiUrls.productServiceApi}addToCart`,{productId, quantity, userId});
  }

  getCart(userId:string){
    return this.http.get<Cart>(`${apiUrls.productServiceApi}getCart/${userId}`);
  }

  setAmount(totalAmount:number){
      this.totalAmount = totalAmount;
  }

  getAmount(){
    return this.totalAmount;
  }

  setCreateCart() {
    this.create = true;
    this.join = false;
  }

  setJoinCart() {
    this.create = false;
    this.join = true;
  }

  createCart(userId: string, cartName: string): Observable<any> {
    return this.http.post<any>(`${apiUrls.productServiceApi}createCart`, { userId, cartName });
  }

  joinCart(userId: string, cartCode: string): Observable<any> {
    return this.http.post<any>(`${apiUrls.productServiceApi}joinCart`, { userId, cartCode });
  }

  setOwner(owner:string){
     this.owner = this.owner;
  }

  getOwner(){
    return this.owner;
  }

  updateQuantity(productId: string, quantity: number) {
    return this.http.put(`${apiUrls.productServiceApi}updateQuantity`, { productId, quantity });
  }
}


export type Product = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
    rating: number;
    image: string;
}

export type Response<T> = {
    success: boolean;
    status: number;
    message: string;
    data: T
}

export type CartItem = {
  _id:string,
  productId: string,
  price: number;
  quantity: number;
  image:string;
  name:string;
}

export type Cart = {
   _id:string,
   items:CartItem[],
   totalPrice:number,
   totalQuantity:number,
   cartName:string,
   cartCode:string
}