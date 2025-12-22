import { email, max, min, minLength, required, schema } from "@angular/forms/signals";

export interface Subscription {
    //Subscription interface represents the data structure used in the singal form
    // Rules: Data types must be compatable with HTML control, no optional fields, no null types for native input elements
    email: string;
    firstName: string;
    lastName: string;
    yearsAsFan: number;
}

export const initialData: Subscription = {
    //Angular exclude any field with an initial value of undefined when creating the form
    email: '',
    firstName: '',
    lastName: '',
    yearsAsFan: NaN,
};

//validation
//rootPath is the root location in the Form's FieldTree
export const subscriptionSchema = schema<Subscription>((rootPath) => {
    required(rootPath.email, {message: 'Email is required'});
    email(rootPath.email, {message: 'Please enter a valid email address'});
    minLength(rootPath.email, 6, {message: 'Email should be at least 6 characters long'});
    min(rootPath.yearsAsFan, 0, {message: 'Years as fan cannot be negative'});
    max(rootPath.yearsAsFan, 100, {message: 'Years as fan seems too high'});

});