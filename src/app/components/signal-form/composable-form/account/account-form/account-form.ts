import { Component } from '@angular/core';

@Component({
  selector: 'account-form',
  template: `
    <div class="form">
        <h3>Account Information</h3>
        <div class="field-group">
            <label>First Name<input type="text" /></label>
            <label>Last Name<input type="text" /></label>
        </div>
        <div class="field-group">
    </div>
    `,
  styles: ``,
  imports: [],
})

export class AccountForm {
}