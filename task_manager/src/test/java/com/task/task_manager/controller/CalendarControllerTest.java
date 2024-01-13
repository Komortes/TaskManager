package com.task.task_manager.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.task.task_manager.dto.CalendarDto;
import com.task.task_manager.model.Calendar;
import com.task.task_manager.model.User;
import com.task.task_manager.security.JwtTokenProvider;
import com.task.task_manager.security.UserPrincipal;
import com.task.task_manager.service.CalendarService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class CalendarControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CalendarService calendarService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JwtTokenProvider tokenProvider;

    private String jwtToken;

    @BeforeEach
    void setup() {
        User mockUser = new User("Test User", "skor@gmail.com", "12345");
        mockUser.setId(1L); 
        UserPrincipal mockPrincipal = new UserPrincipal(mockUser);
    
        Authentication mockAuth = new UsernamePasswordAuthenticationToken(mockPrincipal, null, mockPrincipal.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(mockAuth);
    
        jwtToken = tokenProvider.generateToken(mockAuth); 
    }


    @Test
    void shouldCreateCalendar() throws Exception {
        CalendarDto calendarDto = new CalendarDto();
        calendarDto.setName("My Calendar");

        Calendar calendar = new Calendar("My Calendar", new User("Test User", "skor@gmail.com", "12345"));
        calendar.setCalendarId(1L);

        when(calendarService.createCalendar(eq("My Calendar"), anyLong())).thenReturn(calendar);

        mockMvc.perform(post("/api/calendars")
                .header("Authorization", "Bearer " + jwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(calendarDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("My Calendar"));
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

    @Test
    void shouldDeleteCalendar() throws Exception {
        Long calendarId = 1L;
        when(calendarService.deleteCalendar(eq(calendarId), anyLong())).thenReturn(true);
    
        mockMvc.perform(delete("/api/calendars/" + calendarId)
                .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk());
    }
    

    @Test
    void shouldUpdateCalendar() throws Exception {
        CalendarDto calendarDto = new CalendarDto();
        calendarDto.setCalendarId(1L);
        calendarDto.setName("Updated Calendar");

        Calendar updatedCalendar = new Calendar("Updated Calendar",
                new User("Test User", "test@example.com", "password123"));
        updatedCalendar.setCalendarId(1L);

        when(calendarService.updateCalendar(eq(1L), eq("Updated Calendar"), anyLong())).thenReturn(updatedCalendar);

        mockMvc.perform(put("/api/calendars/" + 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(calendarDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated Calendar"));
    }
}