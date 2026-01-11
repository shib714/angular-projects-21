import { Component, signal } from '@angular/core';
import { AccountForm } from '../account/account-form/account-form';
import { PreferencesForm } from '../account/preferences-form/preferences-form';
import { AddressForm } from '../address/address-form';
import { Account, buildAccountSection, createAccountModel } from '../account/account-form/account-form.model';
import { Preferences, createPreferencesModel, buildPreferencesSection } from '../account/preferences-form/preferences-form.model';
import { Address, createAddressModel, buildAddressSection } from '../address/address-form.model';
import { form, submit } from '@angular/forms/signals';
import { DebugPanel } from '../shared/debug-panel';


export interface Profile {
  account: Account;
  shippingAddress: Address;
  preferences: Preferences;
}
@Component({
  selector: 'app-profile-form',
  template: `
    <div class="container">
      <form (submit)="onSubmit($event)">
        <account-form [form]='form.account' />
        <address-form  [form]='form.shippingAddress' />
        <preferences-form [form]='form.preferences' />
        <div class="actions">
          <button type="submit" [disabled]="!form().valid()">Submit </button>
        </div>
      </form>
      <debug-panel [form]='form()' />
  </div>`,
  styleUrls: ['./profile-form.scss'],
  imports: [
    AccountForm,
    AddressForm,
    PreferencesForm,
    DebugPanel,
  ],
})

//parent component of the overall form acts as an orchrestrator
export class ProfileForm {

  // Create the parent model by composing all the pieces
  readonly model = signal<Profile>({
    account: createAccountModel()(),
    shippingAddress: createAddressModel()(),
    preferences: createPreferencesModel()()
  });

    // Compose the form using section builders
  readonly form = form(this.model, s => {
    // Build each section using their respective builders
    buildAccountSection(s.account);
    buildAddressSection(s.shippingAddress);
    buildPreferencesSection(s.preferences);
  });



  //submit the form
  protected onSubmit(event: SubmitEvent) {
    event.preventDefault();
    //add submission logic ensuring submission logic clean 
    //the form can only be submitted when it is valid
    submit(this.form, async data => {
      console.log('Form is submitted: ', data().value());   
      return undefined;   
    });
  
  }


  /**
   * @example

async function registerNewUser(registrationForm: FieldTree<{username: string, password: string}>) {
  const result = await myClient.registerNewUser(registrationForm().value());
  if (result.errorCode === myClient.ErrorCode.USERNAME_TAKEN) {
    return [{
      field: registrationForm.username,
      error: {kind: 'server', message: 'Username already taken'}
    }];
  }
  return undefined;
}
   */
}