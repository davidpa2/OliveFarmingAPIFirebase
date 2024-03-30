import { getFirestore } from 'firebase-admin/firestore';
import { cert, initializeApp } from 'firebase-admin/app';
import serviceAccount from '../credentials.json' with {type: "json"}

initializeApp({
    credencial: cert(serviceAccount)
});

const db = getFirestore();

console.log('Initialized FirebaseApp');

export default db;