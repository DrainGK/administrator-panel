import { Link } from "react-router-dom";
import "./register.css"
import { useState } from "react";
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {

            const res = await axios.post("http://localhost:5000/api/auth/register", {
                username,
                email,
                password,
            });
            res.data && window.location.replace("/login");
        } catch (err){

            setError(true)
        }
            
    }
    return (
        <div className='register'>
            <span className="register-title">register</span>
            <form className="register-form" onSubmit={handleSubmit}>
                <label>User name</label>
                <input className="register-input" type="text" placeholder="Enter your user name" 
                onChange={e=>setUsername(e.target.value)}/>
                <label>Email</label>
                <input className="register-input" type="text" placeholder="Enter your email"
                onChange={e=>setEmail(e.target.value)} />
                <label>Password</label>
                <input className="register-input" type="password" placeholder="Enter your password"
                onChange={e=>setPassword(e.target.value)} />
                <button className="register-button" type="submit">register</button>
                <button className="login-button">
                    <Link className="link" to="/login">
                        Login
                    </Link>
                </button>
                { error && <span style={{color: "red", margin: "10px auto"}}>Something went wrong!</span>}
            </form>
        </div>
    );
};

export default Register;