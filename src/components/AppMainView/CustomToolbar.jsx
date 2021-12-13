import { useState } from 'react';
import { db } from '../../firebase/utils';
import {
	writeBatch,
	collection,
	doc,
	updateDoc,
	Timestamp,
} from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

import {
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
	GridToolbarExport,
	GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { BookDocDialog } from '../';
import { ConditionalSnackbar } from '../';

import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

export default function CustomToolbar({
	selectionRecord,
	editRowData,
	setBooks,
}) {
	const { message, setMessage } = useAuth();
	const [open, setOpen] = useState(false);

	const rowData = {
		name: editRowData.name?.value,
		author: editRowData.author?.value,
		price: editRowData.price?.value,
		date: editRowData.registration_date?.value,
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// update selected datagrid row in firestore
	const handleUpdateRecord = async (
		selectionRecord,
		name,
		author,
		regDate,
		price
	) => {
		try {
			if (!name || !author || !regDate || !price) return;

			const newFields = {
				name: rowData.name,
				author: rowData.author,
				price: rowData.price,
				registration_date: rowData.date,
			};

			await updateDoc(doc(db, 'books', selectionRecord[0]), newFields);

			setMessage({
				...message,
				successMessage: 'You have successfully updated the record!',
				isSuccess: true,
			});
		} catch (error) {
			setMessage({
				...message,
				errorMessage: error.message,
				isError: true,
			});
		}
	};

	// delete document in firestore
	const handleDeleteDoc = async selectionRecord => {
		try {
			const batch = writeBatch(db);
			selectionRecord.forEach(rec => batch.delete(doc(db, 'books', rec)));
			await batch.commit();

			setMessage({
				...message,
				successMessage: 'You have successfully deleted the record!',
				isSuccess: true,
			});
		} catch (error) {
			setMessage({
				...message,
				errorMessage: error.message,
				isError: true,
			});
		}
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
							rowData.name,
							rowData.author,
							rowData.price,
							rowData.date
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

			<BookDocDialog open={open} handleClose={handleClose} />
			<ConditionalSnackbar />
		</GridToolbarContainer>
	);
}
