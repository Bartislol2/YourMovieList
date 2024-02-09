package pl.gawryszewski.YourMovieListAPI.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.gawryszewski.YourMovieListAPI.entity.Movie;
import pl.gawryszewski.YourMovieListAPI.rest.exception.MovieNotFoundException;
import pl.gawryszewski.YourMovieListAPI.service.MovieService;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieRestController {

    private MovieService movieService;

    @Autowired
    public MovieRestController(MovieService service) {
        this.movieService = service;
    }

    @GetMapping("")
    public List<Movie> getAll() {
        return movieService.getAll();
    }

    @GetMapping("/newest")
    public List<Movie> getNewest(){
        return movieService.getNewest();
    }

    @GetMapping("/{movieId}")
    public ResponseEntity<Movie> getById(@PathVariable("movieId") int id) {
        Movie movie = movieService.getById(id);
        if (movie != null) {
           return new ResponseEntity<>(movie, HttpStatus.OK);
        }
        else {
            throw new MovieNotFoundException("Movie not found, id: "+id);
        }
    }

    @GetMapping("/name/{movieName}")
    public ResponseEntity<List<Movie>> getByName(@PathVariable("movieName") String name) {
        List<Movie> movies = movieService.getByName(name);
        if (!movies.isEmpty()) {
            return new ResponseEntity<>(movies, HttpStatus.OK);
        }
        else {
            throw new MovieNotFoundException("No movies found, id: "+name);
        }
    }


}
