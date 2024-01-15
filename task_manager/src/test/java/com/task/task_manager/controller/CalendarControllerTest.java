package com.task.task_manager.controller;

import com.task.task_manager.dto.CalendarDto;
import com.task.task_manager.model.User;
import com.task.task_manager.security.UserPrincipal;
import com.task.task_manager.service.CalendarService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@TestPropertySource(locations = "classpath:application-test.properties")
public class CalendarControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CalendarService calendarService;

    @BeforeEach
    void setup() {
        User mockUser = new User("Test User", "skor@gmail.com", "12345");
        mockUser.setId(1L);
        UserPrincipal mockPrincipal = new UserPrincipal(mockUser);

        Authentication mockAuth = new UsernamePasswordAuthenticationToken(mockPrincipal, null,
                mockPrincipal.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(mockAuth);
    }

    @Test
    void shouldGetAllCalendars() throws Exception {
        CalendarDto calendarDto = new CalendarDto();
        calendarDto.setCalendarId(1L);
        calendarDto.setName("My Calendar");

        List<CalendarDto> calendarDtos = Collections.singletonList(calendarDto);
        when(calendarService.getAllCalendarsForUser(anyLong())).thenReturn(calendarDtos);

        mockMvc.perform(get("/api/calendars"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("My Calendar"));
    }
}