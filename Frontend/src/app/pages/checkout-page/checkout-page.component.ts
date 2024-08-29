import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export  default class CheckoutPageComponent implements OnInit{
     totalAmount !:number;
     productService = inject(ProductService);
      ngOnInit(): void {
          this.totalAmount = this.productService.getAmount();
      }
}
