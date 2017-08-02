package rs.levi9.socbook1.web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import rs.levi9.socbook1.domain.Bookmark;
import rs.levi9.socbook1.domain.Rating;
import rs.levi9.socbook1.domain.Role;
import rs.levi9.socbook1.domain.User;
import rs.levi9.socbook1.service.BookmarkService;
import rs.levi9.socbook1.service.RatingService;
import rs.levi9.socbook1.service.UserService;

@RestController
@RequestMapping("/rating")
public class RatingController {

    private RatingService ratingService;
    private UserService userService;
    private BookmarkService bookmarkService;

    public RatingController(RatingService ratingService, UserService userService, BookmarkService bookmarkService) {
        this.ratingService = ratingService;
        this.userService = userService;
        this.bookmarkService = bookmarkService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @RequestMapping(path = "/{bookmark_id}/{user_id}", method = RequestMethod.POST)
    public ResponseEntity save(@RequestBody Rating rating, @PathVariable("user_id") Long userId, @PathVariable("bookmark_id") Long bookmarkId) {
        User userRating = userService.findOne(userId);
        Bookmark bookmarkRated = bookmarkService.findOne(bookmarkId);

        if (!userRating.equals(userService.findByUserName(getLoggedUserName())) || bookmarkRated.getUser().equals(userRating)) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        for (Rating r : bookmarkRated.getRatings()) {
            if (userRating.equals(r.getUser())) {
                return new ResponseEntity(HttpStatus.BAD_REQUEST);
            }
        }

        bookmarkRated.setTimesRated(bookmarkRated.getTimesRated() + 1);
        rating.setUser(userRating);
        bookmarkRated.getRatings().add(rating);

        ratingService.save(rating);
        bookmarkService.save(bookmarkRated);

        //Maybe return whole getBookmarkRating body (avg)?
        return new ResponseEntity(HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @RequestMapping(path = "/{bookmark_id}/{user_id}", method = RequestMethod.PUT)
    public ResponseEntity updateRating(@RequestBody Rating rating, @PathVariable("bookmark_id") Long bookmarkId, @PathVariable("user_id") Long userId) {
        Rating ratingForUpdate = new Rating();
        Bookmark bookmark = bookmarkService.findOne(bookmarkId);
        User userUpdating = userService.findOne(userId);

        for (Rating r : bookmark.getRatings()) {
            if (r.getUser().equals(userUpdating)) {
                ratingForUpdate = r;
            }
        }

        ratingForUpdate.setRate(rating.getRate());

        ratingService.save(ratingForUpdate);

        return new ResponseEntity(HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @RequestMapping(path = "/{bookmark_id}", method = RequestMethod.GET)
    public ResponseEntity<Integer> getBookmarkRating(@PathVariable("bookmark_id") Long id) {
        Bookmark bookmark = bookmarkService.findOne(id);
        Integer rateSum = 0;

        for (Rating r : bookmark.getRatings()) {
            rateSum = rateSum + r.getRate();
        }

        return new ResponseEntity<>(rateSum / bookmark.getTimesRated(), HttpStatus.OK);
    }

    private String getLoggedUserName() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getName();
    }

    private boolean isUserAdmin(User user) {
        for (Role role : user.getRoles()) {
            if (role.getType().equals(Role.RoleType.ROLE_ADMIN)) {
                return true;
            }
        }
        return false;
    }
}
