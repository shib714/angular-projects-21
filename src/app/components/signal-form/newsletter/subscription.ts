import { applyWhen, email, max, min, minLength, required, schema } from "@angular/forms/signals";

export interface Subscription {
    //Subscription interface represents the data structure used in the singal form
    // Rules: Data types must be compatable with HTML control, no optional fields, no null types for native input elements
    email: string,
    firstName: string,
    lastName: string,
    phone:  string,
    sendViaText: boolean;
    sendViaEmail: boolean;
    yearsAsFan: number;
}

export const initialData: Subscription = {
    //Angular exclude any field with an initial value of undefined when creating the form
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    sendViaText: true,
    sendViaEmail: true,
    yearsAsFan: NaN,
};

//validation
//rootPath is the root location in the Form's FieldTree
export const subscriptionSchema = schema<Subscription>((rootPath) => {
    required(rootPath.email, {message: 'Email is required to receive our newsletter',
        when: ({valueOf}) => valueOf(rootPath.sendViaEmail) === true
    });
    email(rootPath.email, {message: 'Please enter a valid email address'});
    minLength(rootPath.email, 6, {message: 'Email should be at least 6 characters long'});
    applyWhen(
        rootPath.phone,
        ({valueOf}) => valueOf(rootPath.sendViaText) === true,
        (phonePath) => {
            required(phonePath, {message: 'Phone is required to receive our newsletter'}),
            minLength(phonePath, 10, {message: 'Phone number should be at least 10 characters long'})
        }
            
    ),
    min(rootPath.yearsAsFan, 0, {message: 'Years as fan cannot be negative'});
    max(rootPath.yearsAsFan, 100, {message: 'Years as fan seems too high'});

});