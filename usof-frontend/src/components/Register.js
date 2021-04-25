import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister } from "../redux/users";
import {Box, Button, Container, TextField, Typography} from "@material-ui/core";
import {useStyles} from "../styles/registerStyles"

const Register = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users)

    const [full_name, setFull_name] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { full_name, login, email, password, password2 };
        dispatch(fetchRegister(user, history));
    }

    return (
        <div>
            <Container className={classes.main}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Typography variant="h5" color="textSecondary" gutterBottom>
                        Register
                    </Typography>
                </Box>

                {user.error && <div className={classes.error}>{user.error}</div>}

                <Box display="flex" justifyContent="center" alignItems="center">
                    <form onSubmit={handleSubmit}>
                        <TextField className={classes.field}
                            onChange={(e) => setFull_name(e.target.value)}
                            label="Full Name"
                            name="full_name"
                            variant="outlined"
                            value={full_name}
                            fullWidth
                            required
                        />
                        <TextField className={classes.field}
                            onChange={(e) => setLogin(e.target.value)}
                            label="Login"
                            name="login"
                            variant="outlined"
                            value={login}
                            fullWidth
                            required
                        />

                        <TextField className={classes.field}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                            name="email"
                            variant="outlined"
                            value={email}
                            fullWidth
                            required
                        />

                        <TextField className={classes.field}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            value={password}
                            fullWidth
                            required
                        />

                        <TextField className={classes.field}
                            onChange={(e) => setPassword2(e.target.value)}
                            label="Confirm Password"
                            name="password2"
                            type="password"
                            variant="outlined"
                            value={password2}
                            fullWidth
                            required
                        />
                        <Button
                            type="submit"
                            color="secondary"
                            variant="contained"
                            fullWidth
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
            </Container>
        </div>
    );
}

export default Register;
