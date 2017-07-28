package rs.levi9.socbook1.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import rs.levi9.socbook1.domain.Role;
import rs.levi9.socbook1.domain.User;
import rs.levi9.socbook1.service.UserService;
import org.springframework.security.core.authority.AuthorityUtils;

import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<User> findOne(@PathVariable("id") Long id) {
        User user = userService.findOne(id);

        if(user == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<User> save(@RequestBody User user) {
        String currentUserName = user.getUsername();
        User current = userService.findByUserName(currentUserName);


        if(current == null) {
            userService.save(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping("/login")
    public Map<String, Object> user(Authentication authentication) {
    	Map<String, Object> map = new LinkedHashMap<>();
    	map.put("name", authentication.getName());
    	map.put("roles", AuthorityUtils.authorityListToSet((authentication)
    			.getAuthorities()));

        return map;
    }
    
}
