// FirebaseAppError: The default Firebase app does not exist. Make sure you call initializeApp() before using any of the Firebase services.を回避

// FYI: https://github.com/leerob/nextjs-vercel-firebase/blob/master/lib/firebase.js

import admin from "firebase-admin";

try {
  const cert = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  };
  admin.initializeApp({
    credential: admin.credential.cert(cert),
  });
} catch (error) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    // eslint-disable-next-line no-console
    console.error("Firebase admin initialization error", error.stack);
  }
}

export const Admin = admin;
export const store = admin.firestore();
