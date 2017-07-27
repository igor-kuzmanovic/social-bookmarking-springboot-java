package rs.levi9.socbook1.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rs.levi9.socbook1.domain.Bookmark;
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

    @RequestMapping(method = RequestMethod.GET)
    public List<Bookmark> findAll() {
        return bookmarkService.findAll();
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Bookmark> findOne(@PathVariable("id") Long id) {
        Bookmark bookmark = bookmarkService.findOne(id);

        if(bookmark == null) {
            return new ResponseEntity<>(HttpStatus.FOUND);
        }

        return new ResponseEntity<>(bookmark, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Bookmark> save(@RequestBody Bookmark bookmark) {
        Bookmark bookmarkForSave;
        Bookmark uniqueBookmark = bookmarkService.findByUrl(bookmark.getUrl());
        bookmark.setImported(false);

        User tempUser = userService.findByUserName(bookmark.getUser().getUsername());
        if (tempUser == null) {
            return new ResponseEntity<Bookmark>(HttpStatus.BAD_REQUEST);
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

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity delete(@PathVariable Long id) {
        Bookmark forDelete = bookmarkService.findOne(id);
        List<Bookmark> allBookmarks = bookmarkService.findAll();
        boolean hasBookmark = false;

        for (Tag tag : forDelete.getTags()) {
            for(Bookmark bookmark: allBookmarks) {
                Set<Tag> bookmarkTags = bookmark.getTags();
                for(Tag bookmarkTag: bookmarkTags) {
                    if(tag.getId() == bookmarkTag.getId()) {
                        hasBookmark = true;
                    }
                }
            }
            if(!hasBookmark) {
                tagService.delete(tag.getId());
            }
        }

        bookmarkService.delete(id);

        return new ResponseEntity(HttpStatus.OK);
    }

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

    @RequestMapping(path = "/user/{username}", method = RequestMethod.GET)
    public List<Bookmark> findByUsername(@PathVariable String username) {
        User user = userService.findByUserName(username);

        return bookmarkService.findAllByUser(user);
    }

    @RequestMapping(path = ("/public/{username}"), method = RequestMethod.GET)
    public List<Bookmark> findAllByPublic(@PathVariable String username) {
        User user = userService.findByUserName(username);
        if (user == null) {
            return Collections.emptyList();
        }

        List<Bookmark> bookmarks = bookmarkService.findAllByPublic(user);

//        for (Bookmark b : bookmarks) {
//            if (b.isImported() && bookmarkService.findByUserAndUrl(user, b.getUrl()) != null) {
//                bookmarks.remove(b);
//            }
//        }

        return bookmarks;
    }

    @RequestMapping(path = "/{username}/{id}", method = RequestMethod.POST)
    public ResponseEntity<Bookmark> importBookmark(@PathVariable("username") String username, @PathVariable("id") Long id) {
        Bookmark bookmarkSource = bookmarkService.findOne(id);
        bookmarkSource.setImported(true);
        bookmarkService.save(bookmarkSource);

        Bookmark bookmarkToImport = new Bookmark();
        User userImporting = userService.findByUserName(username);

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
}
