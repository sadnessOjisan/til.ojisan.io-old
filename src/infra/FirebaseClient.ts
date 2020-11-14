import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

export const genFirebaseConfig = () => {
  return {
    apiKey: "AIzaSyBemTfP2cFFlzmDyEgL1Hxae65tdQ2dQEo",
    authDomain: "til-ojisan-io.firebaseapp.com",
    databaseURL: "https://til-ojisan-io.firebaseio.com",
    projectId: "til-ojisan-io",
    storageBucket: "til-ojisan-io.appspot.com",
    messagingSenderId: "8298529712",
    appId: "1:8298529712:web:2bb6ae15543aae76540c75",
    measurementId: "G-CB63TJM4F5",
  };
};

export default class Firebase {
  private static _instance: Firebase;
  private _app: firebase.app.App;
  private _db: firebase.firestore.Firestore;
  private _auth: firebase.auth.Auth;

  private constructor() {
    // https://github.com/zeit/next.js/issues/1999#issuecomment-302244429
    if (!firebase.apps.length) {
      const env = genFirebaseConfig();
      firebase.initializeApp(env);
      firebase.analytics();
    }
    this._app = firebase.app();
    this._db = firebase.firestore();
    this._auth = firebase.auth();
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
}
