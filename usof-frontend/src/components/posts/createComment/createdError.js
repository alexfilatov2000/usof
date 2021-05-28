import {makeStyles, Snackbar} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";
import {closeCommentError} from "../../../redux/posts";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    snackbar: {
        position: "fixed",
        left: 'calc(50% + 120px)',
    },
    alert: {
        fontSize: 30
    }
}));

const CreatedError = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector(state => state.posts);

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(closeCommentError());
    };

    return (
        <div>
            <Snackbar
                open={post.openCommentError}
                autoHideDuration={10000}
                onClose={handleCloseError}
                className={classes.snackbar}
            >
                <Alert onClose={handleCloseError} severity="error" className={classes.alert}>
                    {post.error}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default CreatedError