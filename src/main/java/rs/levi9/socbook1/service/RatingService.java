package rs.levi9.socbook1.service;

import org.springframework.stereotype.Service;
import rs.levi9.socbook1.domain.Rating;
import rs.levi9.socbook1.repository.RatingRepository;

import javax.transaction.Transactional;

@Transactional
@Service
public class RatingService {

    private RatingRepository ratingRepository;

    public RatingService(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
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
}
