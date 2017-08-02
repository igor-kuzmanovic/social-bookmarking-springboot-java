package rs.levi9.socbook1.domain;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.Date;

@Entity
public class Comment extends BaseEntity {

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Date date;

    @Cascade(CascadeType.ALL)
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
