import { Link } from "react-router-dom";
import { fetchLogOut } from "../redux/actions/userActions";
import { connect } from 'react-redux'

const LogOut = ({fetchLogOut}) => {
    const handleSubmit = () => {
        fetchLogOut();
    }

    return (
        <div>
            <Link to="/" onClick={handleSubmit}>Log out</Link>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        fetchLogOut: () => dispatch(fetchLogOut())
    }
}

export default connect(null, mapDispatchToProps)(LogOut);
