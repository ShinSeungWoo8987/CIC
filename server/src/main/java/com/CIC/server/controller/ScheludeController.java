package com.CIC.server.controller;

import java.util.HashMap;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

import com.CIC.server.service.CICService;

import net.nurigo.java_sdk.api.Message;

@RestController(value = "scheduleController")
public class ScheludeController {
	
	@Autowired
	private CICService cicService;

	// 초 분 시 일 월 요일
	@Scheduled(cron = "30 32 21 * * ?")
	public void sendSMSAboutClosedProject() {
		/*
		String k1 = "응~ 안알려줄거야~~~";
		String k2 = "응~ 안알려줄거야~~~";
		Message coolsms = new Message(k1, k2);
		
		HashMap<String, String> parameters = new HashMap<String, String>();
		parameters.put("to", "112");
		parameters.put("from", "119");
		parameters.put("type", "SMS");
		parameters.put("text", "침입자를 잡아주세요!!!");
		parameters.put("app_version", "test app 1.2");
		
		try {
			JSONObject obj = (JSONObject)coolsms.send(parameters);
			System.out.println("----- obj.toString -----");
			System.out.println(obj.toString());
		}catch (Exception e) {
			System.out.println(e.getMessage());
		}
		*/
	}
}
