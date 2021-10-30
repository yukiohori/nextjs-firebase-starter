import { initializeApp } from "firebase/app";
import {
  getFirestore,
  CollectionReference,
  collection,
  doc,
  DocumentReference,
  writeBatch,
} from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const firestore = getFirestore(firebaseApp);

export function getCollection<T>(path: string): CollectionReference<T> {
  return collection(firestore, path) as CollectionReference<T>;
}

export function getDocument<T>(path: string): DocumentReference<T> {
  return doc(firestore, path) as DocumentReference<T>;
}

export function getBatch() {
  return writeBatch(firestore);
}
