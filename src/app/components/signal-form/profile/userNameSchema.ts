import { resource } from "@angular/core";
import { schema, validateAsync, customError, required, debounce } from "@angular/forms/signals";
import { UserService } from "./user.service";

export const userNameSchema = schema<{ userName: string }>((rootPath) => {
    const userService = new UserService();
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
                    const available = await userService.checkUsernameAvailability(username);
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
});
