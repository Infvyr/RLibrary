import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
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
	const [anchorEl, setAnchorEl] = useState(null);
	const navigate = useNavigate();
	const { currentUser } = useAuth();

	const handleMenu = event => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	const signout = () => {
		const auth = getAuth();

		signOut(auth)
			.then(() => navigate('/', { replace: true }))
			.catch(error => console.error(error));
	};

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
							currentUser.photoURL !== null ? (
								<Avatar src={currentUser.photoURL} />
							) : (
								<AccountCircle />
							)
						}
						label={currentUser.displayName}
						onClick={handleMenu}
						sx={{ bgcolor: 'transparent' }}
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
						<MenuItem disableRipple onClick={handleClose}>
							Profile
						</MenuItem>
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
