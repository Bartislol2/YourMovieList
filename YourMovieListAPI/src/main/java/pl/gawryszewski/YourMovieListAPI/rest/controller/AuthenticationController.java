package pl.gawryszewski.YourMovieListAPI.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.gawryszewski.YourMovieListAPI.DTO.LoginResponseDTO;
import pl.gawryszewski.YourMovieListAPI.DTO.RegisterResponseDTO;
import pl.gawryszewski.YourMovieListAPI.DTO.UserRegisterDTO;
import pl.gawryszewski.YourMovieListAPI.service.AuthenticationService;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService service) {
        this.authenticationService = service;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> registerUser(@RequestBody UserRegisterDTO dto) {
        return new ResponseEntity<>(
                authenticationService.registerUser(dto.getUsername(), dto.getPassword()),
                HttpStatus.OK
        );
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody UserRegisterDTO dto) {
        return new ResponseEntity<>(
                authenticationService.loginUser(dto.getUsername(), dto.getPassword()),
                HttpStatus.OK
                );
    }

    @PostMapping("/token")
    public ResponseEntity<?> refreshToken() {
        return null;
    }
}
