package com.task.task_manager.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.task.task_manager.service.CustomUserDetailsService;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private SecretKey jwtSecret = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    private int jwtExpirationInMs = 86400000; // 1 day

    public String generateToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(Long.toString(userPrincipal.getId()))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(jwtSecret, SignatureAlgorithm.HS512)
                .compact();
    }

    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(jwtSecret).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | io.jsonwebtoken.MalformedJwtException e) {
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
        } catch (io.jsonwebtoken.UnsupportedJwtException e) {
        } catch (Exception e) {
        }
        return false;
    }

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    public Authentication getAuthentication(String token) {
        Claims claims = extractClaims(token);
        Long userId = Long.parseLong(claims.getSubject());
        UserPrincipal userDetails = customUserDetailsService.loadUserById(userId);
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    private Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

}
