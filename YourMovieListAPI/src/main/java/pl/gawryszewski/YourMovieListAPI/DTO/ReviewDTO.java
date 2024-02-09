package pl.gawryszewski.YourMovieListAPI.DTO;

public class ReviewDTO {
    private int movieId;
    private String username;
    private int rating;
    private String review;

    public ReviewDTO(int movieId, String username, int rating, String review) {
        this.movieId = movieId;
        this.username = username;
        this.rating = rating;
        this.review = review;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
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

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }
}
