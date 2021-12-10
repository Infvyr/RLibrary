import { useState, useCallback } from 'react';
import { toDate } from 'date-fns';
import useFirebaseCollection from '../../hooks/useFirebaseCollection';

import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CustomToolbar from './CustomToolbar';

function formatDate(timestamp) {
	let t = new Date(timestamp * 1000);
	return `${t.getMonth() + 1}/${t.getDate()}/${t.getFullYear()}`;
	// return d.toDate().toLocaleDateString();
}

const AppMainView = () => {
	const { books } = useFirebaseCollection();
	const [selectionRecord, setSelectionRecord] = useState([]);
	const [pageSize, setPageSize] = useState(15);
	const [editRowsModel, setEditRowsModel] = useState({});
	const [editRowData, setEditRowData] = useState({});

	const handleEditRowsModelChange = useCallback(
		model => {
			const editedIds = Object.keys(model);
			if (editedIds.length !== 0) setEditRowData(model[editedIds[0]]);
			setEditRowsModel(model);
		},
		[editRowData]
	);

	const columns = [
		// { field: 'id', headerName: 'ID', width: 80 },
		{
			field: 'name',
			headerName: 'Book name',
			minWidth: 360,
			editable: true,
		},
		{
			field: 'author',
			headerName: 'Author',
			minWidth: 200,
			editable: true,
		},
		{
			field: 'registration_date',
			headerName: 'Registration date',
			type: 'date',
			dateSetting: { locale: 'en-GB' },
			minWidth: 200,
			editable: true,
			// valueFormatter: params =>
			// 	new Date(
			// 		params.value.seconds * 1000 + params.value.nanoseconds / 1000000
			// 	).toLocaleDateString(),
			valueFormatter: params => formatDate(params.value.seconds),
		},
		{
			field: 'price',
			headerName: 'Price, MDL',
			sortable: true,
			minWidth: 130,
			editable: true,
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
					onSelectionModelChange={newSelectionModel =>
						setSelectionRecord(newSelectionModel)
					}
					components={{
						Toolbar: CustomToolbar,
					}}
					componentsProps={{
						toolbar: { selectionRecord, editRowData },
					}}
					selectionModel={selectionRecord}
					checkboxSelection
					editMode="row"
					editRowsModel={editRowsModel}
					onEditRowsModelChange={handleEditRowsModelChange}
					pagination
					{...books}
					rowsPerPageOptions={[15, 30, 50, 75, 100]}
					pageSize={pageSize}
					onPageSizeChange={newPageSize => setPageSize(newPageSize)}
					disableSelectionOnClick
					disableColumnMenu
					sx={{ color: 'black', minHeight: 'calc(100vh - 150px)' }}
				/>
			</Grid>
		</Grid>
	);
};

export default AppMainView;
