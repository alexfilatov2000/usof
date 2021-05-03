import {useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchNewPsw} from "../../redux/auth";
import {useStyles} from "../../styles/resetStyles";
import {Box, Button, Container, TextField, Typography} from "@material-ui/core";

const NewPassword = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth)

    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {password, password2};
        dispatch(fetchNewPsw(user, history, token));
    }

    return (
        <div>
            <Container className={classes.main}>
                <Box display="flex" justifyContent="center">
                    <Typography variant="h5" color="textSecondary" gutterBottom>
                        Input new password
                    </Typography>
                </Box>

                {user.error && <div className={classes.error}>{user.error}</div>}

                <Box justifyContent="center" alignItems="center">
                    <form onSubmit={handleSubmit}>
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

export default NewPassword;