import {useState} from "react";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchReset} from "../../redux/auth";
import {Box, Button, Container, TextField, Typography} from "@material-ui/core";
import {useStyles} from "../../styles/resetStyles";

const PasswordReset = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);

    const [email, setEmail] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {email};
        dispatch(fetchReset(user, history));
    }

    return (
        <div>
            <Container className={classes.main}>

                <Box display="flex" justifyContent="center">
                    <Typography variant="h5" color="textSecondary" gutterBottom>
                        Password-Reset
                    </Typography>
                </Box>

                {user.error && <div className={classes.error}>{user.error}</div>}

                <Box justifyContent="center" alignItems="center">
                    <form onSubmit={handleSubmit}>
                        <TextField className={classes.field}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                            name="email"
                            variant="outlined"
                            value={email}
                            fullWidth
                            required
                        />

                        {!user.isPending && <Button type="submit" color="secondary" variant="contained" fullWidth>Submit</Button>}
                        {user.isPending && <Button type="submit" variant="contained" fullWidth disabled >Loading...</Button>}
                    </form>
                </Box>
            </Container>
        </div>
    );
}

export default PasswordReset;