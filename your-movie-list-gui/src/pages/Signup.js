import { useState, useEffect } from "react";
import "../css/login.css"

const Signup = () => {
    const isLoggedIn = localStorage.getItem("jwtToken") !== null
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const[passwordRepeat, setPasswordRepeat] = useState("")
    const[error, setError] = useState(false)
    const[errorMessage, setErrorMessage] = useState("")
    const[buttonStyle, setButtonStyle] = useState("create-account-button-disabled")
    const[disabled, setDisabled] = useState(true)
    const[registerDone, setRegisterDone] = useState(false)

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handlePasswordRepeatChange = (e) => {
        setPasswordRepeat(e.target.value);
    }

    const handleEnter = (e) => {
        if(e.key === "Enter") {
            handleCreateAccount();
        }
    }

    const handleCreateAccount = () => {
        if(!disabled) {
            if(password === passwordRepeat) {
                fetch("insert api url here/auth/register", {
                    method: "POST", 
                    body: JSON.stringify(
                        {
                            username: username,
                            password: password,
                            active: 1
                        }
                    ),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(response => response.json())
                .then(data => {
                    if(!data.status) {
                        setRegisterDone(true)
                    }
                    else {
                        console.log(data)
                        setErrorMessage(data.message)
                        setError(true)
                    }
                }).catch(() => {
                    setErrorMessage("An error has occurred while creating the account, please try again later.")
                    setError(true)
                })
            }
            else {
                setErrorMessage("The passwords don't match")
                setError(true)
            }
        }
    }

    useEffect(() => {
        if(username!==""&&password!==""&&passwordRepeat!=="") {
           setButtonStyle("create-account-button")
           setDisabled(false)
        }
        else {
            setButtonStyle("create-account-button-disabled");
            setDisabled(true)
        }
    }, [username, password, passwordRepeat])



    return (  
        <div className="login-page">
            
            {!registerDone && !isLoggedIn && (
                <div className="login-form">

                    <h2 className="welcome-text">Please enter your info:</h2>

                    <input className="input-username" placeholder="Username" onChange={handleUsernameChange}/>

                    <input type= "password" className="input-password" placeholder="Password" onChange={handlePasswordChange} onKeyDown={handleEnter}/>

                    <input type= "password" className="input-password" placeholder="Repeat your password" onChange={handlePasswordRepeatChange} onKeyDown={handleEnter}/>


                    <div className={buttonStyle} onClick={handleCreateAccount}>
                        <p>Create account</p>
                    </div>

                    {error && <h2 className="error-text">{errorMessage}</h2>}

                </div>
            )}

            {registerDone && !isLoggedIn && 
                <h2 className="success-text">Account created successfully, please <a href="/login">log in</a></h2>
            }
            {isLoggedIn && <h2>You're already logged in</h2>}

        </div>
    );
}
 
export default Signup;