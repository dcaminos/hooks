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
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { action, makeAutoObservable } from "mobx";
import { userConverter } from "../lib/converters/user-converter";
import { User } from "../lib/user";

export class UserStore {
  private firebaseApp: FirebaseApp;
  private firestore: Firestore;
  public fetchingUser: boolean = false;

  public authReady: boolean = false;
  public user: User | undefined;

  constructor(firebaseApp: FirebaseApp) {
    makeAutoObservable(this);

    this.firebaseApp = firebaseApp;
    this.firestore = getFirestore(this.firebaseApp);
    onAuthStateChanged(getAuth(), this.onAuthStateChanged);
  }

  @action
  onAuthStateChanged = async (firebaseUser: FirebaseUser | null) => {
    if (!this.fetchingUser) {
      if (firebaseUser && !this.user) {
        this.user = await this.fetchUser(firebaseUser);
      } else if (!firebaseUser && this.user) {
        this.user = undefined;
      }
    }
    this.authReady = true;
  };

  @action
  signUp = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      this.user = await this.fetchUser(userCredential.user);
    } catch (error) {
      throw Error((error as FirebaseError).code);
    }
  };

  @action
  signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      this.user = await this.fetchUser(userCredential.user);
    } catch (error) {
      throw Error((error as FirebaseError).code);
    }
  };

  @action
  signOut = async () => {
    signOut(getAuth());
    this.user = undefined;
  };

  @action
  fetchUser = async (firebaseUser: FirebaseUser): Promise<User> => {
    this.fetchingUser = true;
    const docRef = doc(this.firestore, "users", firebaseUser.uid);
    const userDoc = await getDoc(docRef.withConverter(userConverter));
    if (!userDoc.exists()) {
      const user = new User(
        firebaseUser.uid,
        firebaseUser.email,
        firebaseUser.displayName,
        firebaseUser.photoURL,
        firebaseUser.emailVerified,
        [],
        [],
        new Date()
      );

      await setDoc(docRef.withConverter(userConverter), user);
      this.fetchingUser = false;
      return user;
    } else {
      const user = userDoc.data();
      user.email = firebaseUser.email;
      user.displayName = firebaseUser.displayName;
      user.photoURL = firebaseUser.photoURL;
      user.emailVerified = firebaseUser.emailVerified;
      this.fetchingUser = false;
      return user;
    }
  };
}
