package pl.gawryszewski.YourMovieListAPI.DTO;

public class ReviewResponseDTO {
    private int id;
    private int movieId;
    private String username;
    private String movieName;
    private int rating;

    private String review;

    public ReviewResponseDTO(int id, int movieId, String username, String movieName, int rating, String review) {
        this.id = id;
        this.movieId = movieId;
        this.username = username;
        this.movieName = movieName;
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

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
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

    public int getId() {
        return id;
    }
}
