package pl.gawryszewski.YourMovieListAPI.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import pl.gawryszewski.YourMovieListAPI.entity.Movie;

import java.util.List;

//traditional way, no spring data jpa
@Repository
public class MovieDaoImpl implements MovieDao{

    private EntityManager entityManager;

    @Autowired
    public MovieDaoImpl(EntityManager manager) {
        this.entityManager = manager;
    }
    @Override
    public List<Movie> getAll() {
        TypedQuery<Movie> moviesQuery = entityManager.createQuery("FROM Movie", Movie.class);
        return moviesQuery.getResultList();
    }

    @Override
    public List<Movie> getNewest() {
        TypedQuery<Movie> moviesQuery = entityManager.createQuery("FROM Movie ORDER BY id DESC LIMIT 10", Movie.class);
        return moviesQuery.getResultList();
    }

    @Override
    public Movie getById(int id) {
        return entityManager.find(Movie.class, id);
    }

    @Override
    public List<Movie> getByName(String movieName) {
        TypedQuery<Movie> moviesQuery= entityManager.createQuery("FROM Movie WHERE name like '%"+movieName+"%'"
                , Movie.class);
        return moviesQuery.getResultList();
    }
}
