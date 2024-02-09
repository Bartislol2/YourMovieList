package pl.gawryszewski.YourMovieListAPI.rest.exception;

public class ReviewRestException extends RuntimeException{

    private int status;
    public ReviewRestException(String message, int status) {
        super(message);
        this.status = status;
    }

    public int getStatus() {
        return status;
    }
}
