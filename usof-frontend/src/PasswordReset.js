import {useState} from "react";
import { useHistory } from "react-router-dom";
// import './css/style.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {email};
        await setIsPending(true);
        let response = await fetch('http://localhost:5000/api/auth/password-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });
        await setIsPending(false);
        if(!response.ok){
            setError('Email not found');
        } else {
            await history.push('/login');
        }
    }

    return (
        <div>
            <h1>password-reset</h1>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
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

                {!isPending && <button>Sent</button>}
                {isPending && <button disabled>Loading...</button>}
            </form>
        </div>
    );
}

export default Login;