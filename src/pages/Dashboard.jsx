import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Register, Login } from '../components';
import { GridContainer, Header, AuthSider } from '../components';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
	const [isActiveLoginComponent, setIsActiveLoginComponent] = useState(false);
	const { isAuthenticated } = useAuth();

	return !isAuthenticated ? (
		<GridContainer>
			<Header
				isActiveLoginComponent={isActiveLoginComponent}
				setIsActiveLoginComponent={setIsActiveLoginComponent}
			/>
			<AuthSider isActiveLoginComponent={isActiveLoginComponent} />
			{!isActiveLoginComponent ? <Register /> : <Login />}
		</GridContainer>
	) : (
		<Navigate to="/view" />
	);
};

export default Dashboard;
