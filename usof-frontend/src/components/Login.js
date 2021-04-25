import { useState } from "react";
import {Link, useHistory} from "react-router-dom";
import { fetchLogin } from "../redux/users";
import { useDispatch, useSelector } from 'react-redux'
import { TextField, Button, Typography, Box, Container} from '@material-ui/core';
import { useStyles } from "../styles/loginStyles";

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const user = useSelector(state => state.users)

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {login, password};
        dispatch(fetchLogin(user, history));
    }
    return (
        <div>
            <Container className={classes.main}>
                <Box display="flex" justifyContent="center">
                    <Typography variant="h5" color="textSecondary" gutterBottom>
                        Login
                    </Typography>
                </Box>

                {user.error && <div className={classes.error}>{user.error}</div>}
                <Box display="flex" justifyContent="center" alignItems="center">
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <TextField className={classes.field}
                                   onChange={(e) => setLogin(e.target.value)}
                                   label="Login"
                                   name="login"
                                   variant="outlined"
                                   value={login}
                                   required
                                   fullWidth
                        />
                        <TextField className={classes.field}
                                   onChange={(e) => setPassword(e.target.value)}
                                   label="Password"
                                   type="password"
                                   name="password"
                                   variant="outlined"
                                   value={password}
                                   required
                                   fullWidth
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

            <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="subtitle1">
                    Don’t have an account? <Link to="/password-reset">Sign up</Link>
                </Typography>
            </Box>
        </div>
    );
}

export default Login;
