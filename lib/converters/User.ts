import {Subscription} from "@/types/Subscriptions";
import {
  collection,
  FirestoreDataConverter,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  where
} from "@firebase/firestore";
import {DocumentData} from "firebase/firestore";
import {db} from "@/firebase";
import {User} from "next-auth";


const userConverter: FirestoreDataConverter<User> = {
  toFirestore: function (customer: User): DocumentData {
    return {
      email: customer.email,
      image: customer.image,
      name: customer.name,
    }
  },
  fromFirestore: function (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): User {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      email: data.email,
      image: data.image,
      name: data.name,
    }
  }
}

export const getUserByEmailRef = (email: string) => query(collection(db, "users"), where("email", "==", email)).withConverter(userConverter);
