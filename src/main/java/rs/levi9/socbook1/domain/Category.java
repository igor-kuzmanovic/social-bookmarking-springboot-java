package rs.levi9.socbook1.domain;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class Category extends BaseEntity {

    @Column(nullable = false)
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
