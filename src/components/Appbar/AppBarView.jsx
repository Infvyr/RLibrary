import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import {
	AppBar,
	Toolbar,
	Typography,
	Menu,
	MenuItem,
	Chip,
	Avatar,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const AppBarView = () => {
	const { currentUser, signOutUser } = useAuth();
	const [anchorEl, setAnchorEl] = useState(null);
	const navigate = useNavigate();

	const handleMenu = event => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	const signout = () =>
		signOutUser()
			.then(() => navigate('/', { replace: true }))
			.catch(error => console.error(error));

	return (
		<AppBar position="static">
			<Toolbar
				style={{
					paddingLeft: '36px',
				}}>
				<Typography variant="h6" sx={{ flexGrow: 1 }}>
					RLibrary
				</Typography>
				<>
					<Chip
						avatar={
							currentUser?.photoURL === null ? (
								<AccountCircle sx={{ fill: 'white' }} />
							) : (
								<Avatar src={currentUser?.photoURL} />
							)
						}
						label={currentUser?.displayName}
						onClick={handleMenu}
						sx={{ bgcolor: 'transparent', color: 'white' }}
					/>
					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={Boolean(anchorEl)}
						onClose={handleClose}>
						<MenuItem disableRipple onClick={signout}>
							Sign out
						</MenuItem>
					</Menu>
				</>
			</Toolbar>
		</AppBar>
	);
};

export default AppBarView;
