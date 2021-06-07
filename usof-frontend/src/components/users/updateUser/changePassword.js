import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {parseJwt} from "../../../util/parseToken";
import {useEffect, useState} from "react";
import {getOneUser, updatePassword} from "../../../redux/users";
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

const ChangePassword = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users);
    const auth = useSelector(state => state.auth);
    const T = parseJwt(auth.token)

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePassword(oldPassword, newPassword, T.user.id, auth.token, history));
    }

    useEffect(() => {
        dispatch(getOneUser(T.user.id))
    }, []);

    return (
        <div>
            {user.specUser &&
            <Container className={classes.main}>
                <Box display="flex" justifyContent="center">
                    <Typography variant="h5" color="textSecondary" gutterBottom>
                        Update Password
                    </Typography>
                </Box>

                {user.error && <div className={classes.error}>{user.error}</div>}

                <Box justifyContent="center" alignItems="center">
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <TextField
                            onChange={(e) => setOldPassword(e.target.value)}
                            className={classes.field}
                            label="Old Password"
                            variant="outlined"
                            value={oldPassword}
                            fullWidth
                            required
                        />

                        <TextField
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={classes.field}
                            label="New Password"
                            variant="outlined"
                            value={newPassword}
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

export default ChangePassword;