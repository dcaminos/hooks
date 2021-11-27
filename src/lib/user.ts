import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from "firebase/firestore";
import { pick } from "utils/utils";
import moment, { Moment } from "moment";

export type UserWallet = {
  name: string;
  address: string;
  type: "defi" | "binance";
};

export type UserProfile = {
  active: boolean;
  title: string;
  wallets: UserWallet[];
  hookIds: string[];
};

export type User = {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  profiles: UserProfile[];
  createdAt: Moment;
};

export const userConverter = {
  toFirestore(user: User): DocumentData {
    const obj = pick(user, "profiles", "createdAt") as any;
    obj.createdAt = (obj.createdAt as Moment).toDate();
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
    data.id = snapshot.id;
    data.createdAt = data.createdAt
      ? moment((data.createdAt as Timestamp).toDate())
      : moment();
    return data as User;
  },
};
