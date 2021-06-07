import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLogOut } from "../../redux/auth";
import {removeSpecUser} from "../../redux/users";

const LogOut = () => {
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(fetchLogOut())
        dispatch(removeSpecUser())
    }

    return (
        <div>
            <Link to="/" onClick={handleSubmit}>Log out</Link>
        </div>
    );
}

export default LogOut;
