import { Button, Grid } from '@mui/material';
import {
	btnSuccessBgColorMode,
	btnSuccesHoverBgColorMode,
} from '../../../theme/colors';

const SubmitButton = ({ btnTitle = 'Submit', handleClick }) => (
	<Grid item xs={12}>
		<Button
			type="submit"
			variant="contained"
			size="large"
			fullWidth
			disableRipple
			onClick={handleClick}
			sx={{
				color: '#fff',
				backgroundColor: btnSuccessBgColorMode,
				textTransform: 'capitalize',
				minHeight: '56px',

				':hover': {
					backgroundColor: btnSuccesHoverBgColorMode,
				},
			}}>
			{btnTitle}
		</Button>
	</Grid>
);

export default SubmitButton;
