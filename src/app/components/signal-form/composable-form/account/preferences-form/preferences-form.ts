import { Component } from '@angular/core';

@Component({
  selector: 'preferences-form',
  template: `
  <div class="form">
     <h3>Preferences</h3>
    <div class="field-group">
        <label class="checkbox-label">
        <input type="checkbox" />
        <span>Receive marketing emails</span>
        </label>
    </div>
</div>
  `,
  styles: ``,
  imports: [],
})
export class PreferencesForm {
}