import { Grid, TextField } from "@mui/material";

const RegisterLastName = ({ value, onChange }) => {
    return (
        <Grid item xs={12} sm={6}>
            <TextField
                label="Last name"
                id="lastName"
                fullWidth
                required
                value={value}
                onChange={onChange}
            />
        </Grid>
    );
};

export default RegisterLastName;
