import {useDispatch, useSelector} from "react-redux";
import {Card, CardContent, Grid, makeStyles, Typography, Box, Avatar, Button} from "@material-ui/core";
import {useEffect} from "react";
import posts, {getAllPosts} from "../../redux/posts";
import {Link, useHistory} from "react-router-dom";
import {config} from "../../config";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
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
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    questions: {
        justifyContent: "space-between",
        margin: 20
    }
}))

const GetAllPosts = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const post = useSelector(state => state.posts);
    const user = useSelector(state => state.users)
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    // const getAnswers = async (id) => {
    //     const comments = await axios.get(`${config.url}/api/posts/${id}/comments`);
    //     return comments.data.length;
    // }



    return (
        <div>
            <Box display="flex" className={classes.questions}>
                <Typography variant="h4" >
                    All Questions
                </Typography>

                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    onClick={() => history.push('postAsk')}
                >
                    ask Question
                </Button>

            </Box>
            <Grid container spacing={1}>
                {post.posts.map(item => (
                    <Grid item xs={12} key={item.id}>
                        <Card elevation={1}>
                            <CardContent>
                                <Box display="flex">

                                    <Box >
                                        <div className={classes.votes}>
                                            <Typography variant="h6" color="textSecondary">
                                                {item.likesCnt}
                                            </Typography>

                                            <Typography variant="body1" color="textSecondary">
                                                votes
                                            </Typography>
                                        </div>

                                        <div className={classes.votes}>
                                            <Typography variant="h6" color="textSecondary">
                                                {item.commentsCnt}
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
                                            <Avatar className={classes.image} alt="Remy Sharp" src={`${config.url}/${item.user.profile_picture}`} />
                                        </Box>

                                        <Box>
                                            <Link to={'/users/'+item.user_id}>{item.user.full_name}</Link>
                                        </Box>
                                    </Box>

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
