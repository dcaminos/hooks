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
      "code",
      "createdAt",
      "updatedAt",
      "versions"
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
    return new Hook({
      id: snapshot.id,
      owner: data.owner,
      title: data.title,
      networkId: data.networkId,
      tokenIds: data.tokenIds,
      isPublic: data.isPublic,
      code: data.code,
      createdAt: data.createdAt
        ? (data.createdAt as Timestamp).toDate()
        : new Date(),
      updatedAt: data.updatedAt
        ? (data.updatedAt as Timestamp).toDate()
        : new Date(),
      versions: data.versions,
    });
  },
};
