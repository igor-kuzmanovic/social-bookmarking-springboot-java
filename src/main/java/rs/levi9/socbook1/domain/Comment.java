package rs.levi9.socbook1.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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
