import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Typography, Container, TextField, Button, makeStyles, Snackbar} from "@material-ui/core";
import {useState} from "react";
import {createPost} from "../../redux/posts";
//import {Alert} from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: 25,
    },
    inputs: {
        paddingBottom: 20
    },
    title: {
        margin: '20px 0'
    },
    snackbar: {
        position: "fixed",
        left: 'calc(50% + 120px)',
    },
    alert: {
        fontSize: 30
    }
}));

const CreatePost = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const post = useSelector(state => state.posts);
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.users);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState('');
    const [open, setOpen] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {title, content};
        dispatch(createPost(data, auth.token, history, setOpen))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Container>
            <Typography variant="h4" className={classes.title}>
                Ask a public question
            </Typography>

            {post.postErr.msg &&
            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={10000}
                    onClose={handleClose}
                    className={classes.snackbar}
                >
                    <Alert onClose={handleClose} severity="error" className={classes.alert}>
                        {post.postErr.msg}
                    </Alert>
                </Snackbar>
            </div>
            }

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField className={classes.inputs}
                    onChange={(e) => setTitle(e.target.value)}
                    label="Title"
                    name="title"
                    variant="outlined"
                    value={title}
                    required
                    fullWidth
                    error={post.postErr.title}
                />

                <TextField className={classes.inputs}
                    label="Content"
                    multiline
                    rows={10}
                    variant="outlined"
                    required
                    fullWidth
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    error={post.postErr.content}
                />

                <TextField className={classes.inputs}
                           onChange={(e) => setCategories(e.target.value)}
                           label="Categories"
                           name="categories"
                           variant="outlined"
                           value={categories}
                           required
                           fullWidth
                />

                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"

                >
                    Publish your question
                </Button>
            </form>

        </Container>
    );
}

export default CreatePost