package com.task.task_manager.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.ArgumentCaptor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.task.task_manager.model.User;
import com.task.task_manager.repository.UserRepository;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    @Test
    void shouldAuthenticateUser() {
        String username = "testUser";
        String password = "password";
        Authentication authentication = mock(Authentication.class);
        when(authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password)))
                .thenReturn(authentication);

        Authentication result = authService.authenticate(username, password);
        assertEquals(authentication, result);
    }

    @Test
    void UserExists() {
        String username = "existingUser";
        when(userRepository.existsByUsername(username)).thenReturn(true);
        boolean exists = authService.existsByUsername(username);
        assertTrue(exists);
    }

    @Test
    void UserDoesNotExist() {
        String username = "nonExistingUser";
        when(userRepository.existsByUsername(username)).thenReturn(false);
        boolean exists = authService.existsByUsername(username);
        assertFalse(exists);
    }

    @Test
    void EmailExists() {
        String email = "existing@example.com";
        when(userRepository.existsByEmail(email)).thenReturn(true);
        boolean exists = authService.existsByEmail(email);
        assertTrue(exists);
    }

    @Test
    void EmailDoesNotExist() {
        String email = "nonexisting@example.com";
        when(userRepository.existsByEmail(email)).thenReturn(false);
        boolean exists = authService.existsByEmail(email);
        assertFalse(exists);
    }

    @Test
    void shouldСreateNewUser() {
        String firstName = "John";
        String lastName = "Doe";
        String email = "john.doe@example.com";
        String password = "password";
        String encodedPassword = "encodedPassword";
        when(passwordEncoder.encode(password)).thenReturn(encodedPassword);
        authService.registerUser(firstName, lastName, email, password);
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        User savedUser = userCaptor.getValue();
        assertEquals("John Doe", savedUser.getUsername());
        assertEquals(email, savedUser.getEmail());
        assertEquals(encodedPassword, savedUser.getPassword());
    }
}
