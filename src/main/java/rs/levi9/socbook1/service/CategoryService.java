package rs.levi9.socbook1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.levi9.socbook1.domain.Category;
import rs.levi9.socbook1.repository.CategoryRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class CategoryService {

    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    public void delete(Long id) {
        categoryRepository.delete(id);
    }

    public Category findByName(String name) {
        return categoryRepository.findByName(name);
    }

    public Category findOne(Long id) {
        return categoryRepository.findOne(id);
    }
}
