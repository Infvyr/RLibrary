import { initializeApp } from 'firebase/app';
import { getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';
// import {
// 	getToken,
// 	initializeAppCheck,
// 	ReCaptchaV3Provider,
// } from 'firebase/app-check';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env
		.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get auth
export const auth = getAuth(app);

// Get DB
export const db = getFirestore(app);

// Recaptcha
// const appCheck = initializeAppCheck(app, {
// 	provider: new ReCaptchaV3Provider(
// 		import.meta.env.VITE_REACT_APP_PUBLIC_CAPTCHA_KEY
// 	),

// 	isTokenAutoRefreshEnabled: true,
// });

// getToken(appCheck)
// 	.then(() => {
// 		console.log('success');
// 	})
// 	.catch(error => {
// 		console.log(error.message);
// 	});
