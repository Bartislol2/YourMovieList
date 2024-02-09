package pl.gawryszewski.YourMovieListAPI.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.gawryszewski.YourMovieListAPI.entity.User;

import java.util.Optional;

//repository using spring data jpa framework
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUsername(String username);
}
