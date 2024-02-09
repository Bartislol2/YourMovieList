import "../css/movie.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../components/Modal";
import Review from "../components/Review";
import { FaStar } from "react-icons/fa";

const Movie = () => {
    const[movie, setMovie] = useState(null)
    const[reviews, setReviews] = useState(null)
    const[pendingMovie, setPendingMovie] = useState(true)
    const[pendingReviews, setPendingReviews] = useState(true)
    const[error, setError] = useState(false)
    const[rating, setRating] = useState(null)
    const[pendingRating, setPendingRating] = useState(true)
    const {id} = useParams(); //movieId
    const isLoggedIn = localStorage.getItem("jwtToken")!== null


    useEffect(() => {
        fetch(`insert api url here/movies/${id}`)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            else{
                throw new Error()
            }
        })
        .then(data => {
            setMovie(data)
            setPendingMovie(false)
        })
        .catch(() => {
            setError(true)
            setPendingMovie(false)
        })
    }, []);

    useEffect(() => {
        fetch(`insert api url here/reviews/movies/${id}`)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            else{
                throw new Error()
            }
        })
        .then(data => {
            setReviews(data)
            setPendingReviews(false);
        })
        .catch(() => {
            
        })
    }, []);

    useEffect(() => {
        fetch(`insert api url here/reviews/movies/avg/${id}`)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            else{
                throw new Error()
            }
        })
        .then(data => {
            setRating(data)
            setPendingRating(false);
        })
        .catch(() => {
            
        })
    }, []);

    return ( 
        <div className="movie-display">
            {pendingMovie && <p>Loading...</p>}
            {error && <p>An error has occurred while fetching movie data</p>}
            {!pendingMovie && !error && 
                <div className="movie-info">
                    <img 
                        src={`data:image/jpeg;base64, ${movie.poster}`}
                        className="movie-image" 
                        alt='movie' 
                        title={movie.name}
                    />
                    <div className="movie-description">
                        <p><b>Title: </b>{movie.name}</p>
                        <b>Description: </b>
                        <p>{movie.description}</p>
                        <p><b>Length: </b>{movie.length}</p>
                        <p><b>Released: </b>{movie.releaseDate}</p>
                    </div>
                </div>
            }
            {!pendingMovie && !pendingRating &&
                <div className="rating">
                    <h2>Movie rating: {rating.toFixed(1)}</h2>
                    <FaStar/>
                </div>}
            <div className="reviews-header">
                {!pendingMovie && !error && 
                    <h2>Reviews</h2>
                }
                {isLoggedIn && <Modal movieId={id}/>}
            </div>
            <div className="reviews-display">
                {pendingMovie && pendingReviews && <p>Loading...</p>}
                {!pendingMovie && !pendingReviews && 
                    reviews.map((review)=> (
                        <Review review={review} key={review.id}/>
                    ))
                }
            </div>
        </div>
     );
}
 
export default Movie;