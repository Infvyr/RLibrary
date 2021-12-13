import { useState, useCallback } from 'react';
import useFirebaseCollection from '../../hooks/useFirebaseCollection';
import { COLUMNS } from './data/columns';

import { Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CustomToolbar from './CustomToolbar';

const AppMainView = () => {
	const { books, setBooks } = useFirebaseCollection();
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

	return (
		<Grid container rowSpacing={2} sx={{ p: 5 }}>
			<Grid item xs={12} sx={{ minHeight: 'calc(100vh - 150px)' }}>
				<DataGrid
					columns={COLUMNS}
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
						toolbar: { selectionRecord, editRowData, setBooks },
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
					sx={{ color: 'black' }}
				/>
			</Grid>
		</Grid>
	);
};

export default AppMainView;
