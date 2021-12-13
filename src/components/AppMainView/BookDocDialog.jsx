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

const removeExtraSpace = s => s.trim().split(/ +/).join(' ');

const AddNewBookDocDialog = ({ open, handleClose }) => {
	const [bookName, setBookName] = useState('');
	const [bookAuthor, setBookAuthor] = useState('');
	const [bookRegDate, setBookRegDate] = useState(null);
	const [bookPrice, setBookPrice] = useState('');

	const handleAddRecord = async e => {
		e.preventDefault();

		if (!bookName || !bookAuthor || !bookRegDate || !bookPrice) return;

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
				<LocalizationProvider dateAdapter={AdapterDateFns} locale={enGb}>
					<DatePicker
						label="Registration date"
						value={bookRegDate}
						onChange={newValue => setBookRegDate(newValue)}
						renderInput={params => (
							<TextField {...params} fullWidth variant="standard" required />
						)}
					/>
				</LocalizationProvider>
				<TextField
					margin="dense"
					id="price"
					type="number"
					label="Price"
					variant="standard"
					inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
					value={bookPrice}
					onChange={e => setBookPrice(e.target.value)}
					fullWidth
					required
					sx={{ mt: '0' }}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleAddRecord}>Add new record</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddNewBookDocDialog;
