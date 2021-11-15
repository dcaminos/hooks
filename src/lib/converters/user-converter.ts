import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from "@firebase/firestore";
import { User } from "../user";
import { pick } from "../../utils/utils";

export const userConverter = {
  toFirestore(user: User): DocumentData {
    const obj = pick(user, "profiles", "hookIds", "createdAt") as any;
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
    return new User(
      snapshot.id,
      "",
      "",
      "",
      false,
      data.profiles,
      data.hookIds,
      data.createdAt ? (data.createdAt as Timestamp).toDate() : new Date()
    );
  },
};
