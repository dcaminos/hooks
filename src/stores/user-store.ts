import { doc, getDoc, getDocs, setDoc } from "@firebase/firestore";
import { FirebaseError } from "firebase/app";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { collection, query, where } from "firebase/firestore";
import { action, makeAutoObservable, runInAction, when } from "mobx";
import { Hook, hookConverter } from "lib/hook";
import { User, userConverter, UserProfile, UserWallet } from "lib/user";
import { RootStore } from "./root-store";
import moment from "moment";
import { defaultProfile } from "lib/config/profile";

export class UserStore {
  private static firebaseUser: FirebaseUser | null = null;
  private isFirebaseReady: boolean = false;

  public user: User | undefined;
  public authReady: boolean = false;
  public userHooks: Hook[] = [];
  public action:
    | "signUp"
    | "signIn"
    | "fetchUser"
    | "createProfile"
    | "updateUser"
    | "addWalletToDefaultProfile"
    | undefined;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore.userStore = this;
    onAuthStateChanged(getAuth(), this.onAuthStateChanged);
    when(
      () => this.isFirebaseReady,
      () => this.fetchUser()
    );
    when(
      () => this.user !== undefined,
      () => {
        this.fetchUserHooks();
        this.rootStore.dashboardStore!.runHooks();
      }
    );
  }

  onAuthStateChanged = async (firebaseUser: FirebaseUser | null) => {
    UserStore.firebaseUser = firebaseUser;
    this.isFirebaseReady = true;
  };

  @action
  setUser = (user: User) => (this.user = user);

  @action
  signUp = async (email: string, password: string): Promise<void> => {
    this.action = "signUp";
    try {
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      UserStore.firebaseUser = userCredential.user;
      await this.fetchUser();
    } catch (error) {
      this.action = undefined;
      throw Error((error as FirebaseError).code);
    }
  };

  @action
  signIn = async (email: string, password: string, rememberMe: boolean) => {
    this.action = "signIn";
    try {
      await setPersistence(
        getAuth(),
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );
      const userCredential = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      UserStore.firebaseUser = userCredential.user;
      await this.fetchUser();
    } catch (error) {
      this.action = undefined;
      throw Error((error as FirebaseError).code);
    }
  };

  @action
  signOut = async () => {
    signOut(getAuth());
    this.user = undefined;
  };

  @action
  fetchUser = async () => {
    if (!UserStore.firebaseUser) {
      runInAction(() => {
        this.authReady = true;
        this.action = undefined;
      });
      return;
    }

    this.action = "fetchUser";

    const docRef = doc(
      this.rootStore.firestore,
      "users",
      UserStore.firebaseUser.uid
    );
    const userDoc = await getDoc(docRef.withConverter(userConverter));
    let user: User | undefined = undefined;
    if (!userDoc.exists()) {
      user = {
        id: UserStore.firebaseUser.uid,
        email: UserStore.firebaseUser.email,
        displayName: UserStore.firebaseUser.displayName,
        photoURL: UserStore.firebaseUser.photoURL,
        emailVerified: UserStore.firebaseUser.emailVerified,
        profiles: [defaultProfile],
        createdAt: moment(),
      } as User;
      await setDoc(docRef.withConverter(userConverter), user);
    } else {
      user = userDoc.data();
      user.email = UserStore.firebaseUser.email;
      user.displayName = UserStore.firebaseUser.displayName;
      user.photoURL = UserStore.firebaseUser.photoURL;
      user.emailVerified = UserStore.firebaseUser.emailVerified;
    }
    runInAction(() => {
      this.user = user;
      this.authReady = true;
      this.action = undefined;
    });
  };

  @action
  createProfile = async (profile: Partial<UserProfile>) => {
    if (!this.user) return;
    this.action = "createProfile";
    const user = { ...this.user };
    user.profiles.push({ ...defaultProfile, ...profile });
    const userDocRef = doc(this.rootStore.firestore, "users", this.user.id);
    await setDoc(userDocRef.withConverter(userConverter), user);
    runInAction(() => {
      this.user = user;
      this.action = undefined;
    });
  };

  @action
  updateUser = async (newUser: User) => {
    if (!this.user) return;
    this.action = "updateUser";
    const userDocRef = doc(this.rootStore.firestore, "users", this.user.id);
    await setDoc(userDocRef.withConverter(userConverter), newUser);
    runInAction(() => {
      this.user = newUser;
      this.action = undefined;
    });
  };

  @action
  fetchUserHooks = async () => {
    const userId = this.user?.id;
    if (!userId) {
      return;
    }

    const hooksCol = collection(this.rootStore.firestore, "hooks");
    const q = query(hooksCol, where("owner", "==", userId)).withConverter(
      hookConverter
    );
    const r = await getDocs(q);
    runInAction(() => {
      this.userHooks = r.docs.map((doc) => doc.data());
    });
  };

  @action
  addWalletToDefaultProfile = async (wallet: UserWallet) => {
    if (!this.user) return;
    const user = { ...this.user };
    this.action = "addWalletToDefaultProfile";
    user.profiles[0].wallets.push(wallet);
    const userDocRef = doc(this.rootStore.firestore, "users", this.user.id);
    await setDoc(userDocRef.withConverter(userConverter), user);
    runInAction(() => {
      this.user = user;
      this.action = undefined;
    });
  };
}
