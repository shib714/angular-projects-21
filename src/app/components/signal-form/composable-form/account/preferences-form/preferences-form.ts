import { Component, input } from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';
import { Preferences } from './preferences-form.model';
import { ValidationErrors } from '../../shared/validation/validation-errors';

@Component({
  selector: 'preferences-form',
  template: `
  <div class="form">
     <h3>Preferences</h3>
    <div class="field-group">
        <label class="checkbox-label">
        <input [field]="form().marketingOptIn" type="checkbox" />
        <validation-errors [fieldState]="form().marketingOptIn()" />
        <span>Receive marketing emails</span>
        </label>
    </div>
</div>
  `,
  styles: ``,
  imports: [Field, ValidationErrors],
})
export class PreferencesForm {

    //add an input called form as a field tree using the Preferences interface
  //this tells angular that this component only cares about the address slice
  readonly form = input.required<FieldTree<Preferences>>();

  
}