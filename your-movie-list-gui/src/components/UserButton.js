import { faCaretDown, faCaretUp, faUser } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/userbutton.css"

const UserButton = () => {
    const username = localStorage.getItem("username")
    const[menuActive, setMenuActive] = useState(false)
    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.clear("jwtToken")
        localStorage.clear("username")
        navigate("/")
    }


    return ( 
        <div className="user-button" title="Profile" onClick={() =>setMenuActive(!menuActive)} onBlur={()=>setMenuActive(!menuActive)}>
            <FontAwesomeIcon icon={faUser}/>
            {!menuActive && <FontAwesomeIcon icon={faCaretDown}/>}
            {menuActive && <FontAwesomeIcon icon={faCaretUp}/>}
            <p>{username}</p>
            {menuActive && <div className="user-menu">
                <div className="user-menu-button" onClick={() => navigate("/profile")}>
                    <p>Profile</p>
                </div>
                <div className="user-menu-button" onClick={handleLogOut}>
                    <p>Log out</p>
                </div>
            </div>}
        </div>

     );
}
 
export default UserButton;