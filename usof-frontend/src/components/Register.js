import { useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchRegister } from "../redux/actions/userActions";
import { connect } from "react-redux";

const Register = ({userData, fetchRegister}) => {
    const [full_name, setFull_name] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { full_name, login, email, password, password2};
        fetchRegister(user, history);
    }

    return (
        <div>
            <h1>Register</h1>
            {userData.error && <div>{userData.error}</div>}
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
const mapStateToProps = state => {
    return {
        userData: state.user_login
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchRegister: (user, history) => dispatch(fetchRegister(user, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
