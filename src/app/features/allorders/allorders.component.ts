import { Userdata } from './../../core/auth/models/user/userdata.interface';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { OrdersService } from './services/orders.service';
import { AuthService } from '../../core/auth/Services/Authentication/auth.service';
import { CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { orderResponse } from './models/ordersdetails.interface';

@Component({
  selector: 'app-allorders',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {
  private readonly ordersService = inject(OrdersService);
  private readonly authService = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);
  ordersList: WritableSignal<orderResponse> = signal<orderResponse>([]);
  id!: string;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.decodeUserToken();
      this.id = this.authService.userDataDecoded.id;
      this.ordersService.getUserOrders(this.id).subscribe({
        next: (res) => {
          this.ordersList.set(res);
        },
      });
    }
  }
}
