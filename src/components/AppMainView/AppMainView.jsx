import { useState } from 'react';
import { db } from '../../firebase/utils';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import useFirebaseCollection from '../../hooks/useFirebaseCollection';

import { Grid } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import CustomToolbar from './CustomToolbar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

function formatDate(d) {
	return d.toDate().toLocaleDateString();
}

const AppMainView = () => {
	const [pageSize, setPageSize] = useState(15);
	const { books } = useFirebaseCollection();

	const handleSaveClick = id => event => {
		event.stopPropagation();
		console.log(id);
	};

	const handleUpdateDoc = async (
		id,
		author,
		name,
		price,
		registration_date
	) => {
		console.log(id);
		// const newFields = { author, name, price, registration_date };
		// await updateDoc(doc(db, 'books', id), newFields);
	};

	const handleDeleteDoc = async id => await deleteDoc(doc(db, 'books', id));

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
			type: 'date',
			width: 160,
			editable: true,
			valueFormatter: params => formatDate(params.value),
		},
		{
			field: 'price',
			headerName: 'Price, MDL',
			sortable: true,
			editable: true,
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
							onClick={handleSaveClick(id)}
							color="primary"
						/>,
						<GridActionsCellItem
							icon={<CancelIcon />}
							label="Cancel"
							className="textPrimary"
							// onClick={()=>handleCancelClick(id)}
							color="inherit"
						/>,
					];
				}

				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						className="textPrimary"
						onClick={() => handleUpdateDoc(id)}
						color="inherit"
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={() => handleDeleteDoc(id)}
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
					sortModel={[
						{
							field: 'registration_date',
							sort: 'desc',
						},
					]}
					checkboxSelection
					disableSelectionOnClick
					// editMode="row"
					components={{
						Toolbar: CustomToolbar,
					}}
					pagination
					{...books}
					rowsPerPageOptions={[10, 15, 30, 50, 75, 100]}
					pageSize={pageSize}
					onPageSizeChange={newPageSize => setPageSize(newPageSize)}
					sx={{ color: 'black', minHeight: 'calc(100vh - 150px)' }}
				/>
			</Grid>
		</Grid>
	);
};

export default AppMainView;
