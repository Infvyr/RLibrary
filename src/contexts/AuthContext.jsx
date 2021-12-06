import { createContext, useContext, useState, useEffect } from 'react';
import {
	onAuthStateChanged,
	signInWithPopup,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	FacebookAuthProvider,
	signOut,
} from 'firebase/auth';
import { auth } from '../firebase/utils';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [signInError, setSignInError] = useState({
		message: '',
		isActive: false,
	});

	const registerUser = (email, password) =>
		createUserWithEmailAndPassword(auth, email, password);

	const signOutUser = () => signOut(auth);

	const signInUser = (email, password) =>
		signInWithEmailAndPassword(auth, email, password);

	const signInWithGoogle = () =>
		signInWithPopup(auth, new GoogleAuthProvider());

	const signInWithFacebook = () =>
		signInWithPopup(auth, new FacebookAuthProvider());

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, setCurrentUser);

		return () => unsubscribe();
	}, []);

	const value = {
		currentUser,
		registerUser,
		signOutUser,
		signInUser,
		signInWithGoogle,
		signInWithFacebook,
		signInError,
		setSignInError,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const userAuth = useContext(AuthContext);

	return { ...userAuth, isAuthenticated: userAuth.currentUser !== null };
};
