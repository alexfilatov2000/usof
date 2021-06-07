import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {parseJwt} from "../../../util/parseToken";
import {useEffect, useState} from "react";
import {getOneUser, updateLogin} from "../../../redux/users";
import {Box, Button, Container, makeStyles, TextField, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    field: {
        marginTop: 10,
        marginBottom: 10,
        display: 'block',
        borderRadius: 5
    },
    main: {
        marginTop: 20,
        backgroundColor: "#eff0f1",
        width: '20%',
        paddingBottom: 20,
        paddingTop: 20,
        borderRadius: 30
    },
    buttons: {
        marginTop: 20
    },
    buttonOne: {
        marginRight: 20
    },
    buttonTwo: {
        marginLeft: 20
    },
    error: {
        color: "red",
        fontWeight: "bold",
        border: "1px solid red",
        borderRadius: 5,
        padding: 5,
        marginBottom: 5
    }
}));

const ChangeLogin = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users);
    const auth = useSelector(state => state.auth);
    const T = parseJwt(auth.token)

    const [login, setLogin] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateLogin(login, T.user.id, auth.token, history));
    }

    useEffect(() => {
        dispatch(getOneUser(T.user.id))
    }, []);

    useEffect(() => {
        if (user.specUser) setLogin(user.specUser.login);
    }, [user.specUser]);

    return (
        <div>
            {user.specUser &&
            <Container className={classes.main}>
                <Box display="flex" justifyContent="center">
                    <Typography variant="h5" color="textSecondary" gutterBottom>
                        Update Login
                    </Typography>
                </Box>

                {user.error && <div className={classes.error}>{user.error}</div>}

                <Box justifyContent="center" alignItems="center">
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <TextField
                            onChange={(e) => setLogin(e.target.value)}
                            className={classes.field}
                            label="Login"
                            name="login"
                            variant="outlined"
                            value={login}
                            fullWidth
                            required
                        />

                        <Box display="flex" className={classes.buttons}>
                            <Button
                                onClick={() => history.push('/')}
                                type="submit"
                                color="default"
                                variant="contained"
                                fullWidth
                                className={classes.buttonOne}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                                fullWidth
                                className={classes.buttonTwo}
                            >
                                Update
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Container>
            }
        </div>
    );
}

export default ChangeLogin;