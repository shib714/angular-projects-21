import { resource } from "@angular/core";
import { apply, applyWhen, customError, debounce, disabled, minLength, required, schema, validate, validateAsync } from "@angular/forms/signals";


function checkUserNameAvailability(userName: string): Promise<boolean> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const taken = ['admin', 'test', 'developer'];
            resolve(!taken.includes(userName));
        }, 1000);
    });
}
export interface Profile {
    userName: string,
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
    userName: '',
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
    required(rootPath.userName, { message: 'User name is required' });
    debounce(rootPath.userName, 500);
    validateAsync(rootPath.userName, {
        params: ({ value }) => {
            const val = value();
            if (!val || val.length < 4) return undefined;
            return val;
        },
        factory: username =>
            resource({
                params: username,
                loader: async ({ params: username }) => {
                    const available = await checkUserNameAvailability(username);
                    return available;
                }
            }),
        onSuccess: (result: boolean) => {
            if (!result) {
                return customError({
                    kind: 'username_taken',
                    message: 'This username is already taken',
                });
            }
            return null;
        },
        onError: (error: unknown) => {
            console.error('Validation error:', error);
            return null;
        }
    });
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




