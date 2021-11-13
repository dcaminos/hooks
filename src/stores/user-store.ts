import {
  doc,
  Firestore,
  getDoc,
  getFirestore,
  setDoc,
} from "@firebase/firestore";
import { FirebaseApp, FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User as FirebaseUser,
  signOut,
} from "firebase/auth";
import { action, makeAutoObservable } from "mobx";
import { userConverter } from "../lib/converters/user-converter";
import { User } from "../lib/user";

export class UserStore {
  private firebaseApp: FirebaseApp;
  private firestore: Firestore;
  public user: User | undefined;

  constructor(firebaseApp: FirebaseApp) {
    makeAutoObservable(this);

    this.firebaseApp = firebaseApp;
    this.firestore = getFirestore(this.firebaseApp);
    onAuthStateChanged(getAuth(), this.onAuthStateChanged);
  }

  @action
  onAuthStateChanged = async (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      const docRef = doc(this.firestore, "users", firebaseUser.uid);
      const userDoc = await getDoc(docRef.withConverter(userConverter));
      if (!userDoc.exists()) {
        this.user = new User(
          firebaseUser.uid,
          firebaseUser.email,
          firebaseUser.displayName,
          firebaseUser.photoURL,
          firebaseUser.emailVerified,
          [],
          [],
          new Date()
        );

        await setDoc(docRef.withConverter(userConverter), this.user);
      } else {
        this.user = userDoc.data();
        this.user.email = firebaseUser.email;
        this.user.displayName = firebaseUser.displayName;
        this.user.photoURL = firebaseUser.photoURL;
        this.user.emailVerified = firebaseUser.emailVerified;
      }
    }
  };

  @action
  signUp = async (email: string, password: string): Promise<void> => {
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
    } catch (error) {
      throw Error((error as FirebaseError).code);
    }
  };

  @action
  signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
    } catch (error) {
      throw Error((error as FirebaseError).code);
    }
  };

  @action
  signOut = async () => {
    signOut(getAuth());
  };
}
