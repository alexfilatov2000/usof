import {useDispatch, useSelector} from "react-redux";
import {
    Card,
    CardContent,
    Grid,
    IconButton,
    makeStyles,
    Typography,
    Box,
    Avatar,
    CircularProgress,
} from '@material-ui/core';
import {useEffect} from "react";
import {getUsers, deleteUser} from "../../redux/users";
import {DeleteOutlined} from "@material-ui/icons";
import {Link, useHistory} from "react-router-dom";
import {config} from "../../config";
import {getRole} from "../../util/getRole";

const useStyles = makeStyles((theme) => ({
    image: {
        width: theme.spacing(9),
        height: theme.spacing(9),
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
    card: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        width: '100%',
    },
    root: {
        margin: 25
    }
}));

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
        dispatch(deleteUser (id, auth.token))
    }

    if (user.users.length === 0) return(<CircularProgress />)

    return (
        <div className={classes.root}>
            <Grid container spacing={3} alignItems="stretch">
                {user.users.map(item => (
                    <Grid item xs={12} md={6} lg={3} key={item.id} style={{display: 'flex'}}>
                        <Card elevation={1} className={classes.card}>
                            <CardContent>
                                <Box display="flex">
                                    <Box className={classes.imgPlace}>
                                        <Avatar className={classes.image} alt="Remy Sharp" src={`${config.url}/${item.profile_picture}`} />
                                    </Box>

                                    <Box className={classes.dataPlace}>
                                        <Typography component="h5" variant="h5" color="textSecondary">
                                            <Link style={{textDecoration: 'none'}} to={'/users/'+item.id}>{item.full_name}</Link>
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
