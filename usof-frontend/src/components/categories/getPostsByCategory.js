import {useDispatch, useSelector} from "react-redux";
import {
    Card,
    CardContent,
    Grid,
    makeStyles,
    Typography,
    Box,
    Avatar,
    Button,
    IconButton,
    Container
} from "@material-ui/core";
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import {useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {config} from "../../config";
import {getPostsByCategory, getSpecCategory} from "../../redux/categories";
import {DeleteOutlined} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 20
    },
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
    avatar: {
        paddingRight: 10
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
        justifyContent: "space-between",
        margin: 20
    }
}))

const GetPostsByCategory = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const category = useSelector(state => state.categories);
    const post = useSelector(state => state.posts);
    const user = useSelector(state => state.users)
    const auth = useSelector(state => state.auth);

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                {category.postsByCategory.map(item => (
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
                                </Box>

                                <Box className={classes.user}>
                                    <div className={classes.userIn}>
                                        <Typography variant="body1" color="textSecondary">
                                            {item.publish_date}
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

        </div>
    );
}

export default GetPostsByCategory;