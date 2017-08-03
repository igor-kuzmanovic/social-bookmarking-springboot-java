package rs.levi9.socbook1.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import rs.levi9.socbook1.domain.*;
import rs.levi9.socbook1.service.BookmarkService;
import rs.levi9.socbook1.service.UserService;

import java.util.*;

@RestController
@RequestMapping("/bookmarks")
public class BookmarkController {

    private BookmarkService bookmarkService;
    private UserService userService;

    @Autowired
    public BookmarkController(BookmarkService bookmarkService, UserService userService) {
        this.bookmarkService = bookmarkService;
        this.userService = userService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(method = RequestMethod.GET)
    public List<Bookmark> findAll() {

        return bookmarkService.findAll();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Bookmark> save(@RequestBody Bookmark bookmark) {
        Bookmark bookmarkForSave;
        Bookmark uniqueBookmark = bookmarkService.findByUrl(bookmark.getUrl());
        bookmark.setImported(false);

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
        User userDeleting = userService.findByUserName(getLoggedUserName());

        if (isUserAdmin(userDeleting) || forDelete.getUser().equals(userDeleting)) {
            bookmarkService.delete(id);
            return new ResponseEntity(HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.UNAUTHORIZED);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Bookmark> update(@RequestBody Bookmark bookmark) {
        User tempUser = userService.findByUserName(bookmark.getUser().getUsername());

        if (tempUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        bookmark.setUser(tempUser);
        //Change(add every field)
        Bookmark updatedBookmark = bookmarkService.save(bookmark);

        if (updatedBookmark == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(updatedBookmark, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @RequestMapping(path = "/user", method = RequestMethod.GET)
    public ResponseEntity<List<Bookmark>> findByUsername() {
        User user = userService.findByUserName(getLoggedUserName());

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<Bookmark> bookmarksFromUser = bookmarkService.findAllByUser(user);

        return new ResponseEntity<>(bookmarksFromUser, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @RequestMapping(path = ("/public"), method = RequestMethod.GET)
    public ResponseEntity<List<Bookmark>> findAllByPublicWithoutUser() {
        User user = userService.findByUserName(getLoggedUserName());
        if (user == null) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.BAD_REQUEST);
        }

        List<Bookmark> bookmarks = bookmarkService.findAllByPublicWithoutUser(user);

        if (!isUserAdmin(userService.findByUserName(getLoggedUserName()))) {
            for (Bookmark b : bookmarks) {
                b.getUser().setPassword("********");
            }
        }

        return new ResponseEntity<>(bookmarks, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @RequestMapping(path = "/{id}", method = RequestMethod.POST)
    public ResponseEntity<Bookmark> importBookmark(@PathVariable("id") Long id) {
        Bookmark bookmarkSource = bookmarkService.findOne(id);
        Set<Rating> ratingsSet = new HashSet<>();

        bookmarkSource.setImported(true);

        bookmarkService.save(bookmarkSource);

        Bookmark bookmarkToImport = new Bookmark();
        User userImporting = userService.findByUserName(getLoggedUserName());

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
        bookmarkToImport.setRating(bookmarkSource.getRating());
        bookmarkToImport.setTimesRated(bookmarkSource.getTimesRated());

        ratingsSet.addAll(bookmarkSource.getRatings());
        bookmarkToImport.setRatings(ratingsSet);

        Bookmark bookmarkForSave = bookmarkService.save(bookmarkToImport);

        if(bookmarkForSave == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(bookmarkForSave, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @RequestMapping(path = "/{id}/comments", method = RequestMethod.GET)
    public ResponseEntity<Set<Comment>> findAllCommentsFromBookmark(@PathVariable Long id) {
        Bookmark bookmark = bookmarkService.findOne(id);

        if (bookmark == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        for (Comment c : bookmark.getComments()) {
            c.getUser().setPassword("********");
        }

        return new ResponseEntity<>(bookmark.getComments(), HttpStatus.OK);
    }

    private boolean isUserAdmin(User user) {
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
}
