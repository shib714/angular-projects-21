import { Component } from '@angular/core';
import { AccountForm } from '../account/account-form/account-form';
import { PreferencesForm } from '../account/preferences-form/preferences-form';
import { AddressForm } from '../address/address-form';


@Component({
  selector: 'app-profile-form',
  template: `
    <div class="container">
      <form (submit)="onSubmit($event)">
        <account-form />
        <address-form />
        <preferences-form />
        <div class="actions">
          <button type="submit">Submit </button>
        </div>
      </form>
  </div>`,
  styleUrls: ['./profile-form.scss'],
  imports: [
    AccountForm,
    AddressForm,
    PreferencesForm,
  ],
})
export class ProfileForm {

  //submit the form
  protected onSubmit(event: SubmitEvent) {
    event.preventDefault();
  }
}