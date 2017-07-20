package rs.levi9.socbook1.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
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

    @RequestMapping(method = RequestMethod.GET)
    public List<Tag> findAll() {
        return tagService.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Tag> save(@RequestBody Tag tag) {
        Tag tagForSave = tagService.save(tag);

        if(tagForSave == null) {
            return new ResponseEntity<Tag>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<Tag>(tagForSave, HttpStatus.OK);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity delete(Long id) {
        tagService.delete(id);

        return new ResponseEntity(HttpStatus.OK);
    }
}
