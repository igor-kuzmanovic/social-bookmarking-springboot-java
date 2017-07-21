package rs.levi9.socbook1.domain;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Tag extends BaseEntity {

	@Column(nullable = false)
	private String name;

//	@ManyToMany
//	@JoinTable(joinColumns = @JoinColumn(name = "tag_id"), inverseJoinColumns = @JoinColumn(name = "bookmark_id"))
//	private Set<Bookmark> bookmarks;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
