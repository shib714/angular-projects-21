import { Component, input } from '@angular/core';
import { FormField, FieldTree } from '@angular/forms/signals';
import { Address } from './address-form.model';
import { ValidationErrors } from '../shared/validation/validation-errors';

@Component({
    selector: 'address-form',
    template: `

    <div class="form">
        <h3>Shipping Address</h3>
            <div class="field-group">
                <label>Street
                    <input [formField]="form().street"  type="text" />
                    <validation-errors [fieldState]="form().street()" />
                </label>
                <div class="row">
                    <label>City<input [formField]="form().city"  type="text"/> 
                        <validation-errors [fieldState]="form().city()" />
                    </label>
                    <label>State<input [formField]="form().state"  type="text" />
                        <validation-errors [fieldState]="form().state()" />
                    </label>
                    <label>ZIP<input [formField]="form().zip"  type="text" />
                        <validation-errors [fieldState]="form().zip()" />
                    </label>
                </div>
            </div>
    </div>  
  `,
    styles: ``,
    imports: [FormField, ValidationErrors],
})
export class AddressForm {

    //add an input called form as a field tree using the Address interface
    //this tells angular that this component only cares about the address slice
    readonly form = input.required<FieldTree<Address>>();

}