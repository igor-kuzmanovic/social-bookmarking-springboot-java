package rs.levi9.socbook1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.levi9.socbook1.domain.Rating;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
}
