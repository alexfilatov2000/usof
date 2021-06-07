import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {dialogClose, dialogOpen, editIMG, getOneUser} from "../redux/users";
import {parseJwt} from "../util/parseToken";
import {
    Avatar,
    Box, Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles, TextField,
    Typography
} from "@material-ui/core";
import {config} from "../config";
import {useHistory} from "react-router-dom";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
    imgSize: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        border: "1px solid black",
        display: "block",
        margin: "20px auto",
    },

    imgSize2: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        display: "block",
        // margin: "0 auto",
    },
    root: {
        textAlign: "center",
    },
    mainInfo: {
        margin: '40px 100px',
        padding: 40,
        border: "1px solid lightgray",
        textAlign: "left",
        borderRadius: "15px"
    },
    fieldName: {
        display: "flex",
        borderBottom: "1px solid lightgray",
        padding: "20px 0",
        '&:hover': {
            backgroundColor: "#fafafa",
        },
    },
    item: {
        flex: 2
    },
    info: {
        flex: 5
    },
    mainText: {
        marginBottom: 20
    },
    pointer: {
        cursor: "pointer"
    },
    arrow: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: "gray",
        flex: 1
    },
    boxAvatar: {
        flex: 1
    },
    error: {
        color: "red",
        fontWeight: "bold",
        border: "1px solid red",
        borderRadius: 5,
        padding: 5,
        marginBottom: 5
    }
}));

const Home = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users);
    const auth = useSelector(state => state.auth);
    const T = parseJwt(auth.token)
    const [myFile, setMyFile] = useState(null);

    const handleClickOpen = () => {
        dispatch(dialogOpen());
    };

    const handleClose = () => {
        dispatch(dialogClose());
    };

    const editPic = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('upload', myFile);

        dispatch(editIMG(data, auth.token))
    }

    useEffect(() => {
        if (T) dispatch(getOneUser(T.user.id))
    }, []);

    return (
        <div className={classes.root}>
            {user.specUser &&
                <div>
                    <Avatar className={classes.imgSize} variant="circular" alt="Remy Sharp" src={`${config.url}/${user.specUser.profile_picture}`} />
                    <Typography variant="h4">
                        Добро пожаловать, {user.specUser.full_name}
                    </Typography>
                    <div className={classes.mainInfo}>
                        <Typography variant="h5" className={classes.mainText}>
                            Main Information
                        </Typography>

                        <div className={classes.fieldName + ' ' + classes.pointer} onClick={handleClickOpen}>
                            <Typography variant="h6" color="textSecondary" className={classes.item}>
                                Image
                            </Typography>

                            <Typography variant="h6" color="textSecondary" className={classes.info}>
                                An image helps personalize your account
                            </Typography>

                            <Box className={classes.boxAvatar}>
                                <Avatar className={classes.imgSize2} variant="circular" alt="Remy Sharp" src={`${config.url}/${user.specUser.profile_picture}`} />
                            </Box>
                        </div>

                        <Dialog open={user.openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Update Image</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Select profile image
                                </DialogContentText>
                                <input
                                    type="file"
                                    id="upload"
                                    name="upload"
                                    onChange={(e) => setMyFile(e.target.files[0])}
                                    required
                                />

                                {user.error && <div className={classes.error}>{user.error}</div>}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={editPic} color="primary">
                                    Update
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <div className={classes.fieldName + ' ' + classes.pointer} onClick={() => history.push(`change/fullname`)}>
                            <Typography variant="h6" color="textSecondary" className={classes.item}>
                                Full Name
                            </Typography>

                            <Typography variant="h6" className={classes.info}>
                                {user.specUser.full_name}
                            </Typography>

                            <ArrowForwardIosIcon className={classes.arrow}/>
                        </div>

                        <div className={classes.fieldName + ' ' + classes.pointer} onClick={() => history.push(`change/login`)}>
                            <Typography variant="h6" color="textSecondary" className={classes.item}>
                                Login
                            </Typography>

                            <Typography variant="h6" className={classes.info}>
                                {user.specUser.login}
                            </Typography>

                            <ArrowForwardIosIcon className={classes.arrow}/>
                        </div>

                        <div className={classes.fieldName}>
                            <Typography variant="h6" color="textSecondary" className={classes.item}>
                                Email
                            </Typography>

                            <Typography variant="h6" className={classes.info}>
                                {user.specUser.email}
                            </Typography>

                            <ArrowForwardIosIcon className={classes.arrow}/>
                        </div>

                        <div className={classes.fieldName + ' ' + classes.pointer} onClick={() => history.push(`change/password`)}>
                            <Typography variant="h6" color="textSecondary" className={classes.item}>
                                Password
                            </Typography>

                            <Typography variant="h6" className={classes.info}>
                                ********
                            </Typography>

                            <ArrowForwardIosIcon className={classes.arrow}/>
                        </div>

                        <div className={classes.fieldName}>
                            <Typography variant="h6" color="textSecondary" className={classes.item}>
                                Rating
                            </Typography>

                            <Typography variant="h6" className={classes.info}>
                                {user.specUser.rating}
                            </Typography>

                            <ArrowForwardIosIcon className={classes.arrow}/>
                        </div>

                    </div>
                </div>
            }
            {!T &&
                <div style={{marginTop: 20}}>
                    <Typography variant="h4">
                        Please, try to Log In
                    </Typography>

                    <Typography variant="h4">
                        to see your Profile information!
                    </Typography>
                </div>
            }
        </div>
    );
}

export default Home;