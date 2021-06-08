import {useDispatch, useSelector} from "react-redux";
import {Avatar, Box, Button, makeStyles, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import {getOneUser, editIMG} from "../../redux/users";
import {useHistory, useParams} from "react-router-dom";
import {config} from "../../config";
import {compareIds} from "../../util/compareIds";

const useStyles = makeStyles((theme) =>({
    image: {
        padding: 10,
        flex: "1",
        marginRight: 15
    },
    data: {
        padding: 10,
        flex: "4"
    },
    admin: {
        color: "red",
        display: "inline",
        verticalAlign: "super"
    },
    notVerified: {
        color: "red",
    },
    imgSize: {
        width: theme.spacing(40),
        height: theme.spacing(40),
        border: "1px solid black",
    },
    error: {
        color: "red",
        fontWeight: "bold",
        border: "1px solid red",
        borderRadius: 5,
        padding: 5,
        marginBottom: 5
    }
}))

const GetSpecifiedUser = () => {
    const [myFile, setMyFile] = useState(null);

    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users);
    const auth = useSelector(state => state.auth);
    const history = useHistory();

    const { id } = useParams();
    const edit = compareIds(auth.token, id)

    useEffect(() => {
        dispatch(getOneUser(id))
    }, []);


    const admin = (
        <div style={{display: "inline"}}>
            <Typography variant="h5" className={classes.admin}>
                &nbsp; *admin*
            </Typography>
        </div>
    );

    const notVerified = (
        <div>
            <Typography variant="h6" className={classes.notVerified}>
                User is <b>Not Verified!</b>
            </Typography>
        </div>
    );

    return (
        <div >
            {user.specUser &&
            <Box display="flex" flexDirection="row" p={1} m={1}>
                <Box className={classes.image}  p={1}>
                    <Avatar className={classes.imgSize} variant="rounded" alt="Remy Sharp" src={`${config.url}/${user.specUser.profile_picture}`} />
                </Box>

                <Box className={classes.data}  p={1}>

                    <Typography variant="h3">
                        {user.specUser.full_name}
                        {user.specUser.role === 'admin' && admin}
                    </Typography>
                    <br/>
                    <Typography variant="h5" >
                        login: {user.specUser.login}
                    </Typography>

                    <Typography variant="h5" >
                        email: {user.specUser.email}
                    </Typography>
                    <br/>
                    <Typography variant="h5" color="textSecondary">
                        Rating: {user.specUser.rating}
                    </Typography>
                    <br/>
                    {!user.specUser.isVerified && notVerified}
                </Box>

            </Box>
            }
        </div>
    );
}

export default GetSpecifiedUser;
