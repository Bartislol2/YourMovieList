package pl.gawryszewski.YourMovieListAPI.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.gawryszewski.YourMovieListAPI.DTO.LoginResponseDTO;
import pl.gawryszewski.YourMovieListAPI.DTO.RegisterResponseDTO;
import pl.gawryszewski.YourMovieListAPI.entity.Role;
import pl.gawryszewski.YourMovieListAPI.entity.User;
import pl.gawryszewski.YourMovieListAPI.repository.RoleRepository;
import pl.gawryszewski.YourMovieListAPI.repository.UserRepository;
import pl.gawryszewski.YourMovieListAPI.rest.exception.UserAlreadyExistsException;

import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
public class AuthenticationService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    private AuthenticationManager authenticationManager;

    private TokenService tokenService;


    @Autowired
    public AuthenticationService(UserRepository userRepository, RoleRepository roleRepository,
                                 PasswordEncoder encoder, AuthenticationManager manager,
                                 TokenService service) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = encoder;
        this.authenticationManager = manager;
        this.tokenService = service;
    }

    public RegisterResponseDTO registerUser(String username, String password) {
        if(userRepository.findByUsername(username).isPresent()) {
            throw new UserAlreadyExistsException("Username is taken");
        }
        else {
            String encodedPassword = "{bcrypt}" + passwordEncoder.encode(password);
            Role role = roleRepository.findByAuthority("USER").get();
            Set<Role> roles = new HashSet<>();
            roles.add(role);
            userRepository.save(new User(username, encodedPassword, roles));
            return new RegisterResponseDTO(username, role.getAuthority());
        }
    }

    public LoginResponseDTO loginUser(String username, String password) throws AuthenticationException{
        if(userRepository.findByUsername(username).isPresent()) {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            String token = tokenService.generateJWT(auth);
            return new LoginResponseDTO(userRepository.findByUsername(username).get().getUsername(), token);
        }
        else {
            throw new UsernameNotFoundException("Username not found");
        }
    }


}
