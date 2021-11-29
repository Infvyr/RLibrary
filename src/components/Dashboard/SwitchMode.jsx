/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography } from '@mui/material';

const SwitchMode = ({ isActiveLoginComponent, setIsActiveLoginComponent }) => {
	return (
		<>
			<Typography
				variant="body2"
				css={css`
					display: inline-flex;
					align-items: center;
					justify-content: flex-end;
				`}>
				{!isActiveLoginComponent ? (
					<>
						Already have an account?&nbsp;
						<b
							title="Login"
							onClick={() => setIsActiveLoginComponent(!isActiveLoginComponent)}
							css={css`
								cursor: pointer;
							`}>
							Sign in
						</b>
					</>
				) : (
					<>
						Don't have an account?&nbsp;
						<b
							title="Register"
							onClick={() => setIsActiveLoginComponent(!isActiveLoginComponent)}
							css={css`
								cursor: pointer;
							`}>
							Get started
						</b>
					</>
				)}
			</Typography>
		</>
	);
};

export default SwitchMode;
