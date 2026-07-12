import { Component, inject, Input, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { product } from "../../../core/models/products/product.interface";
import { CartService } from "../../../features/cart/services/cart.service";
import { ToastrService } from "ngx-toastr";
import { WishlistService } from "../../../features/wishlist/services/wishlist.service";
import { STORED_KEYS } from "../../../core/constants/storedKeys";

@Component({
  selector: "app-card",
  imports: [RouterLink],
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.css",
})
export class CardComponent {
  @Input() cardProduct: product = {} as product;
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  private isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    return !!localStorage.getItem(STORED_KEYS.userToken);
  }

  private redirectToLogin(): void {
    this.toastrService.info("Please login to continue", "FreshCart");
    this.router.navigate(["/login"]);
  }

  addProductItemToCart(id: string): void {
    if (!this.isLoggedIn()) {
      this.redirectToLogin();
      return;
    }
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === "success") {
          this.cartService.cartCount.set(res.numOfCartItems);
          //? Show Toaster
          this.toastrService.success(res.message, "FreshCart");
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addToWishlist(id: string): void {
    if (!this.isLoggedIn()) {
      this.redirectToLogin();
      return;
    }
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        if (res.status === "success") {
          //? Show Toaster
          this.toastrService.success(res.message, "FreshCart");
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
