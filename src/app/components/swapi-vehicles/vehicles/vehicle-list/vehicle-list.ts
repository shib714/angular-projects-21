import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { VehicleService } from '../vehicle.service';
import { MatDialog } from '@angular/material/dialog';
import { VehicleDetailDialog } from '../vehicle-detail/vehicle-detail-dialog';

@Component({
  selector: 'vehicle-list',
  standalone: true,
  imports: [CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  templateUrl: './vehicle-list.html',
  styles: `
  `,
})
export class VehicleList {
  pageTitle = 'Vehicles';
  errorMessage = '';
  vehicleService = inject(VehicleService);
  private dialog = inject(MatDialog);


   // Component signals
  vehicles = computed(() => {
    try {
      return this.vehicleService.vehicles();
    } catch (err) {
      this.errorMessage = typeof err === 'string' ? err : 'An error occurred while fetching vehicles';
      console.error(this.errorMessage, err);
      return [];
    }
  });

  selectedVehicle = this.vehicleService.selectedVehicle;

  // When a vehicle is selected, emit the selected vehicle name
  onSelected(vehicleName: string): void {
    this.vehicleService.vehicleSelected(vehicleName);
    this.showDialog();
  }
  showDialog(): void {
    this.dialog.open(VehicleDetailDialog, {
      width: '400px',
    });
  }

}