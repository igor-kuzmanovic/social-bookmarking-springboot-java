package rs.levi9.socbook1.service;

import org.springframework.stereotype.Service;
import rs.levi9.socbook1.domain.Comment;
import rs.levi9.socbook1.repository.CommentRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class CommentService {

    private CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> findAll() {
        return commentRepository.findAll();
    }

    public Comment save(Comment comment) {
        return commentRepository.save(comment);
    }

    public void delete(Long id) {
        commentRepository.delete(id);
    }

    public Comment findOne(Long id) {
        return commentRepository.findOne(id);
    }
}
