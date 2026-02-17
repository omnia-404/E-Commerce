import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { WishlistService } from './services/wishlist.service';
import { Wishlist } from './models/wishlist.interface';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { STORED_KEYS } from '../../core/constants/storedKeys';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly plat_id = inject(PLATFORM_ID);

  wishlistItems: WritableSignal<Wishlist[]> = signal<Wishlist[]>([]);
  getLoggedUserWishlist(): void {
    this.wishlistService.getWhishlistItems().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.wishlistItems.set(res.data);
          console.log(this.wishlistItems());
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addProductItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartService.cartCount.set(res.numOfCartItems);
          //? Show Toaster
          this.toastrService.success(res.message, 'FreshCart');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItem(id: string): void {
    this.wishlistService.removeItemFromWishlist(id).subscribe({
      next: (res) => {
        this.getLoggedUserWishlist();
        console.log(res);
      },
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.plat_id)) {
      const token = localStorage.getItem(STORED_KEYS.userToken);
      if (token) {
        this.getLoggedUserWishlist();
      }
    }
  }
}
