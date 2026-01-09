import { Component } from '@angular/core';

@Component({
    selector: 'address-form',
    template: `

    <div class="form">
        <h3>Shipping Address</h3>
            <div class="field-group">
                <label>Street<input type="text" /></label>
                <div class="row">
                    <label>City<input type="text"/></label> 
                    <label>State<input type="text" /></label>
                    <label>ZIP<input type="text" /></label>
                </div>
            </div>
    </div>  
  `,
    styles: ``,
    imports: [],
})
export class AddressForm {
}