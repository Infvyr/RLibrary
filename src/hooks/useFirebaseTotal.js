import { useState, useEffect } from 'react';
import { db } from '../firebase/utils';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { sum } from '../helpers/sum';

const useFirebaseTotal = (collectionName = 'books') => {
	const [totalBooks, setTotalBooks] = useState(Number);
	const [totalPrice, setTotalPrice] = useState(Number);

	useEffect(() => {
		const unsubscribe = onSnapshot(
			query(collection(db, collectionName)),
			querySnapshot => {
				setTotalBooks(querySnapshot.size);
				setTotalPrice(
					querySnapshot.docs.map(doc => doc.data().price).reduce(sum, 0)
				);
			}
		);

		return () => unsubscribe();
	}, []);

	return { totalBooks, totalPrice };
};

export default useFirebaseTotal;
