import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister } from "../redux/users";

const Register = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users)

    const [full_name, setFull_name] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { full_name, login, email, password, password2 };
        dispatch(fetchRegister(user, history));
    }

    return (
        <div>
            <h1>Register</h1>
            {user.error && <div>{user.error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        placeholder="Full Name"
                        value={full_name}
                        onChange={(e) => setFull_name(e.target.value)}
                        required
                    />
                </div>
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
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <div>
                    <input
                        type="password"
                        id="password2"
                        name="password2"
                        placeholder="Confirm Password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                    />
                </div>

                <button>Sent</button>
            </form>
        </div>
    );
}

export default Register;
