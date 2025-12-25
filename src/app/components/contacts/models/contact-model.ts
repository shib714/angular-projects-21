import { schema, required, email, minLength} from "@angular/forms/signals";

export interface ContactModel {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    mobile: boolean;
    company: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}

export const defaultContactModel: ContactModel = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    mobile: false,
    company: '',
    notes: '',
    createdAt: new Date(),
    updatedAt: new Date(),
}

export const contactSchema = schema<ContactModel>((rootPath) => {
    required(rootPath.firstName, { message: 'First name is required' });
    required(rootPath.lastName, { message: 'Last name is required' });
    required(rootPath.email, { message: 'Email is required' });
    required(rootPath.phone, { message: 'Phone is required' });
    email(rootPath.email, {message: 'Please enter a valid email address'});
    minLength(rootPath.email, 6, {message: 'Email should be at least 6 characters long'});
});

