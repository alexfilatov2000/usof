import {useDispatch, useSelector} from "react-redux";
import {Card, CardHeader, Grid, IconButton, makeStyles} from "@material-ui/core";
import {useEffect} from "react";
import {getOneUser} from "../../redux/users";
import {DeleteOutlined} from "@material-ui/icons";
import {useParams} from "react-router-dom";

const useStyles = makeStyles({
    title: {
        background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 52%, rgba(0,212,255,1) 100%)",
        color: "white",
        margin: "20px 0",
        height: 150
    }
})

const GetSpecifiedUser = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getOneUser(id))
    }, [])

    console.log(user);
    return (
        <div>
            {user.specUser &&
            <div>
                {user.specUser.login}<br/>
                {user.specUser.email}<br/>
                {user.specUser.full_name}
            </div>
            }
        </div>
    );
}

export default GetSpecifiedUser;
