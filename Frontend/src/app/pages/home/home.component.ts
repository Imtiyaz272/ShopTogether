import { Component, inject, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent implements OnInit {
     productService = inject(ProductService);
     products: Product[] = [];
     ngOnInit(): void {
         this.getProducts();
     }

     getProducts(){
      this.productService.getProducts().subscribe({
        next:(res) => {
         this.products = res.data;
        }
      })
     }
}
