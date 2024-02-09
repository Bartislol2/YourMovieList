package pl.gawryszewski.YourMovieListAPI.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.gawryszewski.YourMovieListAPI.entity.User;
import pl.gawryszewski.YourMovieListAPI.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private PasswordEncoder passwordEncoder;

    private UserRepository userRepository;

    @Autowired
    public UserService(PasswordEncoder passwordEncoder, UserRepository repository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = repository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> result = userRepository.findByUsername(username);
        if(result.isPresent()) {
            return result.get();
        }
        else {
            throw new UsernameNotFoundException("User not found");
        }
    }
}
