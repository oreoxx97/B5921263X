package com.example.map.controller;

import com.example.map.entity.*;
import com.example.map.repository.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
class MemberController {

    private final Logger log = LoggerFactory.getLogger(MemberController.class);
    private MemberRepository memberRepository;
    private InsertRepository insertRepository;

   

    public MemberController(MemberRepository memberRepository ,InsertRepository insertRepository){
        this.memberRepository = memberRepository;
        this.insertRepository = insertRepository;
    }
        

    @GetMapping("/members")
    Collection<Member> members() {
        return memberRepository.findAll();
    }

    @GetMapping("/username/{username}/{password}") //login
    public Member getUser(@PathVariable String username, @PathVariable String password) {
        Member user = memberRepository.findByUsernameAndPassword(username,password);
        return user;
    }

    @GetMapping("/findMember/{memberid}")
    Member getMember(@PathVariable long memberid) {
          Member m = memberRepository.findById(memberid);
        return m;
    }


    @PostMapping("/memberx")
    Member createMember(@Valid @RequestBody Member Member) throws URISyntaxException {
        log.info("Request to create Member: {}", Member);
        Member result = memberRepository.save(Member);
        return result;
    }

    @PostMapping("/insertx/{memberid}")
    Insert createInsert(@Valid @RequestBody Insert Insert,@PathVariable int memberid) throws URISyntaxException {
       
       
            Member id = memberRepository.findById(memberid);
            Insert.setMemberid(id);
            Insert.setMembername(id.getFirstname());
            log.info("Request to create Insert: {}", Insert);
          
       
        



        Insert result = insertRepository.save(Insert);
        return result;
    }


  

}