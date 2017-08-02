package rs.levi9.socbook1.domain;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;

@Entity
public class User extends BaseEntity {
	
	@Length(min=2, max=30)
	@Column(nullable = false)
	private String username;
	
	@Length(min=5, max=30)
	@Column(nullable = false)
	private String password;

	@Length(min=2, max=30)
	@Column(nullable = false)
	private String firstName;

	@Length(min=2, max=30)
	@Column(nullable = false)
	private String lastName;
	
	@Email
	@Column(nullable = false)
	private String email;

	@ManyToOne
	@JoinColumn(name = "status_id", nullable = false)
	private UserStatus userStatus;
	 
	@ManyToMany
	@JoinTable(joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles;

	public String getUsername() {
	     return username;
	 }

	public void setUsername(String username) {
		 this.username = username;
	 }

	public String getPassword() {
		 return password;
	 }

	public void setPassword(String password) {
		 this.password = password;
	 }

	public String getFirstName() {
		 return firstName;
	 }

	public void setFirstName(String firstName) {
		 this.firstName = firstName;
	 }

	public String getLastName() {
		 return lastName;
	 }

	public void setLastName(String lastName) {
		 this.lastName = lastName;
	 }

	public String getEmail() {
		 return email;
	 }

	public void setEmail(String email) {
		 this.email = email;
	 }
	  
	public UserStatus getUserStatus() {
		 return userStatus;
	 }

	public void setUserStatus(UserStatus userStatus) {
		 this.userStatus = userStatus;
	 }

	public Set<Role> getRoles() {
		 return roles;
	 }

	public void setRoles(Set<Role> roles) {
		 this.roles = roles;
	 }
}
