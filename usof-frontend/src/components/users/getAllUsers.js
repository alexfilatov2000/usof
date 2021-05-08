import {useDispatch, useSelector} from "react-redux";
import {Card, CardContent, Grid, IconButton, makeStyles, Typography, Box} from "@material-ui/core";
import {useEffect} from "react";
import {getUsers, deleteUser} from "../../redux/users";
import {DeleteOutlined} from "@material-ui/icons";
import {Link, useHistory} from "react-router-dom";
import {config} from "../../config";
import {getRole} from "../../util/getRole";

const useStyles = makeStyles({
    image: {
        width: 70,
        height: 70,
        border: "1px solid black",
        borderRadius: 100

    },
    imgPlace: {
        flex: 2,
    },
    dataPlace: {
        flex: 3
    },
    iconPlace: {
        flex: 1
    },
})

const GetAllUsers = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users);
    const auth = useSelector(state => state.auth);
    const history = useHistory();

    const role = getRole(auth.token);

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    const func = (id) => {
        dispatch(deleteUser(id, auth.token))
    }

    return (
        <div>
            <Grid container spacing={3}>
                {user.users.map(item => (
                    <Grid item xs={12} md={6} lg={3} key={item.id}>
                        <Card elevation={1}>
                            <CardContent>
                                <Box display="flex">
                                    <Box className={classes.imgPlace}>
                                        <img className={classes.image} src={`${config.url}/${item.profile_picture}`} alt="icon" />
                                    </Box>

                                    <Box className={classes.dataPlace}>
                                        <Typography component="h5" variant="h5" color="textSecondary">
                                            {/*<Link to={'/users/'+item.id}>{item.full_name}</Link>*/}
                                            <Link onClick={() => history.push(`/users/${item.id}`)}>{item.full_name}</Link>
                                        </Typography>

                                        <Typography component="h5" variant="h6" color="textSecondary">
                                            {item.login}
                                        </Typography>
                                    </Box>

                                    {role === 'admin' &&
                                        <Box>
                                            <IconButton className={classes.iconPlace} onClick={() => func(item.id)}>
                                                <DeleteOutlined />
                                            </IconButton>
                                        </Box>
                                    }

                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </div>
    );
}

export default GetAllUsers;
