import "../css/ReviewPage.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ReviewPage = () => {
    const {id} = useParams(); //reviewId
    const[review, setReview] = useState(null)
    const[pending, setPending] = useState(true)
    const[error, setError] = useState(false)
    const[errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        fetch(`insert api url here/reviews/${id}`)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            else if(response.status === 400) {
                setError(true)
                setErrorMessage("Review does not exist")
                setPending(false)
            }
        })
        .then(data => {
            setReview(data)
            setPending(false)
        })
        .catch(() => {
            setError(true)
            setErrorMessage("An error has occurred while fetching the review")
            setPending(false)
        })
    }, []);

    return (
        <div className="full-review-content">
            {pending && <p>Loading...</p>}
            {!pending && error && <p>{errorMessage}</p>}
            {!pending && !error &&
                <div className="review-content">
                    <h2>Author: {review.username}</h2>
                    <h2>Movie: {review.movieName}</h2>
                    <div className="review-rating">
                        <h2>Rating: {review.rating.toFixed(1)}</h2>
                        <FaStar className="star-icon"/>
                    </div>
                    <div className="review-content-text">
                        <h2>Review: </h2>
                        <p>{review.review}</p>
                    </div>
                </div> 
            }
        </div>  
    );
}
 
export default ReviewPage;