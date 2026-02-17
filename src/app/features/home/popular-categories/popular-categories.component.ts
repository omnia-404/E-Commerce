import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Categories } from '../../../core/models/categories/categories.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent implements OnInit {
  private readonly CategoriesService = inject(CategoriesService);
  private readonly translateService = inject(TranslateService);

  categoriesList: WritableSignal<Categories[]> = signal<Categories[]>([]);

  ngOnInit(): void {
    this.onLang();
    this.CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onLang(): void {
    this.translateService.onLangChange.subscribe({
      next: (data) => {
        this.CategoriesCustomOptions = {
          ...this.CategoriesCustomOptions,
          rtl: data.lang === 'ar' ? true : false,
        };
      },
    });
  }

  CategoriesCustomOptions: OwlOptions = {
    autoplay: true,
    margin: 12,
    autoplayTimeout: 3500,
    autoplayHoverPause: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
      1100: {
        items: 6,
      },
    },
    nav: false,
    rtl: this.translateService.getCurrentLang() === 'ar' ? true : false,
  };
}
