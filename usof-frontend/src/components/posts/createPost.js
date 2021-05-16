import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Typography, Container, TextField, Button, makeStyles, Snackbar} from "@material-ui/core";
import {useEffect, useState} from "react";
import {createPost} from "../../redux/posts";
//import {Alert} from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert";
import {Autocomplete} from "@material-ui/lab";
import {getAllCategories} from "../../redux/categories";

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
    const category = useSelector(state => state.categories);
    const user = useSelector(state => state.users);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(true);

    console.log(categories)

    useEffect(() => {
        dispatch(getAllCategories())
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();

        const categoriesData = categories.map(c => c.title);
        const data = { title, content, categories: categoriesData };
        dispatch(createPost(data, auth.token, history, setOpen, categoriesData))
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

                <Autocomplete className={classes.inputs}
                    multiple
                    onChange={(e, value) => setCategories(value)}
                    id="tags-standard"
                    options={category.categories}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Categories"
                            name="categories"
                            error={post.postErr.categories}
                            fullWidth
                        />
                    )}
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