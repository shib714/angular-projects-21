import { Component, input } from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';
import { Account } from './account-form.model';
import { ValidationErrors } from '../../shared/validation/validation-errors';


@Component({
  selector: 'account-form',
  template: `
    <div class="form">
        <h3>Account Information</h3>
        <div class="field-group">
            <label>First Name<input [field]='form().firstName' type="text" /></label>
            <validation-errors [fieldState]='form().firstName()' />
            <label>Last Name<input [field]='form().lastName' type="text" /></label>
            <validation-errors [fieldState]='form().lastName()' />
        </div>
        <div class="field-group">
    </div>
    `,
  styles: ``,
  imports: [Field, ValidationErrors],
})

export class AccountForm {

  //add an input called form as a field tree using the Account interface
  //this tells angular that this component only cares about the account slice
  readonly form = input.required<FieldTree<Account>>();
}