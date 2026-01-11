import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactsService } from '../service/contacts.service';
import { DeleteConfirmDialog } from '../delete-confirm-dialog/delete-confirm-dialog';
import { ContactModel } from '../models/contact-model';
import { Contact } from '../contact/contact';



@Component({
  selector: 'contacts',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    Contact,
  ],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactList {
  protected contactsService = inject(ContactsService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  deleteContact(contact: ContactModel): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialog, {
      width: '400px',
      data: { contact }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contactsService.deleteContact(contact.id);
        this.snackBar.open('Contact deleted successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    });
  }
} 