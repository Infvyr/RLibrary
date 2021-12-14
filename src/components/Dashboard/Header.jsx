/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AuthSiderTitle } from '..';
import { SwitchMode } from '..';

const Header = ({ isActiveLoginComponent, setIsActiveLoginComponent }) => {
	return (
		<header
			css={css`
				position: absolute;
				top: 0;
				padding: 15px 24px;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				@media (min-width: 900px) {
					padding: 40px 40px 0 40px;
					align-items: flex-start;
				}
			`}>
			<AuthSiderTitle
				title="RLibrary"
				variant="h4"
				styles={{ marginBottom: 'auto' }}
			/>
			<SwitchMode
				isActiveLoginComponent={isActiveLoginComponent}
				setIsActiveLoginComponent={setIsActiveLoginComponent}
			/>
		</header>
	);
};

export default Header;
