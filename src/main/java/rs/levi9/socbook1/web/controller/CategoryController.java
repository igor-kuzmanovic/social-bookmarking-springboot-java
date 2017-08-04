package rs.levi9.socbook1.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rs.levi9.socbook1.domain.Bookmark;
import rs.levi9.socbook1.domain.Category;
import rs.levi9.socbook1.service.BookmarkService;
import rs.levi9.socbook1.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private CategoryService categoryService;
    private BookmarkService bookmarkService;

    @Autowired
    public CategoryController(CategoryService categoryService, BookmarkService bookmarkService) {
        this.categoryService = categoryService;
        this.bookmarkService = bookmarkService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @RequestMapping(method = RequestMethod.GET)
    public List<Category> findAll() {
        return categoryService.findAll();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Category> save(@RequestBody Category category) {
        Category foundCategory = categoryService.findByName(category.getName());

        if (foundCategory == null) {
            Category cat = categoryService.save(category);
            return new ResponseEntity<>(cat, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Category> update(@RequestBody Category category) {
        Category uncategorized = categoryService.findByName("Uncategorized");

        if (categoryService.findByName(category.getName()) != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (category.getId().equals(uncategorized.getId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Category updatedCategory = categoryService.save(category);

        if (updatedCategory == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(path = "{id}", method = RequestMethod.DELETE)
    public ResponseEntity delete(@PathVariable("id") Long id) {
        List<Bookmark> bookmarksWithCategory = bookmarkService.findAllBookmarksByCategory(id);
        Category uncategorized = categoryService.findByName("Uncategorized");
        Category forDelete = categoryService.findOne(id);

        if (forDelete.equals(uncategorized)) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        for (Bookmark b : bookmarksWithCategory) {
            b.setCategory(uncategorized);
        }

        categoryService.delete(id);

        return new ResponseEntity(HttpStatus.OK);
    }
}
