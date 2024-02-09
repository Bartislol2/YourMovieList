package pl.gawryszewski.YourMovieListAPI.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import pl.gawryszewski.YourMovieListAPI.DTO.ReviewDTO;
import pl.gawryszewski.YourMovieListAPI.entity.Review;

import java.util.List;

@Repository
public class ReviewDaoImpl implements ReviewDao {

    private EntityManager entityManager;

    @Autowired
    public ReviewDaoImpl(EntityManager manager) {
        this.entityManager = manager;
    }

    @Override
    public Review getById(int id) {
        return entityManager.find(Review.class, id);
    }
    @Override
    public List<Review> getMovieReviews(int id) {
        TypedQuery<Review> query = entityManager.createQuery("FROM Review where movieId = "+id, Review.class);
        return query.getResultList();
    }

    @Override
    public List<Review> getUserReviews(String name) {
        TypedQuery<Review> query = entityManager.createQuery("FROM Review where username = '"+name+"'", Review.class);
        return query.getResultList();
    }

    @Override
    public boolean deleteReview(int reviewId) {
        Review review = entityManager.find(Review.class, reviewId);
        if(review != null) {
            entityManager.remove(review);
            return true;
        }
        else {
            return false;
        }
    }

    @Override
    public Review addReview(ReviewDTO dto) {
        Review review = new Review(
                dto.getMovieId(),
                dto.getUsername(),
                dto.getRating(),
                dto.getReview()
        );
        entityManager.persist(review);
        return review;
    }

    @Override
    public Review updateReview(Review newReview) {
        if(entityManager.find(Review.class, newReview.getId())!= null) {
            return entityManager.merge(newReview);
        }
        else {
            return null;
        }
    }

    @Override
    public boolean alreadyReviewed(int movieId, String username) {
        TypedQuery<Review> reviewTypedQuery = entityManager.createQuery("From Review where movieId = "+movieId+
                " AND username = '"+username+"'", Review.class);
        return !reviewTypedQuery.getResultList().isEmpty();
    }
}
