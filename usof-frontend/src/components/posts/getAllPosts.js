import {useDispatch, useSelector} from "react-redux";
import {Card, CardContent, Grid, IconButton, makeStyles, Typography, Box} from "@material-ui/core";
import {useEffect} from "react";
import {getAllPosts} from "../../redux/posts";
import {DeleteOutlined} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {config} from "../../config";
import {getRole} from "../../util/getRole";
import {getOneUser} from "../../redux/users";

const useStyles = makeStyles({
    votes: {
        textAlign: "center",
        margin: '5px 25px 5px 10px'
    },
    user: {
        marginLeft: 25
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
    content: {
        lineHeight: "1.5em",
        height: "3em",
        overflow: "hidden",
    },
    image: {
        width: 70,
        height: 70,
        border: "1px solid black",
        borderRadius: 15
    },
})

const GetAllPosts = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector(state => state.posts);
    const user = useSelector(state => state.users)
    const auth = useSelector(state => state.auth);

    const role = getRole(auth.token);

    useEffect(() => {
        dispatch(getAllPosts())
        //dispatch(getOneUser(post.))
    }, [dispatch])

    // const func = (id) => {
    //     dispatch(deleteUser(id, auth.token))
    // }

    return (
        <div>
            <Grid container spacing={1}>
                {post.posts.map(item => (
                    <Grid item xs={12} key={item.id}>
                        <Card elevation={1}>
                            <CardContent>
                                <Box display="flex">

                                    <Box >
                                        <div className={classes.votes}>
                                            <Typography variant="h6" color="textSecondary">
                                                {0}
                                            </Typography>

                                            <Typography variant="body1" color="textSecondary">
                                                votes
                                            </Typography>
                                        </div>

                                        <div className={classes.votes}>
                                            <Typography variant="h6" color="textSecondary">
                                                {0}
                                            </Typography>

                                            <Typography variant="body1" color="textSecondary">
                                                answers
                                            </Typography>
                                        </div>
                                    </Box>


                                    <Box className={classes.dataPlace}>
                                        <Typography component="h5" variant="h5" color="textSecondary">
                                            <Link style={{textDecoration: 'none'}} to={'/posts/'+item.id}>{item.title}</Link>
                                        </Typography>

                                        <Typography component="h5" variant="h6" className={classes.content} >
                                            {item.content}
                                        </Typography>
                                    </Box>

                                    <Box className={classes.user}>
                                        <Typography variant="body1" color="textSecondary">
                                            asked by:
                                        </Typography>

                                        <Typography variant="body1" color="textSecondary">
                                            {item.publish_date}
                                        </Typography>

                                        <Box>
                                            <img className={classes.image} src={`${config.url}/${item.user.profile_picture}`} alt="icon" />
                                        </Box>

                                        <Box>
                                            <Link to={'/users/'+item.user_id}>{item.user.full_name}</Link>
                                        </Box>
                                    </Box>

                                    {/*{role === 'admin' &&*/}
                                    {/*<Box>*/}
                                    {/*    <IconButton className={classes.iconPlace} onClick={() => func(item.id)}>*/}
                                    {/*        <DeleteOutlined />*/}
                                    {/*    </IconButton>*/}
                                    {/*</Box>*/}
                                    {/*}*/}

                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </div>
    );
}

export default GetAllPosts;
