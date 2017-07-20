package rs.levi9.socbook1.domain;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
public class Bookmark extends BaseEntity {
	
	 @Column(nullable = false)
	 private String url;
	 
	 @Column(nullable = false)
	 private String title;
	 
	 @Column(nullable = false)
	 private String author;
	 
	 @Column(nullable = false)
	 private Date date;
	 
	 @Column(nullable = false)
	 private String description;
	 
	 @Column(nullable = false)
	 private String visibility;
	 
	 @ManyToMany
	    @JoinTable(joinColumns = @JoinColumn(name = "bookmark_id"),
	            inverseJoinColumns = @JoinColumn(name = "tag_id"))
	    private Set<Tag> tags;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getVisibility() {
		return visibility;
	}

	public void setVisibility(String visibility) {
		this.visibility = visibility;
	}

	public Set<Tag> getTags() {
		return tags;
	}

	public void setTags(Set<Tag> tags) {
		this.tags = tags;
	}
	  
	
}
