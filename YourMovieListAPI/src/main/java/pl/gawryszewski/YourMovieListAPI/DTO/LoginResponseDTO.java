package pl.gawryszewski.YourMovieListAPI.DTO;

public class LoginResponseDTO {
    private String username;
    private String jwt;

    public LoginResponseDTO(String username, String jwt) {
        this.username = username;
        this.jwt = jwt;
    }

    public String getUsername() {
        return username;
    }

    public void setUser(String username) {
        this.username = username;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }
}
