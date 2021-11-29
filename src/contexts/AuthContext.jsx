import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState({});
	const value = { currentUser };

	const handleUserStateChanges = user => {
		if (user) {
			const { displayName, email, uid, accessToken } = user;

			setCurrentUser({
				displayName,
				email,
				uid,
				accessToken,
			});
			console.log('Auth Context:');
			console.log({ displayName, email, uid, accessToken });
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
