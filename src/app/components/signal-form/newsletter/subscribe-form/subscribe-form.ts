import { Component, computed, effect, signal } from '@angular/core';
import { initialData, Subscription, subscriptionSchema } from '../subscription';
import { Field, form, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'subscribe-form',
  imports: [Field, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule],
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


}
