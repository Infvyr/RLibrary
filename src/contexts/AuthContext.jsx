import { createContext, useContext, useState, useEffect } from 'react';
import {
	onAuthStateChanged,
	signInWithPopup,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signOut,
} from 'firebase/auth';
import { auth } from '../firebase/utils';

const AuthContext = createContext({
	currentUser: null,
	signUp: () => Promise,
	signOut: () => Promise,
	signIn: () => Promise,
	signInWithGoogle: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);

	const registerUser = (email, password) =>
		createUserWithEmailAndPassword(auth, email, password);

	const signOutUser = () => signOut(auth);

	const signInUser = (email, password) =>
		signInWithEmailAndPassword(auth, email, password);

	const signInWithGoogle = () =>
		signInWithPopup(auth, new GoogleAuthProvider());

	const handleUserStateChanges = user => {
		if (user) {
			const { uid, displayName, email, photoURL, accessToken } = user;

			setCurrentUser({
				accessToken,
				displayName,
				email,
				photoURL,
				uid,
			});

			console.log('AuthProvider logged in:', user);
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, handleUserStateChanges);

		return () => {
			unsubscribe();
		};
	}, []);

	const value = {
		currentUser,
		registerUser,
		signOutUser,
		signInUser,
		signInWithGoogle,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
