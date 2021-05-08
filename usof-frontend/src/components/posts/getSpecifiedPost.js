import {useDispatch, useSelector} from "react-redux";
import {Button, makeStyles, Typography, Box} from "@material-ui/core";
import {useEffect} from "react";
import {getOnePost} from "../../redux/posts";
import {DeleteOutlined} from "@material-ui/icons";
import {Link, useHistory, useParams} from "react-router-dom";
import {config} from "../../config";
import {getRole} from "../../util/getRole";
import {getOneUser} from "../../redux/users";

const useStyles = makeStyles({
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
    }

})

const GetSpecifiedPost = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector(state => state.posts);
    const auth = useSelector(state => state.auth);
    const { id } = useParams();

    const role = getRole(auth.token);

    useEffect(() => {
        dispatch(getOnePost(id))
    }, [dispatch])


    return (
        <div className={classes.container}>
            {post.specPost &&
                <div>
                    <Typography variant="h3" >
                        {post.specPost.title}
                    </Typography>

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
                            <Button variant="outlined" color="default">&#8743;</Button>

                            <Typography variant="h6" className={classes.switchVal}>
                                12
                            </Typography>

                            <Button variant="outlined" color="default">&#8744;</Button>
                        </Box>

                        <Typography variant="h6" >
                            {post.specPost.content}
                        </Typography>
                    </Box>

                </div>
            }
        </div>
    );
}

export default GetSpecifiedPost;
