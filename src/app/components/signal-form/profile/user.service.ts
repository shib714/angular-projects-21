import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private readonly url = 'https://jsonplaceholder.typicode.com/users';

    async checkUsernameAvailability(username: string): Promise<boolean> {
        try {
            const response = await fetch(`${this.url}?username=${username}`);
            if (!response.ok) {
                throw new Error('Failed to check username availability');
            }
            const users = await response.json();
            console.log('Availability Data:', users);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(users.length === 0);
                }, 1000);
            });
        } catch (error) {
            console.error('Error checking username availability:', error);
            throw error;
        }
    }
}

// function checkUserNameAvailability(userName: string): Promise<boolean> {

//     return new Promise((resolve) => {
//         setTimeout(() => {
//             const taken = ['admin', 'test', 'developer'];
//             resolve(!taken.includes(userName));
//         }, 1000);
//     });
// }