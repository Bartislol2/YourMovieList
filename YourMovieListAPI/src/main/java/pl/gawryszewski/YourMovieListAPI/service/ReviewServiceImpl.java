package pl.gawryszewski.YourMovieListAPI.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.gawryszewski.YourMovieListAPI.DTO.ReviewDTO;
import pl.gawryszewski.YourMovieListAPI.DTO.ReviewResponseDTO;
import pl.gawryszewski.YourMovieListAPI.entity.Movie;
import pl.gawryszewski.YourMovieListAPI.entity.Review;
import pl.gawryszewski.YourMovieListAPI.repository.ReviewDao;
import pl.gawryszewski.YourMovieListAPI.util.RatedMovie;

import java.util.*;

@Service
public class ReviewServiceImpl implements ReviewService {
    private ReviewDao reviewDao;

    private MovieService movieService;

    @Autowired
    public ReviewServiceImpl(ReviewDao dao, MovieService service) {
        this.reviewDao = dao;
        this.movieService = service;
    }

    @Override
    public Review getById(int id) {
        return reviewDao.getById(id);
    }

    @Override
    public ReviewResponseDTO getUserReview(int id) {
        Review review = getById(id);
        if(review != null) {
            Movie movie = movieService.getById(review.getMovieId());
            return new ReviewResponseDTO(
                    review.getId(),
                    review.getMovieId(),
                    review.getUsername(),
                    movie.getName(),
                    review.getRating(),
                    review.getReview()
            );
        }
        else {
            return null;
        }
    }

    @Override
    public List<Review> getMovieReviews(int movieId) {
        return reviewDao.getMovieReviews(movieId);
    }

    @Override
    public Float getAvgRating(int movieId) {
        List<Review> movieReviews = getMovieReviews(movieId);
        if(movieReviews.isEmpty()) {
            return null;
        }
        else {
            int sum = 0;
            for(Review review: movieReviews) {
                sum+= review.getRating();
            }
            return (float)sum/movieReviews.size();
        }
    }
    @Override
    public List<RatedMovie> getHighestRated() {
        List<Movie> movies = movieService.getAll();
        List<RatedMovie> ratedMovies = new ArrayList<>();
        for(Movie movie: movies){
            Float avgRating = getAvgRating(movie.getId());
            if(avgRating!=null){
                RatedMovie ratedMovie = new RatedMovie(avgRating, movie);
                ratedMovies.add(ratedMovie);
            }
        }
        if(!ratedMovies.isEmpty()) {
            ratedMovies.sort(Collections.reverseOrder());
            return ratedMovies.subList(0, Math.min(ratedMovies.size(), 5));
        }
        else {
            return null;
        }

    }

    @Override
    public List<ReviewResponseDTO> getUserReviews(String username) {
        List<Review> userReviews = reviewDao.getUserReviews(username);
        List<ReviewResponseDTO> dtos = new ArrayList<>();
        for(Review review: userReviews) {
            Movie movie = movieService.getById(review.getMovieId());
            ReviewResponseDTO dto = new ReviewResponseDTO(
                    review.getId(),
                    review.getMovieId(),
                    review.getUsername(),
                    movie.getName(),
                    review.getRating(),
                    review.getReview()
            );
            dtos.add(dto);
        }
        return dtos;
    }

    @Override
    @Transactional
    public boolean deleteReview(int reviewId) {
        return reviewDao.deleteReview(reviewId);
    }

    @Override
    @Transactional
    public Review addReview(ReviewDTO dto) {
        boolean alreadyReviewed = reviewDao.alreadyReviewed(dto.getMovieId(), dto.getUsername());
        if(!alreadyReviewed) {
            return reviewDao.addReview(dto);
        }
        else {
            return null;
        }
    }

    @Override
    @Transactional
    public Review updateReview(Review newReview) {
        return reviewDao.updateReview(newReview);
    }
}
