import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-joint-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './joint-cart.component.html',
  styleUrl: './joint-cart.component.css'
})
export default class JointCartComponent implements OnInit{
  create: boolean = false;
  join: boolean = false;
  cartCode:string ='';
  cartName: string ='';
  userId : string | null = null;
  productService = inject(ProductService);
  authService = inject(AuthService);
  owner:string = '';
  otpMessage: string = '';
  created:boolean=false;
  router = inject(Router);
  socketService = inject(SocketService);
  chatId !:string;
  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.userId = localStorage.getItem('user_id');
     }
      this.create = this.productService.create;
      this.join = this.productService.join;
    }

    createCart() {
      if(this.userId)
      {
      this.productService.createCart(this.userId, this.cartName).subscribe(
        (response) => {
          console.log('Cart created:', response);
          this.cartCode = response.cartCode;
          this.chatId = response.chatId;
          this.otpMessage = 'Send this OTP code to the person you want to share the cart with: ' + this.cartCode;
          this.created = true;
          this.create = false;
          this.socketService.joinChat(this.chatId);
          this.productService.create = false;
          alert('Cart created successfully! Code: '+this.cartCode);
        },
        (error) => {
          console.error('Error creating cart:', error);
          alert('Error creating cart');
        }
      );
    }
    }

    
    joinCart() {
      console.log(this.cartCode);
      if(this.userId)
      this.productService.joinCart(this.userId, this.cartCode).subscribe(
        (response) => {
          console.log('Joined cart:', response);
          alert('Joined cart successfully!');
          this.owner = response.owner;
          this.chatId = response.chatId;
          this.socketService.joinChat(this.chatId);
          this.join = false;
          this.router.navigate(['home']);
        },
        (error) => {
          console.error('Error joining cart:', error);
          alert('Error joining cart');
        }
      );
    }

}
