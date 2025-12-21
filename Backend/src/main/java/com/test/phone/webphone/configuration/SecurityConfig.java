package com.test.phone.webphone.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // REST API → không dùng CSRF
                .csrf(AbstractHttpConfigurer::disable)

                // Stateless
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // Phân quyền
                .authorizeHttpRequests(auth -> auth
                        // ⭐ Preflight
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // ⭐ Swagger
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**"
                        ).permitAll()

                        // ⭐ GraphQL
                        .requestMatchers(
                                "/graphql"
                        ).permitAll()

                        // ⭐ REST API (TẤT CẢ version)
                        .requestMatchers(
                                "/api/**"
                        ).permitAll()

                        // ⭐ Frontend (SPA)
                        .requestMatchers(
                                "/",
                                "/index.html",
                                "/assets/**",
                                "/css/**",
                                "/js/**"
                        ).permitAll()

                        .anyRequest().authenticated()
                )

                // 🔥 CỰC KỲ QUAN TRỌNG
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable);

        return http.build();
    }
}

