package com.task.task_manager.service;

import com.task.task_manager.dto.LoginRequest;
import com.task.task_manager.dto.SignupRequest;
import com.task.task_manager.model.User;
import com.task.task_manager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public User registerUser(SignupRequest signupRequest) {
        User newUser = new User();
        newUser.setEmail(signupRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        return userRepository.save(newUser);
    }

    public Authentication authenticate(LoginRequest request){
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
        return authentication;
    }
}
