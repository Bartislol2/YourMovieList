package pl.gawryszewski.YourMovieListAPI.DTO;

public class RegisterResponseDTO {

    private String username;
    private String roles;

    public RegisterResponseDTO(String username, String roles) {
        this.username = username;
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }
}
