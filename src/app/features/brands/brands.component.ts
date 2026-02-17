import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Brands } from './models/brands/brands.interface';
import { BrandsService } from './services/brands/brands.service';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);
  allBrands: WritableSignal<Brands[]> = signal<Brands[]>([]);
  ngOnInit(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.allBrands.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
