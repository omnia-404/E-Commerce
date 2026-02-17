import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductDetailsService } from '../products/services/product details/product-details.service';
import { ActivatedRoute } from '@angular/router';
import { ProductDetails } from '../products/models/producrDetails/product-details.interface';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly productDetailsService = inject(ProductDetailsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  productId: string | null = null;

  productDetailsData: WritableSignal<ProductDetails> = signal<ProductDetails>({} as ProductDetails);
  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParam) => {
        this.productId = urlParam.get('id');
      },
    });
  }

  ngOnInit(): void {
    this.getProductId();

    this.productDetailsService.getSpecificProduct(this.productId).subscribe({
      next: (res) => {
        this.productDetailsData.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
