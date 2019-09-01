package com.example.map;
import com.example.map.entity.*;
import com.example.map.repository.*;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MapApplication {

	public static void main(String[] args) {
		SpringApplication.run(MapApplication.class, args);
	}

	@Bean
	ApplicationRunner init(MemberRepository memberRepository){
		return args -> {
			

			//------------------ Member --------------------
			Member member1 = new Member("test1","123456","12365478596321","Fisrt","Last","first@hotmail.com","2017-05-25");
			memberRepository.save(member1);

			Member member2 = new Member("test2","123456","12365478006321","Firstone","Lasttwo","firstone@hotmail.com","2017-05-25");
			memberRepository.save(member2);
			

		};
	}

}
