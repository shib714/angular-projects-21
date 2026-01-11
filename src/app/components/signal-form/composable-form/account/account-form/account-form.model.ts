import { Signal, signal } from "@angular/core";
import { required, SchemaPathTree } from "@angular/forms/signals";

export interface Account {
  firstName: string;
  lastName: string;
}

//model factory for account form
//let's export the shape of this model defining a function returning 
// a signal using our account interface to be used in the profile form
export function createAccountModel() {
  return  signal<Account>({
    firstName: '',
    lastName: '',
  })
}

//create the schema pattern for validation
export function buildAccountSection(s: SchemaPathTree<Account>) {
  required(s.firstName, {message: 'First name is required'})
  required(s.lastName, {message: 'Last name is required'})

}

