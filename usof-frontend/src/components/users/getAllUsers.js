import {useDispatch, useSelector} from "react-redux";
import {Card, CardHeader, Grid, IconButton, makeStyles} from "@material-ui/core";
import {useEffect} from "react";
import {getUsers} from "../../redux/users";
import {DeleteOutlined} from "@material-ui/icons";
import {Link, useHistory} from "react-router-dom";

const useStyles = makeStyles({
    title: {
        background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 52%, rgba(0,212,255,1) 100%)",
        color: "white",
        margin: "20px 0",
        height: 150
    }
})

const GetAllUsers = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users);
    const history = useHistory();

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return (
        <div>
            <Grid container spacing={3}>
                {user.users.map(item => (
                    <Grid item xs={12} md={6} lg={3} key={item.id}>
                        <Card elevation={1}>

                            <CardHeader
                                action={
                                    <IconButton >
                                        <DeleteOutlined />
                                    </IconButton>
                                }

                                title={<Link to={'/users/'+item.id}>{item.login}</Link>}
                                subheader={item.full_name}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </div>
    );
}

export default GetAllUsers;
