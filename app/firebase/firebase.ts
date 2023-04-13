import firebase, { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

import 'firebase/storage'
const firebaseConfig = {
  apiKey: 'AIzaSyB8uIqbFVOQqiC6noVMvAWA5f9ukDfVUw4',
  authDomain: 'online-course-a5fe5.firebaseapp.com',
  projectId: 'online-course-a5fe5',
  storageBucket: 'online-course-a5fe5.appspot.com',
  messagingSenderId: '172618449244',
  appId: '1:172618449244:web:67e6ac16593676b5d80199',
  measurementId: 'G-C50DL4MWHN',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

export default firebase
