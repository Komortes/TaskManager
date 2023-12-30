package com.task.task_manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.task.task_manager.dto.LoginRequest;
import com.task.task_manager.dto.SignupRequest;
import com.task.task_manager.security.JwtAuthenticationResponse;
import com.task.task_manager.security.JwtTokenProvider;
import com.task.task_manager.service.AuthService;

import io.swagger.v3.oas.models.responses.ApiResponse;
import org.springframework.security.core.AuthenticationException;
import com.task.task_manager.dto.ErrorResponse; 
import com.task.task_manager.dto.MessageResponse; 
import java.util.Collections; 

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final JwtTokenProvider tokenProvider;

    @Autowired
    public AuthController(AuthService authService, JwtTokenProvider tokenProvider) {
        this.authService = authService;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);
            return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
        } catch (AuthenticationException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Invalid email or password", Collections.singletonList("The email address or password provided is incorrect."));
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(errorResponse);
        }
    }
    

    @PostMapping("/signup")
public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
    if (authService.existsByEmail(signUpRequest.getEmail())) {
        ErrorResponse errorResponse = new ErrorResponse("Email Address already in use!", Collections.singletonList("A user with the given email already exists."));
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(errorResponse);
    }

    authService.registerUser(signUpRequest.getFirstName(), signUpRequest.getLastName(), signUpRequest.getEmail(), signUpRequest.getPassword());
    
    try {
        Authentication authentication = authService.authenticate(signUpRequest.getEmail(), signUpRequest.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    } catch (AuthenticationException ex) {
        ErrorResponse errorResponse = new ErrorResponse("Registration successful but login failed", Collections.singletonList("Error occurred while logging in."));
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(errorResponse);
    }
}

    
}
