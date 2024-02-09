package pl.gawryszewski.YourMovieListAPI.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.gawryszewski.YourMovieListAPI.DTO.ReviewDTO;
import pl.gawryszewski.YourMovieListAPI.DTO.ReviewResponseDTO;
import pl.gawryszewski.YourMovieListAPI.entity.Movie;
import pl.gawryszewski.YourMovieListAPI.entity.Review;
import pl.gawryszewski.YourMovieListAPI.rest.exception.ReviewRestException;
import pl.gawryszewski.YourMovieListAPI.service.ReviewService;
import pl.gawryszewski.YourMovieListAPI.service.TokenService;
import pl.gawryszewski.YourMovieListAPI.util.RatedMovie;

import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewRestController {

    private ReviewService reviewService;

    private TokenService tokenService;

    @Autowired
    public ReviewRestController(ReviewService rService, TokenService tService) {
        this.reviewService = rService;
        this.tokenService = tService;
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<ReviewResponseDTO> getReview(@PathVariable int reviewId) {
        ReviewResponseDTO dto = reviewService.getUserReview(reviewId);
        if(dto!=null) {
            return new ResponseEntity<>(dto, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<ReviewResponseDTO>> getUserReviews(@PathVariable String username) {
        return new ResponseEntity<>(reviewService.getUserReviews(username), HttpStatus.OK);
    }

    @GetMapping("/movies/{movieId}")
    public ResponseEntity<List<Review>> getMovieReviews(@PathVariable Integer movieId) {
        return new ResponseEntity<>(reviewService.getMovieReviews(movieId), HttpStatus.OK);
    }

    @GetMapping("/movies/avg/{movieId}")
    public ResponseEntity<?> getMovieAvgRating(@PathVariable Integer movieId) {
        Float avg = reviewService.getAvgRating(movieId);
        if(avg!= null) {
            return new ResponseEntity<>(avg, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("?", HttpStatus.OK);
        }
    }

    @GetMapping("/movies/highestRated")
    public List<RatedMovie> getHighestRated(){
        return reviewService.getHighestRated();
    }

    @PostMapping("")
    public ResponseEntity<Review> addReview(@RequestBody ReviewDTO dto, @RequestHeader("Authorization") String tokenHeader) {
        String token = tokenHeader.replace("Bearer ", "");
        String username = tokenService.getSubject(token);
        if(!username.equals(dto.getUsername())) {
            throw new ReviewRestException("Unauthorized", 401);
        }
        else {
            Review review = reviewService.addReview(dto);
            if(review!=null) {
                return new ResponseEntity<>(review, HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
        }
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable int reviewId, @RequestHeader("Authorization") String tokenHeader){
        String token = tokenHeader.replace("Bearer ", "");
        String username = tokenService.getSubject(token);
        Review review = reviewService.getById(reviewId);
        if(!username.equals(review.getUsername())) {
            throw new ReviewRestException("Unauthorized", 401);
        }
        else {
            if (reviewService.deleteReview(reviewId)) {
                return new ResponseEntity<>(HttpStatus.OK);
            }
            else {
                throw new ReviewRestException("Review not found", 404);
            }
        }
    }

    @PutMapping("")
    public ResponseEntity<Review> updateReview(@RequestBody Review newReview, @RequestHeader("Authorization") String tokenHeader) {
        String token = tokenHeader.replace("Bearer ", "");
        String username = tokenService.getSubject(token);
        if(!username.equals(newReview.getUsername())) {
            throw new ReviewRestException("Unauthorized", 401);
        }
        else {
            Review review = reviewService.updateReview(newReview);
            if(review != null) {
                return new ResponseEntity<>(review, HttpStatus.OK);
            }
            else {
                throw new ReviewRestException("Review not found", 404);
            }
        }
    }
}
