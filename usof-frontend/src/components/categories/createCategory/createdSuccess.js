import {makeStyles, Snackbar} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {closeSuccess} from "../../../redux/categories";
import MuiAlert from "@material-ui/lab/Alert";

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
    const category = useSelector(state => state.categories);

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(closeSuccess())
    };

    return (
        <div>
            <Snackbar
                open={category.openSuccess}
                autoHideDuration={10000}
                onClose={handleCloseSuccess}
                className={classes.snackbar}
            >
                <Alert onClose={handleCloseSuccess} severity="success" className={classes.alert}>
                    Category Successfully Created
                </Alert>
            </Snackbar>
        </div>
    );
}

export default CreatedSuccess