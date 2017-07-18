package rs.levi9.socbook1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.levi9.socbook1.domain.User;
import rs.levi9.socbook1.repository.UserRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findOne(Long id) {
        return userRepository.findOne(id);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void delete(Long id) {
        userRepository.delete(id);
    }
}
