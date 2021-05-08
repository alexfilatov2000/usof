import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/users";
import {Box, Button, Container, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import {useStyles} from "../../styles/registerStyles"

const CreateUser = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const User = useSelector(state => state.users)

    const [full_name, setFull_name] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [role, setRole] = useState('user');

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { full_name, login, email, password, password2, role};
        dispatch(createUser(user, auth.token, history));
    }

    return (
        <div>
            <Container className={classes.main}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Typography variant="h5" color="textSecondary" gutterBottom>
                        Create New User
                    </Typography>
                </Box>

                {User.error && <div className={classes.error}>{User.error}</div>}

                <Box justifyContent="center" alignItems="center">
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
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role}
                            variant="filled"
                            fullWidth
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <MenuItem value={'user'}>user</MenuItem>
                            <MenuItem value={'admin'}>admin</MenuItem>
                        </Select>
                        <br/><br/>
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

export default CreateUser;
