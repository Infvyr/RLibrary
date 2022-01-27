import classes from './HelperError.module.css';

const HelperError = ({ label }) => {
	return <span className={classes.errorHelper}>{label}</span>;
};

export default HelperError;
