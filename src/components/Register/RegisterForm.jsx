import { useState } from "react";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth, db } from "../../firebase/utils";
import {
    Alert,
    AlertTitle,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {
    btnSuccessBgColorMode,
    btnSuccesHoverBgColorMode,
} from "../../theme/colors";
import { RegisterFirstName, RegisterLastName } from "..";

// import { collection, getDocs } from "firebase/firestore";

const RegisterForm = () => {
    const [values, setValues] = useState({
        password: "",
        showPassword: false,
        email: "",
        firstName: "",
        lastName: "",
    });

    const [error, setError] = useState("");

    // const [registerFirstName, setRegisterFirstName] = useState("");
    // const [registerLastName, setRegisterLastName] = useState("");
    // const [registerEmail, setRegisterEmail] = useState("");

    // const [users, setUsers] = useState([]);
    // const usersCollectionRef = collection(db, "users");

    // useEffect(() => {
    //     const getUsers = async () => {
    //         const data = await getDocs(usersCollectionRef);
    //         setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    //     };
    //     getUsers();
    // }, []);

    // console.log(`GetUsers from Firestore: ${JSON.stringify(users)}`);

    async function registerUser(e) {
        e.preventDefault();

        try {
            if (
                values.email.length ||
                values.password > 6 ||
                values.firstName > 2 ||
                values.lastName > 2
            ) {
                const user = await createUserWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                );

                setValues({
                    password: "",
                    showPassword: false,
                    email: "",
                    firstName: "",
                    lastName: "",
                });
                console.log(user);
            } else {
                setError("All fields are required!");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleRegisterInput =
        prop =>
        ({ target }) =>
            setValues({
                ...values,
                [prop]: target.value,
            });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    return (
        <>
            {error && (
                <Alert severity="error" sx={{ mb: 4 }}>
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>
            )}
            <Grid container spacing={2}>
                <RegisterFirstName
                    value={values.firstName}
                    onChange={handleRegisterInput("firstName")}
                />
                <RegisterLastName
                    value={values.lastName}
                    onChange={handleRegisterInput("lastName")}
                />
                <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel
                            htmlFor="outlined-adornment-password"
                            required
                        >
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handleRegisterInput("password")}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="email"
                        label="Email address"
                        id="email"
                        fullWidth
                        required
                        value={values.email}
                        onChange={handleRegisterInput("email")}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        disableRipple
                        sx={{
                            color: "#fff",
                            backgroundColor: btnSuccessBgColorMode,
                            textTransform: "capitalize",
                            minHeight: "56px",

                            ":hover": {
                                backgroundColor: btnSuccesHoverBgColorMode,
                            },
                        }}
                        onClick={registerUser}
                    >
                        Register
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default RegisterForm;
