package rs.levi9.socbook1.domain;

import org.hibernate.annotations.*;
import org.hibernate.annotations.CascadeType;
import org.hibernate.validator.constraints.Length;
import org.springframework.beans.factory.annotation.Value;

import java.util.Date;
import java.util.Set;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Entity
public class Bookmark extends BaseEntity {

	@Column(nullable = false)
	private String url;
	
	@Length(min=2, max=100)
	@Column(nullable = false)
	private String title;
	
	@Column(nullable = false)
	private Date date;

	@Column(nullable = false)
	private boolean imported;
	
	@Column(nullable = true)
	private String description;
	 
	@Column(nullable = false)
	private boolean isPublic;

	@Min(0)
	@Max(5)
	private Integer rating;

	@Column(name = "times_rated")
	private Integer timesRated;

	@Column(name = "rate_sum")
	private Integer rateSum;

	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false)
	private Category category;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Cascade(CascadeType.ALL)
	@ManyToMany
	@JoinTable(joinColumns = @JoinColumn(name = "bookmark_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
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

	public Set<Tag> getTags() {
		return tags;
	}

	public void setTags(Set<Tag> tags) {
		this.tags = tags;
	}

	public boolean isPublic() {
		return isPublic;
	}

	public void setPublic(boolean aPublic) {
		isPublic = aPublic;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

    public boolean isImported() {
        return imported;
    }

    public void setImported(boolean imported) {
        this.imported = imported;
    }

	public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}

	public Integer getTimesRated() {
		return timesRated;
	}

	public void setTimesRated(Integer timesRated) {
		this.timesRated = timesRated;
	}

	public Integer getRateSum() {
		return rateSum;
	}

	public void setRateSum(Integer rateSum) {
		this.rateSum = rateSum;
	}
}
