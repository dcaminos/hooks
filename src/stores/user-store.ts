import { action, makeAutoObservable } from "mobx";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  User as FirebaseUser,
  onAuthStateChanged,
  Auth,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { Hook } from "../lib/hook";

export type UserCreateResult = {
  success?: string;
  error?: FirebaseError;
};

export type Profile = {
  hooks: Array<Hook>
}

export type User = FirebaseUser & {
  firstName?: string,
  lastName?: string,
  profiles?: Array<Profile>
}

export class UserStore {
  user: User | undefined;

  private auth: Auth;

  constructor() {
    makeAutoObservable(this);

    this.auth = getAuth();
    onAuthStateChanged(this.auth, firebaseUser => {
      if (firebaseUser) {
        this.user = firebaseUser;
        // load or create user document 
        // load profiles or create default
      }
    });
  }

  @action
  signUpUser = async (email: string, password: string) => {
    try {
      const userCrediental: UserCredential =
        await createUserWithEmailAndPassword(this.auth, email, password);
      this.user = userCrediental.user;
      return { success: this.user };
    } catch (error) {
      return { error: (error as FirebaseError).code };
    }
  };

  @action
  logInUser = async (email: string, password: string) => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.user = userCredential.user;
      return { success: true };
    } catch (error) {
      return { error: (error as FirebaseError).code };
    }
  };
}
