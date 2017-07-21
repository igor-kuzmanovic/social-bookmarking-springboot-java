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

import java.awt.print.Book;
import java.util.HashSet;
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
        Set<Tag> tagExists = new HashSet<>();
        for (Tag tag : bookmark.getTags()) {
            Tag foundTag = tagService.findByName(tag.getName());
            if (foundTag == null) {
                tagService.save(tag);
                tagExists.add(tag);
            } else {
                tagExists.add(foundTag);
            }
        }

        bookmark.setTags(tagExists);

        //Save user when only username is sent.
        User tempUser = userService.findByUserName(bookmark.getUser().getUsername());
        bookmark.setUser(tempUser);

        Bookmark bookmarkForSave = bookmarkService.save(bookmark);

        if(bookmarkForSave == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(bookmarkForSave, HttpStatus.OK);
    }

    @RequestMapping(path = ("/{id}"), method = RequestMethod.DELETE)
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
            if(hasBookmark) {
                tagService.delete(tag.getId());
            }
        }

        bookmarkService.delete(id);

        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Bookmark update(@RequestBody Bookmark bookmark) {
        return bookmarkService.save(bookmark);
    }
}
