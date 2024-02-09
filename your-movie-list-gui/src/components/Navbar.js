import {useState} from 'react'
import '../css/navbar.css';
import NavButton from './NavButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilm, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

import UserButton from './UserButton';

function Navbar() {
    const[userInput, setUserInput] = useState("");
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("jwtToken")!== null
    

    const handleChange = (e) => {
        setUserInput(e.target.value)
    }

    const handleSearch = () => {
        if(userInput!== ""){
            navigate(`/results?query=${userInput}`)
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            handleSearch()
        }
    }


    return (
        <nav className = "navbar">
            <FontAwesomeIcon icon={faFilm} className='film-icon'/>
            <h1 className='page-title' onClick={()=>navigate("/")}>
                Your movie list
            </h1>
            <input 
                placeholder="Search for a movie/series" 
                id="userSearch"
                name="userSearch"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className='user-input'
                >
            </input>

            <FontAwesomeIcon 
                icon={faMagnifyingGlass} 
                className='search-icon'
                title="Search"
                onClick={handleSearch}/>
            <div className="buttons">
                <NavButton text="Home"/>
                {!isLoggedIn && <NavButton text="Login"/>}
                {isLoggedIn && <UserButton/>}
            </div>
        </nav>
    );
}

export default Navbar;