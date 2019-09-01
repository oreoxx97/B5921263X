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
@Table(name = "Insert")
public class Insert {

    @Id
    @SequenceGenerator(name="Insert_seq",sequenceName="Insert_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Insert_seq")
    private @NonNull Long id;

    private String  name;
    private String distance;
   
    @OneToOne(fetch = FetchType.EAGER, targetEntity = Member.class)
	@JoinColumn(name = "Member_ID", insertable = true)
	private Member memberid;
	private String membername;



    public Insert(){}

   public void setMemberid(Member id){
    this.memberid = id;
   }
   public Member getMemberid(){return memberid;}

   public void setMembername(String name){
       this.membername = name;
   }
   public String getMembername(){return membername;}

    public void setID(Long id){
        this.id = id;
    }

    public Long getId(){return id;}

    public void setName(String name){
        this.name = name;
    }
    public String getName(){return name;}

    public void setDistance(String distance){
        this.distance = distance;
    }
    public String getDistance(){return distance;}



	
}