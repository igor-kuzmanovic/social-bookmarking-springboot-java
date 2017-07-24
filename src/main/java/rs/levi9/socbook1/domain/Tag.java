package rs.levi9.socbook1.domain;

import javax.persistence.*;
import java.util.Set;

import org.hibernate.validator.constraints.Length;

@Entity
public class Tag extends BaseEntity {
	
	@Length(max=30)
	@Column(nullable = false)
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
