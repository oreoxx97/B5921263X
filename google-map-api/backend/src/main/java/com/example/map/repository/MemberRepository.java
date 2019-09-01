package com.example.map.repository;

import java.util.Optional;

import com.example.map.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
public interface MemberRepository extends JpaRepository <Member,Long> {
    Member findById(long id);
    
    @Query(value = "SELECT u FROM Member u WHERE u.username = :username  AND u.password = :password")
    Member findByUsernameAndPassword(@Param("username")String username, 
            @Param("password") String password);



    
}