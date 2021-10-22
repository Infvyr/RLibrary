import { createContext, useContext, useState, useEffect } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const value = { currentUser };

    // async function signUp(firstName, lastName, password, email) {
    // 	const auth = getAuth();

    // 	try {
    // 		const userCredential = await createUserWithEmailAndPassword(
    // 			auth,
    // 			firstName,
    // 			lastName,
    // 			email,
    // 			password
    // 		);
    // 		// Signed in
    // 		const user = userCredential.user;
    // 		setCurrentUser(user);
    // 		console.log('Sign in' + user);
    // 	} catch (error) {
    // 		const errorCode = error.code;
    // 		const errorMessage = error.message;
    // 		console.log(errorCode, errorMessage);
    // 	}
    // }

    // // useEffect(() => {
    // // 	onAuthStateChanged(getAuth(), user => {
    // // 		if (user) {
    // // 			const uid = user.uid;
    // // 			setCurrentUser(user);
    // // 		} else {
    // // 			// User is signed out
    // // 			console.log('Sign out');
    // // 		}
    // // 	});
    // // }, []);

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
