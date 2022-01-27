import classes from './ErrorMessage.module.css';

const ErrorMessage = ({ label }) => {
	return <span className={classes.errorHelper}>{label}</span>;
};

export default ErrorMessage;
