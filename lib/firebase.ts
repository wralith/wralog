import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/analytics";

// I Don't know what i am doing
const key: any = process.env.NEXT_PUBLIC_DEV_KEY;
const firebaseConfig: any = JSON.parse(key);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth: any = firebase.auth(); // How I deal with my problems...
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const analytics = firebase.analytics;

export async function getUserWithUsername(username: any) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

export function postToJSON(doc: any) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
