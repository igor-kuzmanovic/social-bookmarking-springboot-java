package rs.levi9.socbook1.service;

import org.springframework.stereotype.Service;
import rs.levi9.socbook1.domain.Bookmark;
import rs.levi9.socbook1.domain.Rating;
import rs.levi9.socbook1.domain.User;
import rs.levi9.socbook1.repository.BookmarkRepository;
import rs.levi9.socbook1.repository.RatingRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class RatingService {

    private RatingRepository ratingRepository;
    private BookmarkRepository bookmarkRepository;

    public RatingService(RatingRepository ratingRepository, BookmarkRepository bookmarkRepository) {
        this.ratingRepository = ratingRepository;
        this.bookmarkRepository = bookmarkRepository;
    }

    public Rating save(Rating rating) {
        return ratingRepository.save(rating);
    }

    public Rating findOne(Long id) {
        return ratingRepository.findOne(id);
    }

    public void delete(Long id) {

        ratingRepository.delete(id);
    }

    public List<Rating> findAll() {
        return ratingRepository.findAll();
    }

    public List<Rating> findAllRatingsByUser(User user) {
        return ratingRepository.findAllByUser(user);
    }
}
