import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';

import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCU2ed7K8dXETXOpTmMbXsFljMaFk5htaY",
    authDomain: "curso-661c6.firebaseapp.com",
    projectId: "curso-661c6",
    storageBucket: "curso-661c6.appspot.com",
    messagingSenderId: "121415530652",
    appId: "1:121415530652:web:cc990bdb96f01f4e7a5559",
    measurementId: "G-Y63C5F4329"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth  = getAuth(firebaseApp);

export { db, auth, storage };