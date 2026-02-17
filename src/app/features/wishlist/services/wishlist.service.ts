import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { WishlistResponse } from '../models/wishlist.interface';
import { ItemdataResponse } from '../models/itemdata.interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient);

  getWhishlistItems(): Observable<WishlistResponse> {
    return this.httpClient.get<WishlistResponse>(environment.base_url + 'wishlist');
  }

  removeItemFromWishlist(id: string): Observable<any> {
    return this.httpClient.delete<any>(environment.base_url + 'wishlist/' + id);
  }
  addProductToWishlist(itemId: string): Observable<ItemdataResponse> {
    return this.httpClient.post<ItemdataResponse>(
      environment.base_url + 'wishlist',

      { productId: itemId },
    );
  }
}
