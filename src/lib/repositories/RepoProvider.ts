import { IUserRepo } from "./IUserRepo.ts"
import { FirebaseUserRepo } from "./FirebaseUserRepo.ts"
export default class RepoProvider {
    private static _userRepo: IUserRepo;

    static getUserRepo(): IUserRepo {
        if (!this._userRepo) this._userRepo = new FirebaseUserRepo();
        return this._userRepo;
    }

}