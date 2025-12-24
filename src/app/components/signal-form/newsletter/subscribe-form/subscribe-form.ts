import { Component, computed, effect, signal } from '@angular/core';
import { initialData, Subscription, subscriptionSchema } from '../subscription';
import { Field, form, submit} from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'subscribe-form',
  imports: [Field, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCheckboxModule],
  templateUrl: './subscribe-form.html',
  styleUrl: './subscribe-form.scss',
})
export class SubscribeForm {

  subscribeMessage = signal('');
  errorMessage = signal('');

  subscribeModel = signal<Subscription>(initialData);//form model as a signal

  subscribeForm = form(this.subscribeModel, subscriptionSchema);//create the form from the model

  fullName = computed(() => `${this.subscribeModel().firstName} ${this.subscribeModel().lastName}`);
  pageHeader = computed(() => `Subscribe to our Newsletter ${this.fullName()}`);

  cancel() {
    // Reset form (or navigate to another page)
    this.subscribeForm().reset(initialData);
  }

  subscribe() {
    this.subscribeMessage.set('');
    submit(this.subscribeForm, () =>
      this.onSubmit());
  }

  async onSubmit() {
    this.subscribeMessage.set(`Thank you for your subscription ${this.fullName()}!`);
    // Submit to the server
    console.log('Submitting data to server:', this.subscribeForm().value());
    // Reset form (or navigate to another page)
    this.subscribeForm().reset(initialData);
  }

  eff = effect(() =>
    console.log('Email:', this.subscribeModel().email));




  /**a
   * protected onSubmit(event: Event) {   
   * submit(this.signupForm, async (form) => {
   * try{
   * await fetch('http://dummyjson.com/usurs/2', {
   * method : 'PUT',
   * body: JSON.stringify(form().value()),
   * });
   * return undefined;
   * } catch(e) {
   *  return [{
   * kind: 'server',
   * field: form.email,
   * 
   * message: (e as Error).message}]
   * }
   * from.reset();
   * }0
   * event.preventDefault();
   * }
   * }
   */


}
