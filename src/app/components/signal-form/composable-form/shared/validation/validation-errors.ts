import { Component, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

@Component({
  selector: 'app-validation-errors',
  template: `
    @if (fieldState().touched() && fieldState().errors(); as errors) {
        @for (error of errors; track error) {
            <span class="error">{{ error.message }}</span>
        }
    }
  `,
  styleUrls: ['./validation-errors.scss']
})
export class ValidationErrorsComponent {
  readonly fieldState = input.required<FieldState<unknown, string>>();
}