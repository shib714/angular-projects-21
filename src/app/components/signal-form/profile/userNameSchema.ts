import { resource } from "@angular/core";
import { schema, validateAsync, customError, required, debounce } from "@angular/forms/signals";
import { UserService } from "./user.service";

export const userNameSchema = (userService: UserService) => schema<{ userName: string }>((rootPath) => {
      // Before:
        // export const userNameSchema = schema<{ userName: string }>((rootPath) => {
        //   const userService = new UserService();
        //   ...
        // });
        //// It now uses the provided userService instance
    required(rootPath.userName, { message: 'User name is required' });
    debounce(rootPath.userName, 1000);

    validateAsync(rootPath.userName, {
        params: ({ value }) => {
            const username = value()?.trim();
            // Only trigger validation if the username is at least 4 characters long.
            return username && username.length >= 4 ? username : undefined;
        },
        factory: (username) =>
            resource({
                params: username,
                loader: ({ params }) => userService.checkUsernameAvailability(params),
            }),
        onSuccess: (isAvailable) => {
            // If the username is not available, return a custom error.
            return isAvailable ? null : customError({
                kind: 'username_taken',
                message: 'This username is already taken',
            });
        },
        onError: (error: unknown) => {
            console.error('Validation error:', error);
            // In a real application, you might want to return a generic
            // error message to the user instead of just logging the error.
            return customError({
                kind: 'validation_error',
                message: 'Could not validate username.',
            });
        }
    });
});
