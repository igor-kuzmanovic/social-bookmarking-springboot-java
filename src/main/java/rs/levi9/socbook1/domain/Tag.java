package rs.levi9.socbook1.domain;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Tag extends BaseEntity {

	@Column(nullable = false)
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
