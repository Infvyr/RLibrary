import { useState } from 'react';
import { db } from '../../firebase/utils';
import { collection, addDoc } from 'firebase/firestore';
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
import AddIcon from '@mui/icons-material/Add';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function CustomToolbar() {
	const [open, setOpen] = useState(false);
	const [bookName, setBookName] = useState('');
	const [bookAuthor, setBookAuthor] = useState('');
	const [bookRegDate, setBookRegDate] = useState(null);
	const [bookPrice, setBookPrice] = useState('');

	const handleClickOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleAddRecord = async e => {
		e.preventDefault();

		if (!bookName || !bookAuthor || !bookRegDate || !bookPrice) return;

		const docRef = await addDoc(collection(db, 'books'), {
			name: bookName,
			author: bookAuthor,
			registration_date: bookRegDate,
			price: parseFloat(bookPrice),
		});

		console.log('Document written with ID: ', docRef.id);

		setBookName('');
		setBookAuthor('');
		setBookRegDate(null);
		setBookPrice('');
		setOpen(false);
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
			<Button color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
				Add record
			</Button>
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
					<LocalizationProvider dateAdapter={AdapterDateFns}>
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
