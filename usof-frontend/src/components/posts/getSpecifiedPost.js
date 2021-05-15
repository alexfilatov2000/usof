import {useDispatch, useSelector} from "react-redux";
import {Button, makeStyles, Typography, Box, Avatar, IconButton} from "@material-ui/core";
import {useEffect} from "react";
import {getOnePost, addLike, deleteLike, deletePost} from "../../redux/posts";
import {Link, useHistory, useParams} from "react-router-dom";
import {config} from "../../config";
import {getUsers} from "../../redux/users";
import GetComments from "./getComments";
import WriteComment from "./writeComment";
import {parseJwt} from "../../util/parseToken";

const useStyles = makeStyles((theme) => ({
    votes: {
        textAlign: "center",
        margin: '5px 25px 5px 10px'
    },
    container: {
        margin: '20px 30px',
    },
    sub: {
        margin: '0 30px 15px 0'
    },
    mainSub: {
        marginTop: 10,
        borderBottom: '1px solid #D3D3D3'
    },
    span: {
        color: "black"
    },
    triangle: {
        width: 0,
        height: 0,
        borderLeft: '50px solid transparent',
        borderRight: '50px solid transparent',
        borderBottom: '100px solid red',
    },
    content: {
        margin: 15
    },
    switch: {
        margin: '10px 20px 0 0'
    },
    switchVal: {
        textAlign: 'center'
    },
    image: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        marginRight: 10,
        // border: "1px solid black"
    },
    imgPlace: {
        flex: 1,
        // border: "1px solid black",
        justifyContent: "flex-end",
    },
    categoriesPlace: {
        flex: 1,
        // border: "1px solid black"
    },
    userPlace: {
        backgroundColor: "#dde6ec",
        width: "min-content",
        padding: 10,
        borderRadius: 10
    },
    endPost: {
        borderBottom: '1px solid #D3D3D3',
        paddingBottom: 30,
        marginBottom: 10
    }
}))

const GetSpecifiedPost = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const post = useSelector(state => state.posts);
    const users = useSelector(state => state.users);
    const auth = useSelector(state => state.auth);
    const { id } = useParams();

    const userByToken = parseJwt(auth.token);

    useEffect(() => {
        dispatch(getOnePost(id, auth.token));
        dispatch(getUsers());
    },[])

    const getPostUser = () => {
        return users.users.find(u => u.id === post.specPost.user_id);
    }

    const deletePostFunc = () => {
        dispatch(deletePost(id, auth.token, history))
    }

    const addLikePost = () => {
        dispatch(addLike(id, auth.token))
    }

    const deleteLikePost = () => {
        dispatch(deleteLike(id, auth.token))
    }

    let plusStyle = {color: 'default', variant: 'outlined'};
    if (post.plus) {
        plusStyle.color = 'secondary';
        plusStyle.variant = 'contained';
    }
    let minusStyle = {color: 'default', variant: 'outlined'};
    if (post.minus) {
        minusStyle.color = 'secondary';
        minusStyle.variant = 'contained';
    }


    return (
        <div className={classes.container}>
            {post.specPost &&
                <div>
                    <Box display="flex" style={{justifyContent: "space-between"}}>
                        <Typography variant="h3" >
                            {post.specPost.title}
                        </Typography>

                        {userByToken && (getPostUser().id === userByToken.user.id || userByToken.user.role === 'admin') &&
                        <Button
                            type="submit"
                            color="secondary"
                            variant="contained"
                            onClick={deletePostFunc}
                        >
                            delete post
                        </Button>
                        }
                    </Box>

                    <Box display="flex" className={classes.mainSub}>
                        <Typography variant="body1" color="textSecondary" className={classes.sub}>
                            Asked <span className={classes.span}>*{post.specPost.publish_date}*</span>
                        </Typography>

                        <Typography variant="body1" color="textSecondary" className={classes.sub}>
                            Status <span className={classes.span}>*{post.specPost.status}*</span>
                        </Typography>
                    </Box>


                    <Box display="flex" className={classes.content}>

                        <Box className={classes.switch}>
                            <Button onClick={addLikePost} variant={plusStyle.variant} color={plusStyle.color}>&#8743;</Button>

                            <Typography variant="h6" className={classes.switchVal}>
                                {post.specPost.likesVal}
                            </Typography>

                            <Button onClick={deleteLikePost} variant={minusStyle.variant} color={minusStyle.color}>&#8744;</Button>
                        </Box>

                        <Typography variant="h6" >
                            {post.specPost.content}
                        </Typography>
                    </Box>


                    <Box display="flex" className={classes.endPost}>
                        <Box className={classes.categoriesPlace}>categories</Box>

                        <Box display="flex" className={classes.imgPlace}>

                            <Box display="flex" className={classes.userPlace}>
                                <Avatar className={classes.image} alt="Remy Sharp" src={`${config.url}/${getPostUser().profile_picture}`} />
                                <div>
                                    <Box>
                                        <Link style={{textDecoration: 'none'}} to={'/users/'+getPostUser().id}>{getPostUser().full_name}</Link>
                                    </Box>
                                    <Box>
                                        <Typography variant="body1" color="textSecondary">
                                            rating:{getPostUser().rating}
                                        </Typography>
                                    </Box>
                                </div>
                            </Box>

                        </Box>
                    </Box>

                </div>
            }

            <GetComments post_id={id}/>

            {post.specPost && <WriteComment/>}
        </div>
    );
}

export default GetSpecifiedPost;
