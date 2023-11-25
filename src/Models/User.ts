export interface User {
    id: string,
    email: string,
    first_name: string,
    gender: string,
    last_name: string
}

export function isValidUser(user: User): boolean {
    // Add your validation criteria here
    return (
        user.id !== undefined &&
        user.email !== undefined &&
        user.first_name !== undefined &&
        user.gender !== undefined &&
        user.last_name !== undefined &&
        user.id.toString().trim() !== '' &&
        user.email.trim() !== '' &&
        user.first_name.trim() !== '' &&
        user.gender.trim() !== '' &&
        user.last_name.trim() !== ''
    );
}

export function filterValidUsers(users: User[]): User[] {
    return users.filter(isValidUser);
}