package pl.gawryszewski.YourMovieListAPI.service;

import pl.gawryszewski.YourMovieListAPI.DTO.ReviewDTO;
import pl.gawryszewski.YourMovieListAPI.DTO.ReviewResponseDTO;
import pl.gawryszewski.YourMovieListAPI.entity.Review;
import pl.gawryszewski.YourMovieListAPI.util.RatedMovie;
import java.util.List;

public interface ReviewService {
    Review getById(int id);
    ReviewResponseDTO getUserReview(int id);
    List<Review> getMovieReviews(int movieId);
    List<ReviewResponseDTO> getUserReviews(String username);
    boolean deleteReview(int reviewId);
    Review addReview(ReviewDTO dto);
    Review updateReview(Review newReview);
    Float getAvgRating(int movieId);

    List<RatedMovie> getHighestRated();

}
