package com.CIC.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CicServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CicServerApplication.class, args);
	}
}
