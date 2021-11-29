import { createContext, useContext, useState, useEffect } from 'react';
import {
	getAuth,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export const signInWithGoogle = () =>
	signInWithPopup(getAuth(), new GoogleAuthProvider());

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState({});
	const value = { currentUser, signInWithGoogle };

	const handleUserStateChanges = user => {
		if (user) {
			const { displayName, email, uid, accessToken, photoURL } = user;

			setCurrentUser({
				displayName,
				email,
				uid,
				accessToken,
				photoURL,
			});

			console.log('Auth Context:');
			console.log({ uid, displayName, email, photoURL, accessToken });
		} else {
			// User is signed out
			setCurrentUser({});
			console.log('Signed out');
		}
	};

	useEffect(() => {
		const authSubscriber = onAuthStateChanged(
			getAuth(),
			handleUserStateChanges
		);

		return authSubscriber;
	}, []);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
