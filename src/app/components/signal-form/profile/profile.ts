import { apply, applyWhen,  debounce, disabled, minLength, required, schema, validate, validateAsync, validateHttp } from "@angular/forms/signals";
import { UserService } from "./user.service";
import { environment } from "../../../../environments/env.dev";

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

//export const profileSchema = (userService: UserService) => schema<Profile>((rootPath) => {
export const profileSchema = schema<Profile>((rootPath) => {

    required(rootPath.firstName, { message: 'First name is required' });
    required(rootPath.lastName, { message: 'Last name is required' });

    //apply(rootPath, userNameSchema(userService));
    apply(rootPath, userNameSchema);
    apply(rootPath, passwordSchema);
    apply(rootPath, dateOfBirthSchema);
    apply(rootPath, hasEmergencyContactSchema);
});


const userNameSchema = schema<{ userName: string }>((rootPath) => {
    required(rootPath.userName, { message: 'User name is required' });
    // validate(rootPath.userName, ({ value }) => {
    //     const username = value();
    //     if (!username.includes(' ')) {
    //         return customError({ kind: 'no-spaces', message: 'Name cannot contain spaces' });
    //     }
    //     return undefined;//no erroe

    // });

    debounce(rootPath.userName, 300);

    // we use validateHttp to check user availability
    //this will eliminate the need for userService required for validateAsync
    validateHttp(rootPath.userName, {
        //request is a function that receives the field context and returns the url or request for the httpResource. 
        // If given a URL, the underlying httpResource will perform an HTTP GET on it.
        request: ({ value }) => {
            //const username = value();
            return value() ? `${environment.BASE_URL}?username=${value()}` : undefined
        },
        onSuccess: (users: any[]) =>
            users.length > 0 ? { kind: 'taken', message: 'This username is already taken' } : undefined,
        onError: () =>
            ({ kind: 'server-error', message: 'Error checking availability' })
    });


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


