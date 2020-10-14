package com.CIC.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CicServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CicServerApplication.class, args);
		System.out.println(org.springframework.core.SpringVersion.getVersion());
	}

}
