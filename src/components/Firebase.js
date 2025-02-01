import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
	apiKey: "AIzaSyCt-JRWr8F6WRWEXmJabAqtF96-BsE3hYE",
	authDomain: "homequest-cecde.firebaseapp.com",
	projectId: "homequest-cecde",
	storageBucket: "homequest-cecde.appspot.com",
	messagingSenderId: "1081422358918",
	appId: "1:1081422358918:web:40c15edf823d75cc5ca407",
	measurementId: "G-6BG77KY84X"
  };
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export { db, storage, auth, googleProvider }
