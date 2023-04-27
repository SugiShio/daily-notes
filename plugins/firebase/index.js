import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDYRTl3RfrKZP6T3wCuOtT05LJZRGtSTLU',
  authDomain: 'daily-notes-eb5dc.firebaseapp.com',
  projectId: 'daily-notes-eb5dc',
  storageBucket: 'daily-notes-eb5dc.appspot.com',
  messagingSenderId: '798160967517',
  appId: '1:798160967517:web:3a7746dbca47015146bab4',
  measurementId: 'G-6K3RXXTN40',
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
