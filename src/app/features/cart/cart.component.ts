import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Cartdetails } from './models/cartdetails.interface';
import { CartService } from './services/cart.service';
import { STORED_KEYS } from '../../core/constants/storedKeys';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  shippingPrice: number = 0;
  private readonly cartService = inject(CartService);
  cartDetailsData: WritableSignal<Cartdetails> = signal<Cartdetails>({} as Cartdetails);

  private readonly plat_id = inject(PLATFORM_ID);

  getUserCartData(): void {
    this.cartService.getloggedUserCart().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartDetailsData.set(res.data);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.plat_id)) {
      const token = localStorage.getItem(STORED_KEYS.userToken);
      if (token) {
        this.getUserCartData();
      }
    }
  }

  removeProduct(id: string): void {
    this.cartService.removeProductFromCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.getUserCartData();
          this.cartService.cartCount.set(res.numOfCartItems);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateProductCount(id: string, count: number): void {
    this.cartService.updateProductQnt(id, count).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.getUserCartData();
          this.cartService.cartCount.set(res.numOfCartItems);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  clearCart(): void {
    this.cartService.clearUserCart().subscribe({
      next: (res) => {
        this.getUserCartData();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
