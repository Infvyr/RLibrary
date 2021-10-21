import { createContext, useContext, useState, useEffect } from 'react';
import {
	getAuth,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const value = { currentUser, signUp };

	function signUp(firstName, lastName, password, email) {
		const auth = getAuth();

		createUserWithEmailAndPassword(auth, firstName, lastName, email, password)
			.then(userCredential => {
				// Signed in
				const user = userCredential.user;
				console.log('Sign in' + user);
			})
			.catch(error => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	}

	// useEffect(() => {
	// 	const auth = getAuth();
	// 	return onAuthStateChanged(auth, user => {
	// 		if (user) {
	// 			const uid = user.uid;
	// 			setCurrentUser(user);
	// 			console.log('Sign in' + uid);
	// 		} else {
	// 			console.log('Sign out');
	// 		}
	// 	});
	// }, []);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
