import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import  JointCartComponent  from '../../pages/joint-cart/joint-cart.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, JointCartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

     authService = inject(AuthService);
     isLoggedIn: boolean = false;
     productService = inject(ProductService);
     router = inject(Router);
      ngOnInit(): void {
          this.authService.isLoggedIn$.subscribe(res=>{
            this.isLoggedIn = this.authService.isLoggedIn();
          })
      }

     logout(){
      localStorage.removeItem("user_id");
      this.authService.isLoggedIn$.next(false);
     }

     showCreateCart() {
      this.productService.setCreateCart();
      this.router.navigate(['/joint-cart']);
    }
  
    showJoinCart() {
      this.productService.setJoinCart();
      this.router.navigate(['/joint-cart']);
    }

  
    // toggleDropdown() {
    //   this.dropdownOpen = !this.dropdownOpen;
    // }
  
    // keepDropdownOpen() {
    //   this.dropdownOpen = true;
    // }
}
