package rs.levi9.socbook1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.levi9.socbook1.domain.Bookmark;
import rs.levi9.socbook1.domain.User;

import java.util.List;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    List<Bookmark> findAllByUser(User user);
    List<Bookmark> findAllByIsPublicTrueAndUserNot(User user);
    Bookmark findByUserIsAndUrlIs(User user, String url);
    Bookmark findByUrl(String url);
    Bookmark findByUserAndUrl(User user, String url);
}
