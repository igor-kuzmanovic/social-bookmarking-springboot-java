package rs.levi9.socbook1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.levi9.socbook1.domain.Bookmark;
import rs.levi9.socbook1.domain.Comment;
import rs.levi9.socbook1.repository.BookmarkRepository;
import rs.levi9.socbook1.repository.CommentRepository;
import rs.levi9.socbook1.repository.TagRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class BookmarkService  {

    private BookmarkRepository bookmarkRepository;
    private CommentRepository commentRepository;
    private TagRepository tagRepository;

    @Autowired
    public BookmarkService(BookmarkRepository bookmarkRepository, CommentRepository commentRepository, TagRepository tagRepository) {
        this.bookmarkRepository = bookmarkRepository;
        this.commentRepository = commentRepository;
        this.tagRepository = tagRepository;
    }

    public List<Bookmark> findAll() {
        return bookmarkRepository.findAll();
    }

    public Bookmark findOne(Long id) {
        return bookmarkRepository.findOne(id);
    }

    public Bookmark save(Bookmark bookmark) {
        return bookmarkRepository.save(bookmark);
    }

    public void delete(Long id) {
        commentRepository.deleteByBookmarkId(id);
        bookmarkRepository.delete(id);
    }
}
