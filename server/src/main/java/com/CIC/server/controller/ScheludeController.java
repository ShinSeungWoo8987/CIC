package com.CIC.server.controller;

import java.util.HashMap;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

import com.CIC.server.model.FundingMember;
import com.CIC.server.model.Schedule;
import com.CIC.server.service.CICService;

import net.nurigo.java_sdk.api.Message;

@RestController(value = "scheduleController")
public class ScheludeController {
	
	String k1 = "응~ 안알려줄거야~~~";
	String k2 = "응~ 안알려줄거야~~~";
	Message coolsms = new Message(k1, k2);
	
	String fromPhone = "";
	
	@Autowired
	private CICService cicService;

	int cnt = 0;
	// 초 분 시 일 월 요일
	@Scheduled(cron = "0 * * * * ?")
	public void sendSMSAboutClosedProject() {
		
		System.out.println(cnt+++"분");
		
		List<Schedule> result = cicService.getProjectResult();
		for(int i=0; i<result.size(); i++) {
			String pro_number = result.get(i).getPro_number();
			List<FundingMember> fundingJoinList = cicService.getFundingJoinList(pro_number);
			for(int j=0; j<fundingJoinList.size(); j++) {
				String toPhone = fundingJoinList.get(j).getPhone();
				String message = fundingJoinList.get(j).getName()+"님께서 신청하신 '"+result.get(i).getPro_title()+"'은 "+result.get(i).getMessage();
				
				System.out.println("------------------------------------------------");
				System.out.println("message : "+message);
				System.out.println("toPhone : "+toPhone);
				System.out.println("------------------------------------------------");
				System.out.println();
				
				/*
				HashMap<String, String> parameters = new HashMap<String, String>();
				parameters.put("to", toPhone);
				parameters.put("from", fromPhone);
				parameters.put("type", "SMS");
				parameters.put("text", message);
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
	}
}
