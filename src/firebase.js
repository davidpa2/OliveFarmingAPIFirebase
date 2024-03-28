import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import firebaseConfig from '../credentials.json' with {type: "json"}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('Initialized FirebaseApp');

export default db;