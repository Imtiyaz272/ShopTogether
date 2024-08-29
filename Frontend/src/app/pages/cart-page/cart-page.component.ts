import { Component, inject, OnInit } from '@angular/core';
import { Cart, ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import ChatComponent  from '../chat/chat.component';


@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, ChatComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export default class CartPageComponent implements OnInit{
     
  cart!:Cart;
  productService = inject(ProductService);
  authService = inject(AuthService);
  userId : string | null = null;
  isOwner : boolean = false;
  cartName:string='';
  products: { [productId: string]: any } = {};
  ngOnInit(): void {
      
    if (typeof window !== 'undefined' && window.localStorage) {
      this.userId = localStorage.getItem('user_id');
     }
      console.log(this.userId);
      if(this.userId)
      {
        this.productService.getCart(this.userId).subscribe({
        next:(data) => {
          this.cart = data;
          this.cartName = data.cartName;
          this.productService.setAmount(this.cart.totalPrice);
        },
        error:(err) => {
          console.log('Error fetching the cart');
        }
      })
    }
  }

  updateQuantity(quantity:number, productId:string){
    if(this.userId)
    this.productService.addToCartSer(productId, quantity, this.userId).subscribe({
      next:(res) => {
        console.log("Quantity updated successfully");
      }
    })
  }

  

}
