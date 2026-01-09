import { schema, customError, required, debounce, validate, validateHttp } from "@angular/forms/signals";
import { UserService } from "./user.service";
import { environment } from "../../../../environments/env.dev";

//export const userNameSchema = (userService: UserService) => schema<{ userName: string }>((rootPath) => {
//export const userNameSchema = () => schema<{ userName: string }>((rootPath) => {
    // Before:
     export const userNameSchema = schema<{ userName: string }>((rootPath) => {
    //   const userService = new UserService();
    //   ...
    // });
    //// It now uses the provided userService instance
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
    //this will eliminate the need for userService
    validateHttp(rootPath.userName, {
        request: ({ value }) => {
            const username = value();
            return username ? `${environment.BASE_URL}?username=${username}` : undefined
        },
        onSuccess: (users: any[]) =>
            users.length > 0 ? customError({ kind: 'taken', message: 'This username is already taken' }) : undefined,
        onError: () =>
            customError({ kind: 'server-error', message: 'Error checking availability' })
    });

    //we could also use validateAsync() function; but that would require userService: see line 5 above
    //Here is the working code for validateAsync:
    // validateAsync(rootPath.userName, {
    //     params: ({ value }) => {
    //         const val = value();
    //         if (!val || val.length < 4) return undefined;
    //         return val;
    //     },
    //     factory: username =>
    //         resource({
    //             params: username,
    //             loader: async ({ params: username }) => {
    //                 const available = await checkUserNameAvailability(username);
    //                 return available;
    //             }
    //         }),
    //     onSuccess: (result: boolean) => {
    //         if (!result) {
    //             return customError({
    //                 kind: 'username_taken',
    //                 message: 'This username is already taken',
    //             });
    //         }
    //         return null;
    //     },
    //     onError: (error: unknown) => {
    //         console.error('Validation error:', error);
    //         return null;
    //     }
    // });
});
