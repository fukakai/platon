package com.alithya.platon.security;
/**
 * Web Configuration to preven Cross-Origin Error: Access to fetch at 'http://localhost:8989/users'
 * from origin 'http://localhost:3000' has been blocked by CORS policy: No
 * 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response
 * serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
 *
 * @EnableWebSecurity public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
 * @Override protected void configure(HttpSecurity http) throws Exception { http // by default uses
 * a Bean by the name of corsConfigurationSource .cors().and(); }
 * @Bean CorsConfigurationSource corsConfigurationSource() { CorsConfiguration configuration = new
 * CorsConfiguration(); configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
 * configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","UPDATE"));
 * configuration.setAllowedOrigins(Arrays.asList("http://localhost:8989"));
 * configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","UPDATE"));
 * UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
 * source.registerCorsConfiguration("/**", configuration); return source; } }
 */