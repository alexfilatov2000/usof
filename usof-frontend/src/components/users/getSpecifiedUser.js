import {useDispatch, useSelector} from "react-redux";
import {Box, makeStyles, Typography} from "@material-ui/core";
import {useEffect} from "react";
import {getOneUser} from "../../redux/users";
import {useParams} from "react-router-dom";
import {config} from "../../config";

const useStyles = makeStyles({
    image: {
        border: "1px solid black",
        padding: 10,
        flex: "1"
    },
    data: {
        border: "1px solid black",
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
    }
})

const GetSpecifiedUser = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getOneUser(id))
    }, [])

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
                    <img src={`${config.url}/${user.specUser.profile_picture}`} alt="icon" />
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
