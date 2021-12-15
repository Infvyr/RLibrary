import useFirebaseTotal from '../../hooks/useFirebaseTotal';
import { Grid, Alert, Typography } from '@mui/material';

const Stats = () => {
	const { totalBooks, totalPrice } = useFirebaseTotal();

	return (
		<Grid container spacing={2} sx={{ pt: 5, pl: 5, pr: 5, pb: 0 }}>
			<Grid item xs={12} sm={6}>
				<Alert severity="info">
					<Typography variant="h6" component="h1" sx={{ mt: '-5px' }}>
						Total numbers of registered books <b>{totalBooks}</b>
					</Typography>
				</Alert>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Alert severity="info">
					<Typography variant="h6" component="h1" sx={{ mt: '-5px' }}>
						Total price for all books <b>{totalPrice} MDL</b>
					</Typography>
				</Alert>
			</Grid>
		</Grid>
	);
};

export default Stats;
