package rs.levi9.socbook1.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import rs.levi9.socbook1.domain.Bookmark;
import rs.levi9.socbook1.domain.Role;
import rs.levi9.socbook1.domain.Tag;
import rs.levi9.socbook1.domain.User;
import rs.levi9.socbook1.service.BookmarkService;
import rs.levi9.socbook1.service.TagService;
import rs.levi9.socbook1.service.UserService;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/bookmarks")
public class BookmarkController {

    private BookmarkService bookmarkService;
    private TagService tagService;
    private UserService userService;

    @Autowired
    public BookmarkController(BookmarkService bookmarkService, TagService tagService, UserService userService) {
        this.bookmarkService = bookmarkService;
        this.tagService = tagService;
        this.userService = userService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(method = RequestMethod.GET)
    public List<Bookmark> findAll() {
        // waiting to clarify
        return bookmarkService.findAll();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Bookmark> findOne(@PathVariable("id") Long id) {
        Bookmark bookmark = bookmarkService.findOne(id);

        if(bookmark == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if (!loggedUserEqualsRequestUserOrAdmin(bookmark.getUser())) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(bookmark, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Bookmark> save(@RequestBody Bookmark bookmark) {
        Bookmark bookmarkForSave;
        Bookmark uniqueBookmark = bookmarkService.findByUrl(bookmark.getUrl());
        bookmark.setImported(false);

        bookmark.setRating(0);
        bookmark.setTimesRated(0);
        bookmark.setRateSum(0);

        User tempUser = userService.findByUserName(bookmark.getUser().getUsername());
        if (tempUser == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        bookmark.setUser(tempUser);

        if (uniqueBookmark == null) {
            bookmarkForSave = bookmarkService.save(bookmark);
        } else {
            if (uniqueBookmark.getUser().getUsername().equals(bookmark.getUser().getUsername())) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            } else {
                bookmarkForSave = bookmarkService.save(bookmark);
            }
        }

        if(bookmarkForSave == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(bookmarkForSave, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity delete(@PathVariable Long id) {
        Bookmark forDelete = bookmarkService.findOne(id);

        if (!loggedUserEqualsRequestUserOrAdmin(forDelete.getUser())) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        bookmarkService.delete(id);

        return new ResponseEntity(HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Bookmark> update(@RequestBody Bookmark bookmark) {
        User tempUser = userService.findByUserName(bookmark.getUser().getUsername());

        if (tempUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        bookmark.setUser(tempUser);

        Bookmark updatedBookmark = bookmarkService.save(bookmark);

        if (updatedBookmark == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(updatedBookmark, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @RequestMapping(path = "/user/{username}", method = RequestMethod.GET)
    public ResponseEntity<List<Bookmark>> findByUsername(@PathVariable String username) {
        User user = userService.findByUserName(username);

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if (!loggedUserEqualsRequestUserOrAdmin(user)) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        List<Bookmark> bookmarksFromUser = bookmarkService.findAllByUser(user);

        return new ResponseEntity<>(bookmarksFromUser, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @RequestMapping(path = ("/public/{username}"), method = RequestMethod.GET)
    public ResponseEntity<List<Bookmark>> findAllByPublicWithoutUser(@PathVariable String username) {
        User user = userService.findByUserName(username);
        if (user == null) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.BAD_REQUEST);
        }

        if (!loggedUserEqualsRequestUserOrAdmin(user)) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        List<Bookmark> bookmarks = bookmarkService.findAllByPublicWithoutUser(user);

        if (!isAdminUser(userService.findByUserName(getLoggedUserName()))) {
            for (Bookmark b : bookmarks) {
                b.getUser().setPassword("******");
            }
        }

        return new ResponseEntity<>(bookmarks, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @RequestMapping(path = "/{username}/{id}", method = RequestMethod.POST)
    public ResponseEntity<Bookmark> importBookmark(@PathVariable("username") String username, @PathVariable("id") Long id) {
        Bookmark bookmarkSource = bookmarkService.findOne(id);

        bookmarkSource.setImported(true);

        bookmarkService.save(bookmarkSource);

        Bookmark bookmarkToImport = new Bookmark();
        User userImporting = userService.findByUserName(username);

        if (!loggedUserEqualsRequestUserOrAdmin(userImporting)) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        if (bookmarkService.findBookmarkByUserAndUrl(userImporting, bookmarkSource.getUrl()) != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        bookmarkToImport.setUser(userImporting);
        bookmarkToImport.setDate(new Date());
        bookmarkToImport.setImported(false);
        bookmarkToImport.setPublic(true);
        bookmarkToImport.setTags(bookmarkSource.getTags());
        bookmarkToImport.setCategory(bookmarkSource.getCategory());
        bookmarkToImport.setDescription(bookmarkSource.getDescription());
        bookmarkToImport.setTitle(bookmarkSource.getTitle());
        bookmarkToImport.setUrl(bookmarkSource.getUrl());

        Bookmark bookmarkForSave = bookmarkService.save(bookmarkToImport);

        if(bookmarkForSave == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(bookmarkForSave, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @RequestMapping(path = "/rate/{id}/{new_rating}", method = RequestMethod.PUT)
    public ResponseEntity rate(@PathVariable("id") Long id, @PathVariable("new_rating") Integer newRating) {
        Bookmark bookmarkToRate = bookmarkService.findOne(id);

        Integer rate = (bookmarkToRate.getRateSum() + newRating) / (bookmarkToRate.getTimesRated() + 1);

        bookmarkToRate.setTimesRated(bookmarkToRate.getTimesRated() + 1);
        bookmarkToRate.setRateSum(bookmarkToRate.getRateSum() + newRating);
        bookmarkToRate.setRating(rate);

        bookmarkService.save(bookmarkToRate);

        return new ResponseEntity(HttpStatus.OK);
    }

    private boolean isAdminUser(User user) {
        for (Role role : user.getRoles()) {
            if (role.getType().equals(Role.RoleType.ROLE_ADMIN)) {
                return true;
            }
        }
        return false;
    }

    private String getLoggedUserName() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getName();
    }

    private boolean loggedUserEqualsRequestUserOrAdmin(User requestedUser) {
        User loggedUser = userService.findByUserName(getLoggedUserName());

        if (loggedUser == requestedUser || isAdminUser(loggedUser)) {
            return true;
        }
        return false;
    }
}
