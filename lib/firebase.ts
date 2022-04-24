import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/analytics";

// I Don't know what i am doing
const key: any = process.env.DEV_KEY;
const firebaseConfig: object = JSON.parse(key);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const analytics = firebase.analytics;
