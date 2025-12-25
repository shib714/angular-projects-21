import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Field, form, submit } from '@angular/forms/signals';
import { Profile, defaultProfile, profileSchema } from '../profile';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FieldError } from '../../../../common/utils/field-error';

@Component({
  selector: 'profile-form',
  imports: [
    Field, 
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
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileForm {

  profileFormModel = signal<Profile>(defaultProfile);

  profileForm = form(this.profileFormModel, profileSchema);

  
  cancel() {
    // Reset form (or navigate to another page)
    this.profileForm().reset(defaultProfile);
  }

  saveProfile() {
    //this.subscribeMessage.set('');
    submit(this.profileForm, () =>
      this.onSubmit());
  }

    async onSubmit() {     
      // Submit to the server
      console.log('Submitting data to server:', this.profileForm().value());
      // Reset form (or navigate to another page)
       this.profileForm().reset(defaultProfile);
    }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    const selectedDate = event.value;
    if (selectedDate) {
      // Format the date to YYYY-MM-DD string
      const formattedDate = selectedDate.toISOString().slice(0, 10);
      this.profileFormModel.update(model => ({
        ...model,
        dateOfBirth: formattedDate
      }));
    } else {
      this.profileFormModel.update(model => ({
        ...model,
        dateOfBirth: ''
      }));
    }
  }
}
