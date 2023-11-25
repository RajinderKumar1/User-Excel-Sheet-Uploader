import { User } from "../../Models/User";

export interface IUserRepo {
    saveUsers(users: User[]): Promise<boolean>
    getAllUsers(): Promise<User[]>
    searchUsers(queryText: string): Promise<User[]>

}