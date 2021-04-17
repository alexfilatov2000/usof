import {useHistory} from "react-router-dom";
import {useState} from "react";

const Home = () => {
    const [myFile, setMyFile] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.dir(myFile);
        const data = new FormData();
        data.append('upload', myFile);

        let response = await fetch('http://localhost:5000/api/users/avatar', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
            method: 'POST',
            body: data
        })
        let result = await response.json();
        console.log(result);
    }


    return (
        <div>
            <h1>Home</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="file"
                        id="upload"
                        name="upload"
                        onChange={(e) => setMyFile(e.target.files[0])}
                        required
                    />
                </div>
                <button>Sent</button>
            </form>
        </div>
    );
}

export default Home;