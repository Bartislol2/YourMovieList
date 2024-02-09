package pl.gawryszewski.YourMovieListAPI.service;

import pl.gawryszewski.YourMovieListAPI.entity.Movie;

import java.util.List;
import java.util.Map;

public interface MovieService {

    List<Movie> getAll();
    Movie getById(int id);

    List<Movie> getByName(String name);

    List<Movie> getNewest();
}
