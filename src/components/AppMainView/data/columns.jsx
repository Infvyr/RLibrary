import { formatDate } from '../../../helpers/formatDate';

export const COLUMNS = [
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
		minWidth: 200,
		editable: true,
		valueFormatter: params => formatDate(params.value?.seconds),
	},
	{
		field: 'price',
		headerName: 'Price, MDL',
		sortable: true,
		minWidth: 130,
		editable: true,
	},
];
