package rs.levi9.socbook1.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rs.levi9.socbook1.domain.Tag;
import rs.levi9.socbook1.service.TagService;

import java.util.List;

@RestController
@RequestMapping("/tags")
public class TagController {

    private TagService tagService;

    @Autowired
    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(method = RequestMethod.GET)
    public List<Tag> findAll() {
        return tagService.findAll();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Tag> save(@RequestBody Tag tag) {
        Tag tagForSave = tagService.save(tag);

        if(tagForSave == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(tagForSave, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity delete(@PathVariable("id") Long id) {
        tagService.delete(id);

        return new ResponseEntity(HttpStatus.OK);
    }
}
