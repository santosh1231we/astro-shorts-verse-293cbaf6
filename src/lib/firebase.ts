
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "stargazingproto",
  // Add other config properties as needed for client-side usage
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
