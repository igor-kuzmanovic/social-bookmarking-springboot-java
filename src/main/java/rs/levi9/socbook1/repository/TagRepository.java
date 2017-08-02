package rs.levi9.socbook1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.levi9.socbook1.domain.Tag;

import java.util.Set;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findByText(String text);
}
