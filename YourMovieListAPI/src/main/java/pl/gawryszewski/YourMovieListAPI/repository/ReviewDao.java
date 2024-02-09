package pl.gawryszewski.YourMovieListAPI.repository;

import pl.gawryszewski.YourMovieListAPI.DTO.ReviewDTO;
import pl.gawryszewski.YourMovieListAPI.entity.Review;

import java.util.List;

public interface ReviewDao {
    Review getById(int id);
    List<Review> getMovieReviews(int movieId);
    List<Review> getUserReviews(String username);
    boolean deleteReview(int reviewId);
    Review addReview(ReviewDTO dto);
    Review updateReview(Review newReview);
    boolean alreadyReviewed(int movieId, String username);
}
