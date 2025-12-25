import { apply, applyWhen, disabled, minLength, required, schema, validate } from "@angular/forms/signals";

export interface Profile {
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    password: string,
    confirmPassword: string,
    hasEmergencyContact: boolean,
    emergencyContactName: string,
    emergencyContactPhone: string,
}

export const defaultProfile: Profile = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    hasEmergencyContact: false,
    emergencyContactName: '',
    emergencyContactPhone: '',
}

export const profileSchema = schema<Profile>((rootPath) => {
    required(rootPath.firstName, { message: 'First name is required' });
    required(rootPath.lastName, { message: 'Last name is required' });

    apply(rootPath, passwordSchema);
    apply(rootPath, dateOfBirthSchema);
    apply(rootPath, hasEmergencyContactSchema);
});

const dateOfBirthSchema = schema<{ dateOfBirth: string }>((rootPath) => {
    required(rootPath.dateOfBirth, { message: 'Date of birth is required' });
    validate(rootPath.dateOfBirth, (ctx) => {
        if (!ctx.value()) return null;

        const birthDate = new Date(ctx.value());
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            return {
                kind: 'underage',
                message: 'You must be at least 18 years old'
            }
        }
        return null;
    });
});


const passwordSchema = schema<{ password: string, confirmPassword: string }>((rootPath) => {
    required(rootPath.password, { message: 'Password is required' });
    required(rootPath.confirmPassword, { message: 'Confirm password is required' });
    minLength(rootPath.password, 8, { message: 'Password should be at least 8 characters long' });
    minLength(rootPath.confirmPassword, 8, { message: 'Confirm password should be at least 8 characters long' });
    validate(rootPath.confirmPassword, (ctx) => {
        if (!ctx.value()) return null;
        const password = ctx.valueOf(rootPath.password);
        if (password !== ctx.value()) {
            return {
                kind: 'passwordMismatch',
                message: 'Passwords do not match'
            }
        }
        return null;
    });
});

const hasEmergencyContactSchema = schema<{ hasEmergencyContact: boolean, emergencyContactName: string, emergencyContactPhone: string }>((rootPath) => {
    // When hasEmergencyContact is true, make the contact name and phone required.
    required(rootPath.emergencyContactName, {
        message: 'Emergency contact name is required',
        when: ({ valueOf }) => valueOf(rootPath.hasEmergencyContact)
    });

    required(rootPath.emergencyContactPhone, {
        message: 'Emergency contact phone is required',
        when: ({ valueOf }) => valueOf(rootPath.hasEmergencyContact)
    });

    // When hasEmergencyContact is true, also require a minLength for the phone number.
    applyWhen(
        rootPath.emergencyContactPhone,
        ({ valueOf }) => valueOf(rootPath.hasEmergencyContact),
        (field) => {
            minLength(field, 10, { message: 'Phone number should be at least 10 characters long' });
        }
    );
    disabled(rootPath.emergencyContactName, ({ valueOf }) => !valueOf(rootPath.hasEmergencyContact));
    disabled(rootPath.emergencyContactPhone, ({ valueOf }) => !valueOf(rootPath.hasEmergencyContact));
});



