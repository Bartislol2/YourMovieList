import "../css/navbutton.css"
import { useNavigate } from "react-router-dom";

const NavButton = (props) => {
    const text = props.text;
    const navigate = useNavigate();

    const handleClick = () => {
        let path = text.toLowerCase();
        if (path === "home")
            navigate('/')
        else 
            navigate(`/${path}`)
    }
    return (  
        <div className="nav-button" onClick={handleClick}>
            <p>{text}</p>
        </div>
    );
}
 
export default NavButton;