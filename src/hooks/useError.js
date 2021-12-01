import { useState } from 'react';
import { stringContainsNumber } from '../helpers/functions';

export const useTextError = () => {
	const [isError, setIsError] = useState(false);
	const [helperText, setHelperText] = useState('');

	const setError = e => {
		if (e.target.value.length <= 2) {
			setHelperText('Should contain at least 2 characters and only letters!');
			setIsError(true);
		} else {
			setHelperText('');
			setIsError(false);
		}

		if (e.target.value === '') {
			setHelperText('');
			setIsError(false);
		}

		if (stringContainsNumber(e.target.value)) {
			setHelperText('Numbers are not allowed!');
			setIsError(true);
		}
	};

	return [isError, helperText, setError];
};

export const useEmailError = () => {
	const [isError, setIsError] = useState(false);
	const [helperText, setHelperText] = useState('');

	const setError = e => {
		if (
			e.target.value &&
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)
		) {
			setHelperText('Invalid email address!');
			setIsError(true);
		} else {
			setHelperText('');
			setIsError(false);
		}
	};

	return [isError, helperText, setError];
};

export const usePasswordError = () => {
	const [isError, setIsError] = useState(false);
	const [helperText, setHelperText] = useState('');

	const setError = e => {
		if (e.target.value.length <= 6 && e.target.value.trim()) {
			setHelperText('Password should be at least 6 characters!');
			setIsError(true);
		} else {
			setHelperText('');
			setIsError(false);
		}

		if (e.target.value === '') {
			setHelperText('');
			setIsError(false);
		}
	};

	return [isError, helperText, setError];
};
