import { useState } from 'react';
import { db } from '../../firebase/utils';
import {
	writeBatch,
	collection,
	doc,
	addDoc,
	updateDoc,
	Timestamp,
} from 'firebase/firestore';
import enGb from 'date-fns/locale/en-GB';

import {
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
	GridToolbarExport,
	GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import {
	Box,
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
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

export default function CustomToolbar({ selectionRecord, editRowData }) {
	const [open, setOpen] = useState(false);
	const [bookName, setBookName] = useState('');
	const [bookAuthor, setBookAuthor] = useState('');
	const [bookRegDate, setBookRegDate] = useState(null);
	const [bookPrice, setBookPrice] = useState('');

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleAddRecord = async e => {
		e.preventDefault();

		if (!bookName || !bookAuthor || !bookRegDate || !bookPrice) return;

		await addDoc(collection(db, 'books'), {
			name: bookName,
			author: bookAuthor,
			registration_date: Timestamp.fromDate(new Date(bookRegDate)),
			price: parseFloat(bookPrice),
		});

		setBookName('');
		setBookAuthor('');
		setBookRegDate(null);
		setBookPrice('');
		setOpen(false);
	};

	const handleUpdateRecord = async (
		selectionRecord,
		name = editRowData.name.value,
		author = editRowData.author.value,
		regDate = editRowData.registration_date.value,
		price = editRowData.price.value
	) => {
		if (!name || !author || !regDate || !price) return;

		await updateDoc(doc(db, 'books', selectionRecord[0]), {
			name: editRowData.name.value,
			author: editRowData.author.value,
			price: editRowData.price.value,
			registration_date: editRowData.registration_date.value,
		});
	};

	const handleDeleteDoc = async selectionRecord => {
		const batch = writeBatch(db);
		selectionRecord.forEach(rec => batch.delete(doc(db, 'books', rec)));
		await batch.commit();
	};

	return (
		<GridToolbarContainer sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
			<Box
				sx={{
					flex: '1',
					order: '1',
					textAlign: { xs: 'center', sm: 'right' },
				}}>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
				<GridToolbarDensitySelector />
				<GridToolbarExport />
			</Box>
			<Button color="primary" startIcon={<AddIcon />} onClick={handleOpen}>
				Add record
			</Button>
			{selectionRecord.length === 1 && (
				<Button
					color="primary"
					startIcon={<EditIcon />}
					onClick={() =>
						handleUpdateRecord(
							selectionRecord,
							editRowData.name.value,
							editRowData.author.value,
							editRowData.registration_date.value,
							editRowData.price.value
						)
					}>
					Update record
				</Button>
			)}
			{selectionRecord.length !== 0 && (
				<Button
					color="primary"
					startIcon={<DeleteForeverIcon />}
					onClick={() => handleDeleteDoc(selectionRecord)}>
					Delete record
				</Button>
			)}

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
		</GridToolbarContainer>
	);
}
