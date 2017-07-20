package rs.levi9.socbook1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.levi9.socbook1.domain.Bookmark;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

}