import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBGf6YNafw3BxPFwoshfyzuZzXaOdKgzlY',
  authDomain: 'food-database-4a00f.firebaseapp.com',
  projectId: 'food-database-4a00f',
  storageBucket: 'food-database-4a00f.appspot.com',
  messagingSenderId: '575453396956',
  appId: '1:575453396956:web:4910a9a59556c1d1e1d919',
  measurementId: 'G-E81GPFW453',
}

export const appFoodDatabase = initializeApp(firebaseConfig, 'foodDatabase')
export const dbFoodDatabase = getFirestore(appFoodDatabase)
