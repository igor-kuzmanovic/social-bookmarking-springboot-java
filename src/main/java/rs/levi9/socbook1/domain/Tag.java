package rs.levi9.socbook1.domain;

import javax.persistence.*;
import java.util.Set;

import org.hibernate.validator.constraints.Length;

@Entity
public class Tag extends BaseEntity {
	
	@Length(min=2, max=30)
	@Column(nullable = false)
	private String text;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
	
}
