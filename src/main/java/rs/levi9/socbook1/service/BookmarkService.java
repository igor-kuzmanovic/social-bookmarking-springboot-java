package rs.levi9.socbook1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.levi9.socbook1.domain.*;
import rs.levi9.socbook1.repository.BookmarkRepository;
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
    private TagRepository tagRepository;
    private UserRepository userRepository;

    @Autowired
    public BookmarkService(BookmarkRepository bookmarkRepository, TagRepository tagRepository, UserRepository userRepository) {
        this.bookmarkRepository = bookmarkRepository;
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

        return bookmarkRepository.save(bookmark);
    }

    public void delete(Long id) {
        Bookmark forDelete = bookmarkRepository.findOne(id);
        List<Bookmark> allBookmarks = bookmarkRepository.findAll();
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
                tagRepository.delete(tag.getId());
            }
        }
        bookmarkRepository.delete(id);
    }

    public List<Bookmark> findAllByUser(User user) {
        return bookmarkRepository.findAllByUser(user);
    }

    public List<Bookmark> findAllByPublicWithoutUser(User user) {
        return bookmarkRepository.findAllByIsPublicTrueAndUserNot(user);
    }

    public Bookmark findByUrl(String url) {
        return bookmarkRepository.findByUrl(url);
    }

    public Bookmark findBookmarkByUserAndUrl(User user, String url) {
        return bookmarkRepository.findByUserAndUrl(user, url);
    }

    public Bookmark findByUserAndUrl(User user, String url) {
        return bookmarkRepository.findByUserIsAndUrlIs(user, url);
    }

    public Long countBookmarksByCategory(Long id) {
        return bookmarkRepository.countAllBookmarksByCategoryId(id);
    }
}
