import { useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchLogin } from "./redux/actions/userActions";
import { connect } from 'react-redux'

const Login = ({userData, fetchLogin}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {login, password};
        fetchLogin(user, history);
    }

    return (
        <div>
            <h1 className="second">Login</h1>
            {userData.error && <div>{userData.error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        id="login"
                        name="login"
                        placeholder="Login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button>Sent</button>
            </form>
        </div>
    );
}


const mapStateToProps = state => {
    return {
        userData: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchLogin: (user, history) => dispatch(fetchLogin(user, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
