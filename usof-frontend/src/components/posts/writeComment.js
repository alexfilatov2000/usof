import {useDispatch, useSelector} from "react-redux";
import {createComment} from "../../redux/posts";
import {Button, Container, makeStyles, Snackbar, TextField, Typography} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: 25,
    },
    answer: {
        margin: '30px 0'
    },
    snackbar: {
        position: "fixed",
        left: 'calc(50% + 120px)',
    },
    alert: {
        fontSize: 30
    }
}));

const WriteComment = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const post = useSelector(state => state.posts);
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.users);

    const [data, setData] = useState('');
    const [open, setOpen] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(createComment(auth.token, post.specPost.id, data, history, setOpen));
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <Typography variant="h4" className={classes.answer}>
                Your Answer
            </Typography>

            {post.error &&
                <div>
                    <Snackbar
                        open={open}
                        autoHideDuration={10000}
                        onClose={handleClose}
                        className={classes.snackbar}
                    >
                        <Alert onClose={handleClose} severity="error" className={classes.alert}>
                            {post.error}
                        </Alert>
                    </Snackbar>
                </div>
            }
            <Container className={classes.form}>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        label="Multiline"
                        multiline
                        rows={10}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setData(e.target.value)}
                    />

                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        fullWidth
                    >
                        Post Your Answer
                    </Button>
                </form>
            </Container>
        </div>
    );
}

export default WriteComment;