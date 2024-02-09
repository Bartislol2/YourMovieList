package pl.gawryszewski.YourMovieListAPI.rest.exception;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ReviewRestExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleReviewRestException(ReviewRestException e) {
        ErrorResponse response = new ErrorResponse();
        response.setStatus(e.getStatus());
        response.setMessage(e.getMessage());
        response.setTimestamp(System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatusCode.valueOf(response.getStatus()));
    }
}
