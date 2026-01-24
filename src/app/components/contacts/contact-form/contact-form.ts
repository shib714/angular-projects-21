import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from "@angular/core";
import { form, FormField, submit } from "@angular/forms/signals";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { FieldError } from "../../../common/utils/field-error";

import { ContactModel, contactSchema, defaultContactModel } from "../models/contact-model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router, ActivatedRoute } from "@angular/router";
import { ContactsService } from "../service/contacts.service";


@Component({
    selector: 'contact-form',
    imports: [
        FormField,
        FieldError,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCheckboxModule,
        MatDatepickerModule,
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './contact-form.html',
    styleUrl: './contact-form.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactForm implements OnInit {

    isEditMode = signal(false);
    isSubmitting = signal(false);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private contactsService = inject(ContactsService);
    private snackBar = inject(MatSnackBar);

    contactFormModel = signal<ContactModel>(defaultContactModel);

    contactForm = form(this.contactFormModel, contactSchema);

    ngOnInit(): void {
        this.contactForm().reset(defaultContactModel);
        this.checkEditMode();
    }


    private checkEditMode(): void {
        const contactId = this.route.snapshot.paramMap.get('id');
        console.log('Contact ID:', contactId);
        if (contactId) {
            this.isEditMode.set(true);
            this.loadContact(contactId);
            console.log('Contact ID:', contactId);
        }
    }

    private loadContact(id: string): void {
        const contactModel = this.contactsService.getContactById(id);
        if (contactModel) {
            this.contactFormModel.set(contactModel);
            this.isEditMode.set(true);
        } else {
            this.snackBar.open('Contact not found', 'Close', { duration: 3000 });
            this.router.navigate(['/contacts']);
        }
    }

      cancel() {
        // Reset form (or navigate to another page)
        this.router.navigate(['/contacts']);
      }

    saveContact() {
        //this.subscribeMessage.set('');
        submit(this.contactForm, () =>
            this.onSubmit());
    }

    async onSubmit() {
        // Submit to the server
        console.log('Submitting data to server:', this.contactForm().value());
        if (this.contactForm().valid()) {
            this.isSubmitting.set(true);

            const formValue = this.contactForm().value();

            if (this.isEditMode()) {
                const contactId = this.route.snapshot.paramMap.get('id')!;
                this.contactsService.updateContact(contactId, formValue);
                this.snackBar.open('Contact updated successfully', 'Close', { duration: 3000 });
            } else {
                this.contactsService.addContact(formValue);
                this.snackBar.open('Contact added successfully', 'Close', { duration: 3000 });
            }
            this.isSubmitting.set(false);
            // Reset form (or navigate to another page)
            //this.contactForm().reset(defaultContactModel);
            this.router.navigate(['/contacts']);
        }
    }
}

