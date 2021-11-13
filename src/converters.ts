import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "@firebase/firestore";
import { Hook } from "./lib/hook";

function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const ret: any = {};
  keys.forEach((key) => {
    ret[key] = obj[key];
  });
  return ret;
}

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
      data.code
    );
  },
};
