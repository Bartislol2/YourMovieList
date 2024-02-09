import "../css/login.css"
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const isLoggedIn = localStorage.getItem("jwtToken") !== null
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState(false);
    const[errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleEnter = (e) => {
        if(e.key === "Enter") {
            handleLogin();
        }
    }

    const handleLogin = () => {
        fetch("insert api url here/auth/login",
        {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
        .then(data => {
            if(!data.status){
                localStorage.setItem('username', data.username)
                localStorage.setItem('jwtToken', data.jwt)
                navigate("/")
            }
            else {
                console.log(data)
                setErrorMessage(data.message)
                setError(true)
            }
        }).catch(err =>{
            setErrorMessage("An error has occurred while trying to log in, please try again")
            setError(true)
        })
    }

    const handleSignUpClick = () => {
        navigate("/signup")
    }
    
    return ( 
        <div className="login-page">
            {!isLoggedIn && <div className="login-form">
                <h2 className="welcome-text">Welcome back! Please log in:</h2>

                <input className="input-username" placeholder="Username" onChange={handleUsernameChange} onKeyDown={handleEnter}/>

                <input type= "password" className="input-password" placeholder="Password" onChange={handlePasswordChange} onKeyDown={handleEnter}/>

                <div className="login-button" onClick={handleLogin}>
                    <p>Login</p>
                 </div>

                <div className="signup-button" onClick={handleSignUpClick}>
                    <p>Sign up</p>
                </div>
                {error && <h2 className="error-text">{errorMessage}</h2>}
            </div>}
            {isLoggedIn && <h2>You're already logged in</h2>}
        </div>
     );
}
 
export default Login;