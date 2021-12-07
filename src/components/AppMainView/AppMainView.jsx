import { useEffect, useState } from 'react';
import { db } from '../../firebase/utils';
import { collection, onSnapshot, query } from 'firebase/firestore';

import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';

import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

function formatDate(d) {
	return d.toDate().toLocaleString('ro-RO');
}

function EditToolbar(props) {
	const { apiRef } = props;

	const handleClick = e => {
		console.log(e.target);
	};

	return (
		<GridToolbarContainer>
			<Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
				Add record
			</Button>
		</GridToolbarContainer>
	);
}

const AppMainView = () => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [pageSize, setPageSize] = useState(1);

	const getBooks = () => {
		const unsubscribe = onSnapshot(
			query(collection(db, 'books')),
			querySnapshot => {
				setLoading(true);
				setBooks(
					querySnapshot.docs.map(doc => ({
						id: doc.id,
						...doc.data(),
					}))
				);
			}
		);

		setLoading(false);

		return unsubscribe;
	};

	useEffect(() => {
		getBooks();

		return () => getBooks();
	}, []);

	const columns = [
		// { field: 'id', headerName: 'ID', width: 80 },
		{
			field: 'name',
			headerName: 'Book name',
			width: 340,
			editable: true,
		},
		{
			field: 'author',
			headerName: 'Author',
			width: 180,
			editable: true,
		},
		{
			field: 'registration_date',
			headerName: 'Registration date',
			type: 'dateTime',
			width: 160,
			editable: true,
			valueFormatter: params => formatDate(params.value),
		},
		{
			field: 'price',
			headerName: 'Price, MDL',
			sortable: true,
			width: 100,
		},
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			width: 100,
			cellClassName: 'actions',
			getActions: ({ id }) => {
				const isInEditMode = false;

				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<SaveIcon />}
							label="Save"
							// onClick={handleSaveClick(id)}
							color="primary"
						/>,
						<GridActionsCellItem
							icon={<CancelIcon />}
							label="Cancel"
							className="textPrimary"
							// onClick={handleCancelClick(id)}
							color="inherit"
						/>,
					];
				}

				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						className="textPrimary"
						// onClick={handleEditClick(id)}
						color="inherit"
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						// onClick={handleDeleteClick(id)}
						color="inherit"
					/>,
				];
			},
		},
	];

	return (
		<Grid container rowSpacing={2} sx={{ p: 5 }}>
			<Grid item xs={12}>
				<DataGrid
					columns={columns}
					rows={books}
					checkboxSelection
					disableSelectionOnClick
					editMode="row"
					// onRowEditStart={handleRowEditStart}
					// onRowEditStop={handleRowEditStop}
					// onCellFocusOut={handleCellFocusOut}
					components={{
						Toolbar: GridToolbar,
					}}
					pagination
					{...books}
					rowsPerPageOptions={[1, 3, 5]}
					pageSize={pageSize}
					onPageSizeChange={newPageSize => setPageSize(newPageSize)}
					sx={{ color: 'black' }}
				/>
			</Grid>
		</Grid>
	);
};

export default AppMainView;
