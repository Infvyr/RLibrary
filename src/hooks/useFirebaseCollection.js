import { useState, useEffect } from 'react';
import { db } from '../firebase/utils';
import { collection, onSnapshot, query } from 'firebase/firestore';

const useFirebaseCollection = (collectionName = 'books') => {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(collection(db, collectionName)),
			querySnapshot => {
				setBooks(
					querySnapshot.docs.map(doc => {
						// let date = doc.data().registration_date.toDate();
						return {
							id: doc.id,
							// registration_date: date.toDateString(),
							...doc.data(),
						};
					})
				);
			}
		);

		return () => unsubscribe();
	}, []);

	return { books, setBooks };
};

export default useFirebaseCollection;
