import {makeStyles, Snackbar} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";
import {closeCommentSuccess} from "../../../redux/posts";

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

const CreatedSuccess = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector(state => state.posts);

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(closeCommentSuccess())
    };

    return (
        <div>
            <Snackbar
                open={post.openCommentSuccess}
                autoHideDuration={10000}
                onClose={handleCloseSuccess}
                className={classes.snackbar}
            >
                <Alert onClose={handleCloseSuccess} severity="success" className={classes.alert}>
                    Comment Successfully Created
                </Alert>
            </Snackbar>
        </div>
    );
}

export default CreatedSuccess