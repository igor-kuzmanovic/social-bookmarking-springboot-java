package rs.levi9.socbook1.domain;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import javax.persistence.*;

@Entity
public class Comment extends BaseEntity {
	
	@Column(nullable = false)
	private String name;

	@ManyToOne
	@JoinColumn(name = "bookmark_id", nullable = false)
	private Bookmark bookmark;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Bookmark getBookmark() {
		return bookmark;
	}

	public void setBookmark(Bookmark bookmark) {
		this.bookmark = bookmark;
	}
	
	
}
