package rs.levi9.socbook1.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import rs.levi9.socbook1.service.UserService;

@Configurable
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    
    @Autowired
    private UserService userService; 

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        super.configure(web);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            // starts authorizing configurations
            .authorizeRequests()
            // ignore the static files
            .antMatchers("/", "/users", "/categories", "/bookmarks", "/bower_components/**", "/css/**", "/js/**", "/views/**", "/images/**").permitAll()
            // authenticate all remaining URLS
            .anyRequest().fullyAuthenticated().and()
            // enabling the basic authentication
            .httpBasic().and()
            // configuring the session as state less. Which means there is
            // no session in the server
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            // disabling the CSRF - Cross Site Request Forgery
            .csrf().disable();
    }

}