import { action, makeAutoObservable } from "mobx";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  User,
  onAuthStateChanged,
  Auth,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

export type UserCreateResult = {
  success?: string;
  error?: FirebaseError;
};

export class UserStore {
  user: User | undefined;
  user2: User | undefined;

  private auth: Auth;

  constructor() {
    makeAutoObservable(this);

    this.auth = getAuth();
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = user;
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
