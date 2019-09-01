package com.example.map.repository;

import java.util.Optional;

import com.example.map.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
public interface InsertRepository extends JpaRepository <Insert,Long> {

}