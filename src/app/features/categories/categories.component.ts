import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Categories } from '../../core/models/categories/categories.interface';
import { CategoriesService } from '../../core/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  productsCategories: WritableSignal<Categories[]> = signal<Categories[]>([]);

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.productsCategories.set(res.data);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
