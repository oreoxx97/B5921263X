package com.example.map.entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;

import java.sql.Date;
import java.time.Instant;
import java.util.Set;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import java.util.Collection;

@Data
//@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "member")
public class Member {

    @Id
    @SequenceGenerator(name="member_seq",sequenceName="member_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "member_seq")
    private @NonNull Long id;

    private String username;
    private String password;
    private String idcard;
    private String firstname;
    private String lastname; 
    private String email;
    private String birthday;

    public Member(){}

    public Member(String username,String password,String idcard, String firstname,String lastname, String email, String birthday){
        this.username = username;
        this.password = password;
        this.idcard = idcard;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.birthday = birthday;

    }
 

    public void setID(Long id){
        this.id = id;
    }

    public Long getId(){return id;}
    public void setBirthday(String birthday){
        this.birthday = birthday;
    }
    public String getBirthday(){return birthday;}

    public void setUsername(String username){
        this.username = username;
    }
    public String getUsername(){return username;}

    public void setPassword(String password){
        this.password = password;
    }
    public String getPassword(){return password;}

    public void setIdcard(String idcard){
        this.idcard = idcard;
    }
    public String getIdcrad(){return idcard;}

    public void setFirstname(String firstname){
        this.firstname = firstname;
    }
    public String getFirstname(){return firstname;}

    public void setLastname(String lastname){
        this.lastname = lastname;
    }
    public String getLastname(){return lastname;}


    public void setEmail(String email){
        this.email = email;
    }
    public String getEmail(){return email;}
 




	
}