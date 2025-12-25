import { schema } from "@angular/forms/signals";

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
});