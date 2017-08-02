package rs.levi9.socbook1.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import rs.levi9.socbook1.domain.Bookmark;
import rs.levi9.socbook1.domain.Role;
import rs.levi9.socbook1.domain.User;
import rs.levi9.socbook1.domain.UserStatus;
import rs.levi9.socbook1.service.BookmarkService;
import rs.levi9.socbook1.service.UserService;
import org.springframework.security.core.authority.AuthorityUtils;

import java.util.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;
    private BookmarkService bookmarkService;

    @Autowired
    public UserController(UserService userService, BookmarkService bookmarkService) {
        this.userService = userService;
        this.bookmarkService = bookmarkService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(method = RequestMethod.GET)
    public List<User> findAll() {
        return userService.findAll();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<User> findOne(@PathVariable("id") Long id) {
        User user = userService.findOne(id);

        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<User> save(@RequestBody User user) {
        String currentUserName = user.getUsername();
        User current = userService.findByUserName(currentUserName);

        if(current == null) {
            userService.save(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(path = "/block/{user_id}", method = RequestMethod.PUT)
    public ResponseEntity changeStatus(@PathVariable("user_id") Long userId) {
        User foundUser = userService.findOne(userId);

        if (foundUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        foundUser.setUserStatus(resolveStatus(foundUser));

        for (Role role : foundUser.getRoles()) {
            if (role.getType().equals(Role.RoleType.ROLE_ADMIN)) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        }

        userService.save(foundUser);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity delete(@PathVariable("id") Long id) {
        List<Bookmark> bookmarks = bookmarkService.findAll();
        User userToDelete = userService.findOne(id);

        for (Role role : userToDelete.getRoles()) {
            if (role.getType().equals(Role.RoleType.ROLE_ADMIN)) {
                return new ResponseEntity(HttpStatus.FORBIDDEN);
            }
        }

        for (Bookmark b : bookmarks) {
            if (b.getUser().equals(userToDelete)) {
                bookmarkService.delete(b.getId());
            }
        }

        userService.delete(id);

        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping("/login")
    public Map<String, Object> user(Authentication authentication) {
    	Map<String, Object> map = new LinkedHashMap<>();
    	map.put("name", authentication.getName());
    	map.put("roles", AuthorityUtils.authorityListToSet((authentication)
    			.getAuthorities()));

        return map;
    }

    private UserStatus resolveStatus(User foundUser) {
        UserStatus userStatus = new UserStatus();
        if (foundUser.getUserStatus().getType().equals(UserStatus.UserStatusType.STATUS_ACTIVE)) {
            userStatus.setType(UserStatus.UserStatusType.STATUS_INACTIVE);
            userStatus.setId(2L);
        } else {
            userStatus.setType(UserStatus.UserStatusType.STATUS_ACTIVE);
            userStatus.setId(1L);
        }
        return userStatus;
    }
}
