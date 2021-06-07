import {useDispatch, useSelector} from "react-redux";
import {Avatar, Box, Button, makeStyles, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import {getOneUser, editIMG} from "../../redux/users";
import {useHistory, useParams} from "react-router-dom";
import {config} from "../../config";
import {compareIds} from "../../util/compareIds";

const useStyles = makeStyles((theme) =>({
    image: {
        // border: "1px solid black",
        padding: 10,
        flex: "1",
        marginRight: 40
    },
    data: {
        //border: "1px solid black",
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


    const editPic = (e) => {
        e.preventDefault();
        console.dir(myFile);

        const data = new FormData();
        data.append('upload', myFile);
        console.log(data)

        dispatch(editIMG(data, auth.token))

    }

    useEffect(() => {
        console.log(id);
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
            {/*{user.isPending && <div>загрузка</div>}*/}
            {user.specUser &&
            <Box display="flex" flexDirection="row" p={1} m={1}>
                <Box className={classes.image}  p={1}>
                    {/*<img src={`${config.url}/${user.specUser.profile_picture}`} alt="icon" className={classes.imgSize}/>*/}
                    <Avatar className={classes.imgSize} variant="rounded" alt="Remy Sharp" src={`${config.url}/${user.specUser.profile_picture}`} />
                    {user.error && <div className={classes.error}>{user.error}</div>}
                    {edit &&
                    <form onSubmit={editPic}>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
                            <input
                                hidden
                                type="file"
                                id="upload"
                                name="upload"
                                onChange={(e) => setMyFile(e.target.files[0])}
                                required
                            />
                        </Button>

                        {!myFile ? (
                            <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                                fullWidth
                                disabled
                            >
                                Edit
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                                fullWidth
                            >
                                Edit
                            </Button>
                        ) }
                    </form>
                    }
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
