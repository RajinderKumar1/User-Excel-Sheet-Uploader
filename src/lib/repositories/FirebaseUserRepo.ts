import { User } from "../../Models/User";
import { USERS_COLLECTION } from "../../config/constants.ts";
import { IUserRepo } from "./IUserRepo";
import { doc, collection, setDoc, getDocs, query, where, or, and, writeBatch } from "firebase/firestore";
import { db } from "../../config/firebase.ts";


export class FirebaseUserRepo implements IUserRepo {



    async saveUsers(users: User[]): Promise<boolean> {
        const batch = writeBatch(db);
        const reference = collection(db, USERS_COLLECTION);

        try {
            // Iterate through the users and add setDoc operations to the batch
            users.forEach((user) => {

                const userRef = doc(reference, user.id.toString()); // Assuming you have a unique userId for each user
                setDoc(userRef, user, { merge: true }); // Use merge: true if you want to update existing documents
            });

            // Commit the batch
            await batch.commit();

            return true; // If the batch commit is successful
        } catch (error) {
            console.error(error);
            return false;
        }
    }



    async getAllUsers(): Promise<User[]> {
        const data = await getDocs(collection(db, USERS_COLLECTION));
        if (data === undefined) return [];
        return data.docs.map((doc) => doc.data() as User);
    }

    async searchUsers(queryText: string): Promise<User[]> {
        let res = await getDocs(query(collection(db, USERS_COLLECTION), or(
            and(where("first_name", ">=", queryText),
                where("first_name", "<=", queryText + "\uf8ff")),
            where("email", "==", queryText)
        )
        ));

        if (!res) return [];
        return res.docs.map((doc) => doc.data() as User);
    }

}
