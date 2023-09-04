import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref } from 'firebase/storage'

export const getFirestoreFormat = (object) => {
  return normalizeObject(object)
}

const normalizeObject = (object) => {
  if (object === undefined) {
    return null
  } else if (typeof object === 'string' || object === null) {
    return object
  } else if (Array.isArray(object)) {
    return object.map((o) => {
      return normalizeObject(o)
    })
  } else if (Object.keys(object).length) {
    const result = {}

    Object.keys(object).forEach((key) => {
      result[key] = normalizeObject(object[key])
    })
    return result
  }

  return object
}

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
export const storage = getStorage(app)
export const storageRef = ref(storage)
