import { action, makeAutoObservable } from "mobx";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { FirebaseApp, FirebaseError } from "firebase/app";

import {
  Firestore,
  getFirestore,
  getDoc,
  doc,
  setDoc,
  Timestamp,
} from "@firebase/firestore";

import { Hook } from "../lib/hook";
import { Token } from "../lib/token";
import { Wallet } from "../lib/wallet";

export type UserCreateResult = {
  success?: boolean;
  error?: string;
};

export type Profile = {
  hooks: Hook[],
  tokens: Token[],
  wallets: Wallet[],
}

export type User = {
  id: string,
  email: string | null,
  currentProfile?: string,
  profiles: Profile[],
  hooks: Hook[],
  createdAt: Date,
  updatedAt?: Date,
}

export class UserStore {
  user: User | undefined;
  
  private firebaseApp: FirebaseApp;
  private firestore: Firestore;

  constructor(firebaseApp: FirebaseApp) {
    makeAutoObservable(this);

    this.firebaseApp = firebaseApp;
    this.firestore = getFirestore(this.firebaseApp);

    const auth = getAuth();
    onAuthStateChanged(auth, async firebaseUser => {
      if (firebaseUser) {
        const docRef = doc(this.firestore, "users", firebaseUser.uid);        
        const userDoc = await getDoc(docRef);

        const data  = userDoc.data();
        if ( data === undefined ) {
          this.user = { 
              id: firebaseUser.uid, 
              email: firebaseUser.email,
              hooks: [], 
              profiles: [], 
              currentProfile: '', 
              createdAt: new Date()
            }
          await setDoc(docRef, 
            { 
              id: firebaseUser.uid, 
              hooks: [], 
              profiles: [], 
              currentProfile: '', 
              createdAt: Timestamp.fromDate(this.user.createdAt)
            })
        } else {
          this.user = {
            id: data.id, 
            email: firebaseUser.email,
            profiles: data.profiles, 
            hooks: data.hooks,
            currentProfile: data.currentProfile,
            createdAt: (data.createdAt as Timestamp).toDate()
          }
        }
      }
    });
  }

  @action
  signUpUser = async (email: string, password: string): Promise<UserCreateResult> => {
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { error: (error as FirebaseError).code };
    }
  };

  @action
  logInUser = async (email: string, password: string) => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { success: true };
    } catch (error) {
      return { error: (error as FirebaseError).code };
    }
  };
}
