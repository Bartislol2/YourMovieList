package pl.gawryszewski.YourMovieListAPI.rest.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/user/")
    public String siema() {
        return "siema user";
    }
}
