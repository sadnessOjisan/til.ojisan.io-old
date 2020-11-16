import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

export const genFirebaseConfig = () => {
  return {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MESUREMENT_ID,
  };
};

export default class Firebase {
  private static _instance: Firebase;
  private _app: firebase.app.App;
  private _db: firebase.firestore.Firestore;
  private _auth: firebase.auth.Auth;
  private _firestore: typeof firebase.firestore;

  private constructor() {
    // https://github.com/zeit/next.js/issues/1999#issuecomment-302244429
    if (!firebase.apps.length) {
      const env = genFirebaseConfig();
      firebase.initializeApp(env);
      // @ts-ignore
      if (process.browser) {
        firebase.analytics();
      }
    }
    this._app = firebase.app();
    this._db = firebase.firestore();
    this._auth = firebase.auth();
    this._firestore = firebase.firestore;
  }

  init() {
    this.app;
    this.db;
    this.auth;
  }

  public static get instance(): Firebase {
    if (!this._instance) {
      this._instance = new Firebase();
    }
    return this._instance;
  }

  public get app() {
    if (this._app) {
      return this._app;
    } else {
      this._app = firebase.app();
    }
  }

  public get db() {
    if (this._db) {
      return this._db;
    } else {
      this._db = firebase.firestore();
      return this._db;
    }
  }

  public get auth() {
    if (this._auth) {
      return this._auth;
    } else {
      this._auth = firebase.auth();
      return this._auth;
    }
  }

  public get firestore() {
    if (this._firestore) {
      return this._firestore;
    } else {
      this._firestore = firebase.firestore;
      return this._firestore;
    }
  }
}
