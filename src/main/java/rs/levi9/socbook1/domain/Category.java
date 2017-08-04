package rs.levi9.socbook1.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.UniqueConstraint;

import org.hibernate.validator.constraints.Length;

@Entity
public class Category extends BaseEntity {
	
	@Length(min=2, max=30)
    @Column(nullable = false, unique = true)
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
