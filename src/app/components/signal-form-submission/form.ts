import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { form, FormField, minLength, required, submit, ValidationError } from '@angular/forms/signals';
import { SignupModel, SignupService } from './signup.service';

@Component({
    selector: 'form-submission-example',
    imports: [CommonModule, FormField],
    template: `
    <div class="form-container">
  <h2>Sign up</h2>
  <form (submit)="onSubmit($event)">

    <!-- Username -->
    <div class="field">
      <label for="username">Username</label>
      <input
        id="username"
        type="text"
        [formField]="form.username" />
      @if (form.username().touched() && form.username().invalid()) {
        <ul class="error-list">
          @for (err of form.username().errors(); track $index) {
            <li>{{ err.message }}</li>
          }
        </ul>
      }
    </div>
    <!-- Email -->
    <div class="field">
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        [formField]="form.email" />
      @if (form.email().touched() && form.email().invalid()) {
        <ul class="error-list">
          @for (err of form.email().errors(); track $index) {
            <li>{{ err.message }}</li>
          }
        </ul>
      }
    </div>

    <div class="actions">
      <button type="submit" [disabled]="form().invalid() || form().submitting()">
        Create account
      </button>
    </div>
  </form>
</div>
  `,
    styleUrl: './form.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
    protected readonly model = signal<SignupModel>({
        username: '',
        email: '',
    });

    private readonly signupService = inject(SignupService);

    protected readonly form = form(this.model, s => {
        required(s.username, { message: 'Please enter a username' });
        minLength(s.username, 3,
            { message: 'Your username must be at least 3 characters' });
        required(s.email, { message: 'Please enter an email address' });
    });

    //onSubmit handler
    //example of how to submit signal form while using service
    // Please see: https://www.youtube.com/watch?v=3beFbUwT_hg
    onSubmit(event: Event) {
        //tells the user agent that if the event does not get explicitly handled, 
        // its default action should not be taken as it normally would be.
        event.preventDefault();

        submit(this.form, async f => {
            const value = f().value();
            console.log('Field state value:', value);
            const result = await this.signupService.signup(value);

            if (result.status === 'error') {
                const errors: ValidationError.WithOptionalField[] = [];

                if (result.fieldErrors.username) {
                    errors.push({
                        fieldTree: f.username,
                        kind: 'server',
                        message: result.fieldErrors.username,
                    });
                }

                if (result.fieldErrors.email) {
                    errors.push({
                        fieldTree: f.email,
                        kind: 'server',
                        message: result.fieldErrors.email,
                    });
                }
                return errors.length ? errors : undefined;
            }
            console.log('Submitted:', value);
            return undefined;
        });
    }
}