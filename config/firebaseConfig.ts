import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import path from "path";

// Find the Firebase key on your Desktop
const serviceAccountPath = path.join(
  process.cwd(),
  "serviceAccountKey.json"
);

// Initialize Firebase
if (getApps().length === 0) {
  initializeApp({
    credential: cert(serviceAccountPath),
  });
}

// Connect to Firestore
export const db = getFirestore();