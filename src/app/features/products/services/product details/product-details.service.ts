import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ProductDetailsResponse } from '../../models/producrDetails/product-details.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  private readonly httpClient = inject(HttpClient);

  getSpecificProduct(id: string | null): Observable<ProductDetailsResponse> {
    return this.httpClient.get<ProductDetailsResponse>(environment.base_url + 'products/' + id);
  }
}
