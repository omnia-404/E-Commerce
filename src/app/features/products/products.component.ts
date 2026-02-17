import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { product } from '../../core/models/products/product.interface';
import { ProductsService } from '../../core/services/products.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { SearchPipe } from '../../shared/pipes/search-pipe';

@Component({
  selector: 'app-products',
  imports: [NgxPaginationModule, SearchPipe, FormsModule, CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  pagination: PaginationInstance = {
    id: 'products',
    itemsPerPage: 40,
    currentPage: 1,
    totalItems: 0,
  };

  term: string = '';
  pageChanged(page: number): void {
    this.pagination.currentPage = page;
    this.getAllProductsData();
  }
  private readonly productsService = inject(ProductsService);

  allProducts: WritableSignal<product[]> = signal<product[]>([]);

  ngOnInit(): void {
    this.getAllProductsData();
  }
  getAllProductsData(): void {
    this.productsService
      .getAllProducts(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe({
        next: (res) => {
          this.allProducts.set(res.data);
          this.pagination.totalItems = res.results;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
