import {useDispatch, useSelector} from "react-redux";
import {createComment} from "../../redux/posts";
import {Button, Container, makeStyles, Snackbar, TextField, Typography} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import CreatedError from "./createComment/createdError";
import CreatedSuccess from "./createComment/createdSuccess";

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: 25,
    },
    answer: {
        margin: '30px 0'
    },
}));

const WriteComment = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const post = useSelector(state => state.posts);
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.users);

    const [data, setData] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(createComment(auth.token, post.specPost.id, data, history, setData));
    }

    return (
        <div>
            <Typography variant="h4" className={classes.answer}>
                Your Answer
            </Typography>

            {post.error && <CreatedError/>}
            {post.openCommentSuccess && <CreatedSuccess/>}

            <Container className={classes.form}>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        label="Multiline"
                        multiline
                        rows={10}
                        value={data}
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