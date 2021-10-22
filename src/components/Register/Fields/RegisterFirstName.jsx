import { Grid, TextField } from "@mui/material";

const RegisterFirstName = ({ value, onChange }) => {
    return (
        <Grid item xs={12} sm={6}>
            <TextField
                label="First name"
                id="firstName"
                fullWidth
                required
                value={value}
                onChange={onChange}
            />
        </Grid>
    );
};

export default RegisterFirstName;
