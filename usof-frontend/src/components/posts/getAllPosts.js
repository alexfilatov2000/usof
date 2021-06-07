import {useDispatch, useSelector} from "react-redux";
import {Card, CardContent, Grid, makeStyles, Typography, Box, Avatar, Button} from "@material-ui/core";
import {useEffect, useState} from "react";
import posts, {getAllPosts} from "../../redux/posts";
import {Link, useHistory} from "react-router-dom";
import {config} from "../../config";
import {Pagination} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    votes: {
        textAlign: "center",
        margin: '5px 25px 5px 10px'
    },
    user: {
        display: "flex",
        justifyContent: "flex-end",
        paddingLeft: 25,
    },
    userIn: {
        padding: '10px 15px',
        border: '1px solid lightgray',
        backgroundColor: "#e1ecf4",
        borderRadius: 15
    },
    imgPlace: {
        flex: 2,
    },
    dataPlace: {
        flex: 3,
        paddingRight: 25
    },
    iconPlace: {
        flex: 1
    },
    content: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 2,
        wordBreak: "break-all",
        overflow: "hidden"
    },
    image: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    questions: {
        justifyContent: 'space-between',
        margin: 20
    },
    root: {
        margin: 30
    },
    data: {
        flex: 5
    },
    avatar: {
        paddingRight: 10
    },
    categoriesArr: {
        marginRight: 10,
        fontSize: 14,
        height: 25,
        textTransform: "lowercase",
        color: "#39739d",
        backgroundColor: "#e1ecf4",
        '&:hover': {
            backgroundColor: "#d1e5f1",
            color: "#2c5777",
        },
    },
    category: {
        marginTop: 20
    },
    page: {
        marginTop: 10
    }
}))

const GetAllPosts = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const post = useSelector(state => state.posts);
    const user = useSelector(state => state.users)
    const auth = useSelector(state => state.auth);
    const take = 5;

    const [page, setPage] = useState(1);
    console.log(page);

    const handleChange = (event, value) => {
        setPage(value);
        const skip = value * take - take;

        dispatch(getAllPosts(take, skip))
    };

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    return (
        <div className={classes.root}>
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
            <Grid container spacing={2}>
                {post.posts.map(item => (
                    <Grid item xs={12} key={item.id}>
                        <Card elevation={1}>
                            <CardContent>
                                <Box display="flex">

                                    <Box display="flex" className={classes.data}>
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

                                            <Box display="flex" className={classes.category}>
                                                {item.categories.map(c => (
                                                    <Button
                                                        className={classes.categoriesArr}
                                                        type="submit"
                                                        variant="contained"
                                                        key={c.id}
                                                        onClick={() => history.replace(`/categories/${c.id}`)}
                                                    >
                                                        {c.title}
                                                    </Button>
                                                ))}
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className={classes.user} >
                                    <div className={classes.userIn}>
                                        <Typography variant="body1" color="textSecondary">
                                            asked {item.publish_date}
                                        </Typography>

                                        <Box display="flex">

                                            <Box className={classes.avatar}>
                                                <Avatar className={classes.image} alt="Remy Sharp" src={`${config.url}/${item.user.profile_picture}`} />
                                            </Box>

                                            <Box>
                                                <Link to={'/users/'+item.user_id}>{item.user.full_name}</Link>
                                                <Typography variant="body1" color="textSecondary">
                                                    rating: {item.user.rating}
                                                </Typography>
                                            </Box>
                                        </Box>

                                    </div>

                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {post.posts.length > 0 &&
            <div className={classes.page}>
                <Pagination count={Math.ceil(post.pageLength/take)} page={page} onChange={handleChange}/>
            </div>
            }

        </div>
    );
}

export default GetAllPosts;
