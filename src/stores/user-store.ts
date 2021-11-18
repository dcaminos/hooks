import { doc, getDoc, setDoc } from "@firebase/firestore";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
  browserLocalPersistence,
  browserSessionPersistence
} from "firebase/auth";
import { action, makeAutoObservable, runInAction } from "mobx";
import { userConverter } from "../lib/converters/user-converter";
import { User } from "../lib/user";
import { RootStore } from "./root-store";
import { UserProfile } from "../lib/user"

export class UserStore {
  public fetchingUser: boolean = false;

  public authReady: boolean = false;
  public user: User | undefined;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore.userStore = this;
    onAuthStateChanged(getAuth(), this.onAuthStateChanged);
  }

  @action
  onAuthStateChanged = async (firebaseUser: FirebaseUser | null) => {
    if (!this.fetchingUser) {
      if (firebaseUser && !this.user) {
        const user = await this.fetchUser(firebaseUser);
        runInAction(async () => {
          this.user = user;
        });
      } else if (!firebaseUser && this.user) {
        runInAction(async () => {
          this.user = undefined;
        });
      }
    }
    runInAction(async () => {
      this.authReady = true;
    });
  };

  @action
  signUp = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      runInAction(async () => {
        this.user = await this.fetchUser(userCredential.user);
      });
    } catch (error) {
      throw Error((error as FirebaseError).code);
    }
  };

  @action
  signIn = async (email: string, password: string, rememberMe: boolean) => {
    try {
      await setPersistence(getAuth(), rememberMe ? browserLocalPersistence : browserSessionPersistence )
      const userCredential = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      const user = await this.fetchUser(userCredential.user);
      runInAction(async () => {
        this.user = user;
      });
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
    const docRef = doc(this.rootStore.firestore, "users", firebaseUser.uid);
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
      runInAction(async () => {
        this.fetchingUser = false;
      });
      return user;
    } else {
      const user = userDoc.data();
      user.email = firebaseUser.email;
      user.displayName = firebaseUser.displayName;
      user.photoURL = firebaseUser.photoURL;
      user.emailVerified = firebaseUser.emailVerified;
      runInAction(async () => {
        this.fetchingUser = false;
      });
      return user;
    }
  };

  @action
  addProfile = async (profile: UserProfile) => {
    if (!this.user) return;
    const user = {...this.user};
    this.fetchingUser = true;
    user.profiles.push(profile);
    const userDocRef = doc(this.rootStore.firestore, "users", this.user.id);
    await setDoc(userDocRef.withConverter(userConverter), user);    
    runInAction(async () => {
      this.user = user;
      this.fetchingUser = false;
    })
  }
}
