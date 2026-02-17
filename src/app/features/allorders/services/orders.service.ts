import { orderResponse, Ordersdetails } from './../models/ordersdetails.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly httpClient = inject(HttpClient);

  getUserOrders(userId: string): Observable<orderResponse> {
    return this.httpClient.get<orderResponse>(
      'https://ecommerce.routemisr.com/api/v1/orders/user/' + userId,
    );
  }
}
