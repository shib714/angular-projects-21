import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs'

import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../cart/cart.service';
import { CartShell } from '../cart/cart-shell/cart-shell';
import { VehicleList } from './vehicle-list/vehicle-list';

@Component({
  selector: 'sw-app',
  standalone: true,
  imports: [CommonModule, MatTabsModule,  MatBadgeModule, CartShell, VehicleList],
  templateUrl: './vehicle-app.html',
  styleUrls: ['./vehicle-app.scss']
})
export class VehiclesApp {
  pageTitle = signal<string>('Star Wars Vehicle for Sales');
  cartService = inject(CartService);

  cartCount = computed(() => this.cartService.cartItems().reduce((acc, item) => acc + item.quantity, 0));

}