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
    Container, CircularProgress,
} from '@material-ui/core';
import {useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {config} from "../../config";
import {getAllCategories} from "../../redux/categories";
import {DeleteOutlined} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    votes: {
        textAlign: "center",
        margin: '5px 25px 5px 10px'
    },
    button: {
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
    description: {
        fontSize: 16,
        marginTop: 10,
        //first four lines
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 4,
        wordBreak: "break-all",
        overflow: "hidden"
    },
    root: {
        margin: 20
    },
    questions: {
        fontSize: 16,
        color: '#848d95',
        marginTop: 20
    }
}))

const GetAllCategories = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const category = useSelector(state => state.categories);
    const post = useSelector(state => state.posts);
    const user = useSelector(state => state.users)
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getAllCategories())
    }, [dispatch])

    if (category.categories.length === 0) return(<CircularProgress />)

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {category.categories.map(item => (
                    <Grid item xs={12} md={6} lg={3} key={item.id}>
                        <Card elevation={1}>
                            <CardContent>
                                <Box>
                                    <Button
                                        className={classes.button}
                                        type="submit"
                                        variant="contained"
                                        onClick={() => history.push(`/categories/${item.id}`)}
                                    >
                                        {item.title}
                                    </Button>
                                </Box>

                                <Typography className={classes.description}>
                                    {item.description}
                                </Typography>

                                <div className={classes.questions}>
                                    <div>{item.cntOfPosts}</div>
                                    <div>questions</div>
                                </div>

                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default GetAllCategories;