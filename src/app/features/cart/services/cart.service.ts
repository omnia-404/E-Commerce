import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CartDataResponse } from '../models/cart-data.interface';
import { CartdetailsResponse } from '../models/cartdetails.interface';
import { PaymentResponse } from '../models/payment.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);

  cartCount: WritableSignal<number> = signal<number>(0);

  addProductToCart(id: string): Observable<CartDataResponse> {
    return this.httpClient.post<CartDataResponse>('https://ecommerce.routemisr.com/api/v2/cart', {
      productId: id,
    });
  }

  getloggedUserCart(): Observable<CartdetailsResponse> {
    return this.httpClient.get<CartdetailsResponse>('https://ecommerce.routemisr.com/api/v2/cart');
  }
  removeProductFromCart(id: string): Observable<CartdetailsResponse> {
    return this.httpClient.delete<CartdetailsResponse>(
      'https://ecommerce.routemisr.com/api/v2/cart/' + id,
    );
  }

  updateProductQnt(id: string, pCount: number): Observable<CartdetailsResponse> {
    return this.httpClient.put<CartdetailsResponse>(
      'https://ecommerce.routemisr.com/api/v2/cart/' + id,
      {
        count: pCount,
      },
    );
  }
  clearUserCart(): Observable<string> {
    return this.httpClient.delete<string>('https://ecommerce.routemisr.com/api/v2/cart');
  }

  // checkoutSession(cartId: string | null, checkOutDetails: object): Observable<PaymentResponse> {
  //   return this.httpClient.post<PaymentResponse>(
  //     environment.base_url + `orders/checkout-session/${cartId}?url=http://localhost:4200`,
  //     checkOutDetails,
  //   );
  // }

  checkoutSession(cartId: string | null, addressInfo: object): Observable<PaymentResponse> {
    const returnUrl = window.location.origin;
    return this.httpClient.post<PaymentResponse>(
      `${environment.base_url}orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`,
      addressInfo,
    );
  }
}
