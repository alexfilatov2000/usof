import {useState} from "react";
import { useHistory } from "react-router-dom";
// import './css/style.css'

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {login, password};

        let response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });
        let result = await response.json();
        if(!response.ok){
            setError(result.error);
        } else {
            localStorage.setItem('accessToken', result.accessToken);
            let x = parseJwt(result.accessToken);
            console.log(x);
            await history.push('/');
        }
    }

    return (
        <div>
            <h1 className="second">Login</h1>
            {error && <div>{error}</div>}
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

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

export default Login;