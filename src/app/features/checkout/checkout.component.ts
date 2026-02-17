import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/services/cart.service';
import { AuthService } from '../../core/auth/Services/Authentication/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly platformId = inject(PLATFORM_ID);

  cartID: string | null = null;
  ngOnInit(): void {
    this.checkoutFormInitialization();
    this.getCartId();
  }

  checkOutForm!: FormGroup;

  checkoutFormInitialization(): void {
    this.checkOutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern(/^(?:\+20|0)?1(?:0|1|2|5)\d{8}$/)]],
        city: [null, [Validators.required]],
      }),
    });
  }

  onSubmitCheckoutForm(): void {
    if (this.checkOutForm.valid) {
      this.cartService.checkoutSession(this.cartID, this.checkOutForm.value).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            if (isPlatformBrowser(this.platformId)) {
              window.open(res.session.url, '_self');
            }
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.cartID = urlParams.get('id');
        console.log(this.cartID);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
