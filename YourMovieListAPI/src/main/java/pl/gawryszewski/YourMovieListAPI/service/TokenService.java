package pl.gawryszewski.YourMovieListAPI.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.stream.Collectors;

@Service
public class TokenService {

    private JwtEncoder jwtEncoder;
    private JwtDecoder jwtDecoder;

    @Autowired
    public TokenService(JwtEncoder encoder, JwtDecoder decoder) {
        this.jwtEncoder = encoder;
        this.jwtDecoder = decoder;
    }

    public String generateJWT(Authentication auth) {
        Instant now = Instant.now();
        Instant expiration = now.plusSeconds(9000);
        String scope = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));

        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(expiration)
                .subject(auth.getName())
                .claim("roles", scope)
                .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();
    }

    public String getSubject(String token) {
        return jwtDecoder.decode(token).getSubject();
    }




}
