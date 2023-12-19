package com.task.task_manager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.task.task_manager.dto.LoginRequest;
import com.task.task_manager.security.JwtAuthenticationResponse;
import com.task.task_manager.security.JwtTokenProvider;
import com.task.task_manager.service.AuthService;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthService authenticationService;
    private final JwtTokenProvider tokenProvider;

    @Autowired
    public AuthController(AuthService authenticationService, JwtTokenProvider tokenProvider) {
        this.authenticationService = authenticationService;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationService.authenticate(loginRequest);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }
}
