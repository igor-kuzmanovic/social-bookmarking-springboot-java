package rs.levi9.socbook1.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rs.levi9.socbook1.domain.Bookmark;
import rs.levi9.socbook1.service.BookmarkService;

import java.util.List;

@RestController
@RequestMapping("/bookmarks")
public class BookmarkController {

    private BookmarkService bookmarkService;

    @Autowired
    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Bookmark> findAll() {
        return bookmarkService.findAll();
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Bookmark> findOne(@PathVariable("id") Long id) {
        Bookmark bookmark = bookmarkService.findOne(id);

        if(bookmark == null) {
            return new ResponseEntity<Bookmark>(HttpStatus.FOUND);
        }

        return new ResponseEntity<Bookmark>(bookmark, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Bookmark> save(@RequestBody Bookmark bookmark) {
        Bookmark bookmarkForSave = bookmarkService.save(bookmark);

        if(bookmarkForSave == null) {
            return new ResponseEntity<Bookmark>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<Bookmark>(bookmarkForSave, HttpStatus.OK);
    }

    @RequestMapping(path = ("/{id}"), method = RequestMethod.DELETE)
    public ResponseEntity delete(@PathVariable Long id) {
        bookmarkService.delete(id);

        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Bookmark update(@RequestBody Bookmark bookmark) {
        return bookmarkService.save(bookmark);
    }
}
