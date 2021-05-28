import {useDispatch, useSelector} from "react-redux";
import {Avatar, Box, Button, Card, CardContent, Grid, IconButton, makeStyles, Typography} from "@material-ui/core";
import {addLikeToComment, deleteCommentById, deleteLikeToComment} from "../../redux/posts";
import {config} from "../../config";
import {Link} from "react-router-dom";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {parseJwt} from "../../util/parseToken";

const useStyles = makeStyles((theme) => ({
    switchVal: {
        textAlign: 'center'
    },
    comment: {
        marginLeft: 20,
        width: '100%',
        // border: "1px solid black"
    },
    answer: {
        margin: '30px 0'
    },
    image: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        marginRight: 10,
        // border: "1px solid black"
    },
    user: {
        display: "flex",
        justifyContent: "flex-end",
        paddingLeft: 25,
    },
    userIn: {
        padding: '10px 15px',
        border: '1px solid lightgray',
        backgroundColor: "#ffedcc",
        borderRadius: 15
    },
    mainContent: {
        justifyContent: "space-between"
    }
}));

const GetComments = ({ post_id }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector(state => state.posts);
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.users);

    const Token = parseJwt(auth.token);

    const addLikeComment = (id) => {
        dispatch(addLikeToComment(id, post_id, auth.token, post.comments))
    }

    const deleteLikeComment = (id) => {
        dispatch(deleteLikeToComment(id, post_id, auth.token, post.comments))
    }

    const getCommentUser = (item) => {
        return user.users.find(u => u.id === item.user_id);
    }

    const deleteComment = (id) => {
        dispatch(deleteCommentById(id, auth.token));
    }

    if (post.comments.length === 0) return (<div>No comments yet</div>);
    return (
        <div>
            {post.comments.length !== 0 &&
            <Typography variant="h4" className={classes.answer}>
                {post.comments.length} Answers
            </Typography>
            }

            <Grid container spacing={2}>
            {post.comments.map(item => (
                <Grid item xs={12} key={item.id} >
                    <Card elevation={1}>
                        <CardContent>
                            <Box display="flex">
                                <Box >
                                    {item.plus &&
                                        <Button onClick={() => addLikeComment(item.id)} variant="contained" color="primary">&#8743;</Button>
                                    }
                                    {!item.plus &&
                                    <Button onClick={() => addLikeComment(item.id)} variant="contained" color="default">&#8743;</Button>
                                    }

                                    <Typography variant="h6" className={classes.switchVal}>
                                        {item.likesCnt}
                                    </Typography>


                                    {item.minus &&
                                        <Button onClick={() => deleteLikeComment(item.id)} variant="contained" color="primary">&#8744;</Button>
                                    }
                                    {!item.minus &&
                                    <Button onClick={() => deleteLikeComment(item.id)} variant="contained" color="default">&#8744;</Button>
                                    }
                                </Box>

                                <Box className={classes.comment}>

                                    <Box display="flex" className={classes.mainContent}>
                                        <Typography variant="h6">
                                            {item.content}
                                        </Typography>

                                        {Token && (Token.user.id === item.user_id || Token.user.role === 'admin') &&
                                            <IconButton aria-label="more" onClick={() => deleteComment(item.id)}>
                                                <DeleteOutlineIcon/>
                                            </IconButton>
                                        }
                                    </Box>

                                    <Box display="flex" className={classes.user}>
                                        <div className={classes.userIn}>
                                            <Typography variant="body2">
                                                {item.publish_date}
                                            </Typography>

                                            <Box display="flex">
                                                <Avatar className={classes.image} alt="Remy Sharp" src={`${config.url}/${getCommentUser(item).profile_picture}`} />

                                                <Box>
                                                    <Link style={{textDecoration: 'none'}} to={'/users/'+getCommentUser(item).id}>{getCommentUser(item).full_name}</Link>
                                                    <Typography variant="body1" color="textSecondary">
                                                        rating:{getCommentUser(item).rating}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                        </div>
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

export default GetComments;