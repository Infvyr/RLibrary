import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// envinromnet constants
const {
	REACT_APP_FIREBASE_API_KEY,
	REACT_APP_FIREBASE_AUTH_DOMAIN,
	REACT_APP_FIREBASE_PROJECT_ID,
	REACT_APP_FIREBASE_STORAGE_BUCKET,
	REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	REACT_APP_FIREBASE_APP_ID,
} = process.env;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: REACT_APP_FIREBASE_API_KEY,
	authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
