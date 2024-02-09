package pl.gawryszewski.YourMovieListAPI.entity;

import jakarta.persistence.*;

@Entity
@Table(name="REVIEWS")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="movieid")
    private int movieId;
    private String username;
    private int rating;
    private String review;

    public Review() {

    }

    public Review(int movieId, String username, int rating, String review) {
        this.movieId = movieId;
        this.username = username;
        this.rating = rating;
        this.review = review;
    }

    public int getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(Integer movieId) {
        this.movieId = movieId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }
}
