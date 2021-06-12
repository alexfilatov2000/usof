import {useDispatch, useSelector} from "react-redux";
import { CircularProgress, makeStyles, Typography } from '@material-ui/core';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import {useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import {config} from "../../config";
import {getPostsByCategory, getSpecCategory} from "../../redux/categories";
import GetPostsByCategory from "./getPostsByCategory";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 20
    },
    span: {
        fontFamily: "",
        color: "red"
    },
    description: {
        fontSize: 20,
        marginTop: 20,
        // border: '1px solid black',
    },
    iconPlace: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        color: 'lightgray',
        verticalAlign: "middle"
    },
    question: {
        borderBottom: '1px solid lightgray',
        paddingBottom: 25
    }
}))

const GetSpecifiedCategory = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const category = useSelector(state => state.categories);
    const post = useSelector(state => state.posts);
    const user = useSelector(state => state.users)
    const auth = useSelector(state => state.auth);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getSpecCategory(id));
        dispatch(getPostsByCategory(id));
    }, [dispatch])

    return (
        <div className={classes.root}>
            {category.specCategory &&
            <div>
                <div className={classes.question}>
                    <Typography variant="h4" >
                        Questions tagged *<span className={classes.span}>{category.specCategory.title}</span>*
                    </Typography>

                    <Typography className={classes.description} >
                        {category.specCategory.description}
                    </Typography>

                    <div className={classes.description} >
                        <QuestionAnswerIcon className={classes.iconPlace}/>
                        <span style={{ color: '#848d95' }}> {category.postsByCategory.length} questions</span>
                    </div>
                </div>

                <GetPostsByCategory/>
            </div>
            }
        </div>
    );
}

export default GetSpecifiedCategory;