import { Grid } from '@mui/material';
import { AppBarView, AppMainView } from '../components';

const AppView = () => (
	<Grid container spacing={2} sx={{ mt: 0 }}>
		<AppBarView />
		<AppMainView />
	</Grid>
);

export default AppView;
