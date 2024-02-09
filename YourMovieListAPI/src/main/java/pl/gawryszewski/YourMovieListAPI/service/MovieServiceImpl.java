package pl.gawryszewski.YourMovieListAPI.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.gawryszewski.YourMovieListAPI.entity.Movie;
import pl.gawryszewski.YourMovieListAPI.entity.Review;
import pl.gawryszewski.YourMovieListAPI.repository.MovieDao;

import java.util.*;

@Service
public class MovieServiceImpl implements MovieService{

    private MovieDao movieDao;


    @Autowired
    public MovieServiceImpl(MovieDao dao) {
        this.movieDao = dao;
    }

    @Override
    public List<Movie> getAll() {
        return movieDao.getAll();
    }

    @Override
    public List<Movie> getNewest() {
        return movieDao.getNewest();
    }



    @Override
    public Movie getById(int id) {
        return movieDao.getById(id);
    }

    @Override
    public List<Movie> getByName(String name) {
        return movieDao.getByName(name);
    }
}
