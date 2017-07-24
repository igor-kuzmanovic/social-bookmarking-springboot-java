package rs.levi9.socbook1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.levi9.socbook1.domain.Bookmark;
import rs.levi9.socbook1.domain.Comment;
import rs.levi9.socbook1.domain.Tag;
import rs.levi9.socbook1.domain.User;
import rs.levi9.socbook1.repository.BookmarkRepository;
import rs.levi9.socbook1.repository.CommentRepository;
import rs.levi9.socbook1.repository.TagRepository;
import rs.levi9.socbook1.repository.UserRepository;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Transactional
@Service
public class BookmarkService  {

    private BookmarkRepository bookmarkRepository;
    private CommentRepository commentRepository;
    private TagRepository tagRepository;
    private UserRepository userRepository;

    @Autowired
    public BookmarkService(BookmarkRepository bookmarkRepository, CommentRepository commentRepository, TagRepository tagRepository, UserRepository userRepository) {
        this.bookmarkRepository = bookmarkRepository;
        this.commentRepository = commentRepository;
        this.tagRepository = tagRepository;
        this.userRepository = userRepository;
    }

    public List<Bookmark> findAll() {
        return bookmarkRepository.findAll();
    }

    public Bookmark findOne(Long id) {
        return bookmarkRepository.findOne(id);
    }

    public Bookmark save(Bookmark bookmark) {
        Set<Tag> tagExists = new HashSet<>();
        for (Tag tag : bookmark.getTags()) {
            Tag foundTag = tagRepository.findByName(tag.getName());
            if (foundTag == null) {
                tagRepository.save(tag);
                tagExists.add(tag);
            } else {
                tagExists.add(foundTag);
            }
        }

        bookmark.setTags(tagExists);

        //Save user when only username is sent.
        User tempUser = userRepository.findByUsername(bookmark.getUser().getUsername());
        bookmark.setUser(tempUser);

        return bookmarkRepository.save(bookmark);
    }

    public void delete(Long id) {
        //Delete all comments before deleting bookmark.
        commentRepository.deleteByBookmarkId(id);

        bookmarkRepository.delete(id);
    }
}
