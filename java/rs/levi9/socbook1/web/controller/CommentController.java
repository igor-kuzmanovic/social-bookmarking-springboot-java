package rs.levi9.socbook1.web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rs.levi9.socbook1.domain.Bookmark;
import rs.levi9.socbook1.domain.Comment;
import rs.levi9.socbook1.service.BookmarkService;
import rs.levi9.socbook1.service.CommentService;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    private CommentService commentService;
    private BookmarkService bookmarkService;

    public CommentController(CommentService commentService, BookmarkService bookmarkService) {
        this.commentService = commentService;
        this.bookmarkService = bookmarkService;
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<List<Comment>> findAllByBookmarkId(@PathVariable("id") Long id) {
        List<Comment> commentsFromBookmark = commentService.findAllByBookmarkId(id);

        if(commentsFromBookmark == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(commentsFromBookmark, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Comment> save(@RequestBody Comment comment) {
        //Only bookmarks id is sent by frontend, so this will find bookmark by that id and save it to comment.
        Bookmark commentsBookmark = bookmarkService.findOne(comment.getBookmark().getId());

        if(commentsBookmark == null) {
            return new ResponseEntity<Comment>(HttpStatus.BAD_REQUEST);
        }

        comment.setBookmark(commentsBookmark);
        Comment savedComment = commentService.save(comment);

        if(savedComment == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<Comment>(comment, HttpStatus.OK);
    }
}
