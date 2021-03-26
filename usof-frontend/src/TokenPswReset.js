import {useState} from "react";
import { useHistory, useParams } from "react-router-dom";
// import './css/style.css'

const TokenPswReset = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {password, password2};

        let response = await fetch('http://localhost:5000/api/auth/password-reset/'+token, {
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
            await history.push('/login');
        }
    }

    return (
        <div>
            <h1>Input new password</h1>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
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

export default TokenPswReset;