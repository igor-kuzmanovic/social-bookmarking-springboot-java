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

    public List<Comment> findAllByBookmarkId(Long id) {
        return this.commentRepository.findAllByBookmarkId(id);
    }

    public Comment save(Comment comment) {
        return this.commentRepository.save(comment);
    }
}
