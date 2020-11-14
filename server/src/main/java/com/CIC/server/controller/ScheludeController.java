package com.CIC.server.controller;

import java.util.HashMap;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

import com.CIC.server.model.FundingJoin;
import com.CIC.server.model.Schedule;
import com.CIC.server.service.CICService;
import com.CIC.server.util.Util;

import net.nurigo.java_sdk.api.Message;



@RestController(value = "scheduleController")
public class ScheludeController {
	
	@Autowired
	private CICService cicService;
	
	@Autowired
	private Util util;

	int cnt = 0;
	// 초 분 시 일 월 요일
	@Scheduled(cron = "0 * * * * ?")
	public void sendSMSAboutClosedProject() {
		
		System.out.println(cnt+++"분");
		
		// pro_number, pro_title, result
		List<Schedule> result = cicService.getProjectResult();
		for(int i=0; i<result.size(); i++) {
			String pro_number = result.get(i).getPro_number();
			// fun_number, id, name, phone,
			List<FundingJoin> fundingJoinList = cicService.getFundingJoinList(pro_number);
			for(int j=0; j<fundingJoinList.size(); j++) {
				if(fundingJoinList.get(j).getName().equals("KJ"))
					continue;
				cicService.updateMoneyHistory(fundingJoinList.get(j).getFun_number(), result.get(i).getResult());
				String toPhone = fundingJoinList.get(j).getPhone();
				String message = "";
				String title = result.get(i).getPro_title();
				title = "'"+title.substring(0, 11)+"..'";
				if(result.get(i).getResult().equals("Success"))
					message = fundingJoinList.get(j).getName()+"님, "+title+"은 목표금액을 달성하였습니다. 축하드립니다.";
				else
					message = fundingJoinList.get(j).getName()+"님, "+title+"은 목표금액을 달성하지 못하였습니다.";
			
//				util.happyMessage(toPhone, message);
			}
		}
	}
}
