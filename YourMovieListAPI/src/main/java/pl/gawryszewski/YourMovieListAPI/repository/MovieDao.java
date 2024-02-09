package pl.gawryszewski.YourMovieListAPI.repository;

import pl.gawryszewski.YourMovieListAPI.entity.Movie;

import java.util.List;

public interface MovieDao {

    List<Movie> getAll();
    Movie getById(int id);
    List<Movie> getByName(String movieName);
    List<Movie> getNewest();

}
