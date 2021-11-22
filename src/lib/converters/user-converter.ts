import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from "@firebase/firestore";
import { User, UserD } from "../user";
import { pick } from "../../utils/utils";

export const userConverter = {
  toFirestore(user: User): DocumentData {
    const obj = pick(user, "profiles", "hookIds", "tokenIds", "createdHookIds", "createdAt") as any;
    Object.keys(obj).forEach(
      (key) => obj[key] === undefined && delete obj[key]
    );

    return obj;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options)!;
<<<<<<< HEAD
    return new User(
      snapshot.id,
      "",
      "",
      "",
      false,
      data.profiles,
      data.hookIds,
      data.tokenIds,
      data.createdHookIds,
      data.createdAt ? (data.createdAt as Timestamp).toDate() : new Date()
    );
=======
    data.id = snapshot.id;
    data.createdAt = data.createdAt
      ? (data.createdAt as Timestamp).toDate()
      : new Date();
    return new User(data as UserD);
>>>>>>> 01e389d0c1b86e467afabb9a8f6e23810734a39d
  },
};
