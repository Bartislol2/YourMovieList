import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import "../css/starrating.css"


const StarRating = (props) => {
    const rating = props.rating
    const setRating = props.setRating
    const[hover, setHover] = useState(0)

    return (  
        <div className="star-rating-container">
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                const value = hover>0?hover:rating
                if(value > index) {
                    return (
                            <FaStar
                                key={index} 
                                size={30}
                                onClick={()=>setRating(currentRating)}
                                onMouseEnter={() => setHover(currentRating)}
                                onMouseLeave={()=>setHover(0)}
                            />
                    )
                }
                else {
                    return (
                        <FaRegStar
                            key={index} 
                            size={30}
                            onClick={()=>setRating(currentRating)}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={()=>setHover(0)}
                        />
                )
                }
            })}
        </div>
    );
}
 
export default StarRating;