import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../css/review.css"

const Review = (props) => {
    const review = props.review
    const navigate = useNavigate()
    return ( 
        <div className="review-container" onClick={()=>navigate(`/review/${review.id}`)}>
            <div className="rating-bar">
                <FaStar/>
                <p>{review.rating}/5</p>
            </div>
            <b>By {review.username}</b>
            <div className="review-text">
                <p>{review.review}</p>
            </div>

        </div>
     );
}
 
export default Review;