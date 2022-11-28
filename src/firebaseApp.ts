import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

export const firebaseApp = firebase.initializeApp({
	projectId: import.meta.env.VITE_PROJECT_ID,
	appId: import.meta.env.VITE_APP_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	locationId: import.meta.env.VITE_LOCATION_ID,
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	measurementId: import.meta.env.VITE_MEASUREMENT_ID,
})
