import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product, ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export default class ProductPageComponent implements OnInit{
      
  product: Product | undefined;
  productService = inject(ProductService);
  authService = inject(AuthService);
  userId : string | null = null;
  router = inject(Router);

  constructor(private route: ActivatedRoute){}
      ngOnInit(): void {
          this.getProductDetails();
      }

      getProductDetails(){
          const productId = this.route.snapshot.paramMap.get('id') || '';
          this.productService.getProductDetails(productId).subscribe({
              next:(res) => {
                this.product = res.data;
              },
              error:(err) => {
                console.error("Product details not fetched");
              }
          })
      }

      addToCart(quantity:Number){
        const productId = this.route.snapshot.paramMap.get('id') || '';
        if (typeof window !== 'undefined' && window.localStorage) {
          this.userId = localStorage.getItem('user_id');
         }
          console.log(productId)
          console.log(this.userId);
          if(this.userId)
          this.productService.addToCartSer(productId, quantity, this.userId).subscribe({
            next:(res) => {
              this.router.navigate(['cart']);
              console.log("Added successfully");
            }
          })
      }
}
