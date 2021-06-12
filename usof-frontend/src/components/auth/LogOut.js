import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { fetchLogOut } from "../../redux/auth";
import {removeSpecUser} from "../../redux/users";
import { Button } from '@material-ui/core';

const LogOut = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = () => {
        dispatch(fetchLogOut());
        dispatch(removeSpecUser());
        history.push('/');
    }

    return (
        <div>
            <Button
                onClick={handleSubmit}
                type="submit"
                color="secondary"
                variant="contained"
                fullWidth
            >
                Log out
            </Button>
        </div>
    );
}

export default LogOut;
