import { useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchLogin } from "../redux/users";
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.users)

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {login, password};
        dispatch(fetchLogin(user, history));
    }

    return (
        <div>
            <h1 className="second">Login</h1>
            {user.error && <div>{user.error}</div>}
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

export default Login;
