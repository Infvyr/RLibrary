import { useState } from 'react';
import { db } from '../../firebase/utils';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import enGb from 'date-fns/locale/en-GB';
import { removeExtraSpace } from '../../helpers/sanitization';
import { HelperError } from '../';

const AddNewBookDocDialog = ({ open, handleClose }) => {
	const [bookName, setBookName] = useState('');
	const [bookAuthor, setBookAuthor] = useState('');
	const [bookRegDate, setBookRegDate] = useState(null);
	const [bookPrice, setBookPrice] = useState('');
	const [fieldsError, setFieldsError] = useState({
		bookName: '',
		bookAuthor: '',
		bookRegDate: '',
		bookPrice: '',
	});

	const handleAddRecord = async e => {
		e.preventDefault();

		if (!bookName || !bookAuthor || !bookRegDate || !bookPrice) {
			setFieldsError({
				bookName: 'The book name should not be empty',
				bookAuthor: 'The book author is required',
				bookRegDate: 'Set a registration date',
				bookPrice: "Enter the book's price",
			});
			return;
		}

		const newFields = {
			name: removeExtraSpace(bookName),
			author: removeExtraSpace(bookAuthor),
			registration_date: Timestamp.fromDate(bookRegDate),
			price: parseFloat(bookPrice),
		};

		await addDoc(collection(db, 'books'), newFields);

		setBookName('');
		setBookAuthor('');
		setBookRegDate(null);
		setBookPrice('');
		handleClose();
	};

	const handlePriceField = e => {
		let input = e.target.value;
		if (
			!input ||
			(input[input.length - 1].match('[0-9]') && input[0].match('[1-9]'))
		) {
			setBookPrice(input);
		}
	};

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>Add new record</DialogTitle>
			<DialogContent
				sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Book Name"
					variant="standard"
					value={bookName}
					onChange={e => setBookName(e.target.value)}
					fullWidth
					required
				/>
				{(!bookName || bookName === '') && (
					<HelperError label={fieldsError.bookName} />
				)}

				<TextField
					margin="dense"
					id="author"
					label="Author"
					variant="standard"
					value={bookAuthor}
					onChange={e => setBookAuthor(e.target.value)}
					fullWidth
					required
					sx={{ mt: '0' }}
				/>
				{(!bookAuthor || bookAuthor == '') && (
					<HelperError label={fieldsError.bookAuthor} />
				)}

				<LocalizationProvider dateAdapter={AdapterDateFns} locale={enGb}>
					<DatePicker
						label="Registration date"
						value={bookRegDate}
						onChange={newValue => setBookRegDate(newValue)}
						renderInput={params => (
							<TextField {...params} fullWidth variant="standard" required />
						)}
					/>
					{(!bookRegDate || bookRegDate === '') && (
						<HelperError label={fieldsError.bookRegDate} />
					)}
				</LocalizationProvider>

				<TextField
					margin="dense"
					id="price"
					type="number"
					label="Price"
					variant="standard"
					inputProps={{ min: 1, inputMode: 'numeric', pattern: '[0-9]*' }}
					value={bookPrice}
					onChange={handlePriceField}
					fullWidth
					required
					sx={{ mt: '0' }}
				/>
				{(!bookPrice || bookPrice === '') && (
					<HelperError label={fieldsError.bookPrice} />
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleAddRecord}>Add new record</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddNewBookDocDialog;
