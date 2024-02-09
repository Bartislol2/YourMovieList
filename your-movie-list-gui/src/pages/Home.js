import '../css/home.css'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Home() {
    const[movies, setMovies] = useState(null);
    const[recommended, setRecommended] = useState(null)
    const[pendingRecommended, setPendingRecommended] = useState(true)
    const[error, setError] = useState(false);
    const[errorRecommended, setErrorRecommended] = useState(false)
    const[pending, setPending] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("insert api url here/movies/newest")
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else {
                throw Error();
            }        
        })
        .then(data => {
            setMovies(data);
            setPending(false);
        })
        .catch(() => {
            setPending(false);
            setError(true);
        })
    }, [])

    useEffect(() => {
        fetch("insert api url here/reviews/movies/highestRated")
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else {
                throw Error();
            }        
        })
        .then(data => {
            setRecommended(data);
            setPendingRecommended(false);
        })
        .catch(() => {
            setPendingRecommended(false);
            setErrorRecommended(true);
        })
    }, [])

    const handleMovieClick = (movieId) => {
        navigate(`movie/${movieId}`)
    }
    
    return (
        <div className = "homepage">
            <h2 className="new-entries-header">Recently added: </h2>
            <div className="entries">
                {pending && <p>Loading... </p>}
                {error && <p>An error has occurred while fetching movies, please try again.</p>}
                {!pending && !error && movies.map((movie) => (
                    <div className='movie-preview' key = {movie.id}>
                        <img 
                            src={`data:image/jpeg;base64, ${movie.poster}`} 
                            alt='movie' 
                            className='movie-poster'
                            title={movie.name}
                            onClick={() => handleMovieClick(movie.id)}/>
                        <h3>{movie.name}</h3>
                    </div>    
                ))}
            </div>
            <h2 className="recommended-header">Recommended: </h2>
            <div className="entries">
                {pendingRecommended && <p>Loading... </p>}
                {errorRecommended && <p>An error has occurred while fetching recommended movies, please try again.</p>}
                {!pendingRecommended && !errorRecommended && recommended && recommended.map((ratedMovie) => (
                        <div className='movie-preview' key = {ratedMovie.movie.id}>
                            <img 
                                src={`data:image/jpeg;base64, ${ratedMovie.movie.poster}`} 
                                alt='movie' 
                                className='movie-poster'
                                title={ratedMovie.movie.name}
                                onClick={() => handleMovieClick(ratedMovie.movie.id)}/>
                            <h3>{ratedMovie.movie.name}</h3>
                        </div>    
                    ))}
            </div>
        </div>
    )
}

export default Home;