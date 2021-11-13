import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from "@firebase/firestore";
import { Hook } from "../hook";
import { pick } from "../../utils/utils";

export const hookConverter = {
  toFirestore(hook: Hook): DocumentData {
    const obj = pick(
      hook,
      "owner",
      "title",
      "networkId",
      "tokenIds",
      "isPublic",
      "code"
    ) as any;
    Object.keys(obj).forEach(
      (key) => obj[key] === undefined && delete obj[key]
    );
    return obj;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Hook {
    const data = snapshot.data(options)!;
    return new Hook(
      snapshot.id,
      data.owner,
      data.title,
      data.networkId,
      data.tokenIds,
      data.isPublic,
      data.code,
      data.createdAt ? (data.createdAt as Timestamp).toDate() : new Date()
    );
  },
};
