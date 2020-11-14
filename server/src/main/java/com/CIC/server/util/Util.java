package com.CIC.server.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Component;

import net.nurigo.java_sdk.api.Message;

@Component
public class Util {
	// React-GlobalState.Main 값에 따라 DB에 저장되어 있는 Type-Number 값으로 반환
	public String getType(String type) {
		if(type.equals("tech"))
			return "0";
		if(type.equals("travel"))
			return "1";
		if(type.equals("fashion"))
			return "2";
		return "";
	}
	
	// 프로젝트 개수에 따라 최종 페이지 번호 반환
	public int getMaxPage(int itemCnt, int pagePerCnt) { 
		if (itemCnt < pagePerCnt || itemCnt == 0)
			return 1;
		if(itemCnt%pagePerCnt==0) 
			return itemCnt/pagePerCnt;
		if(itemCnt%pagePerCnt!=0) 
			return itemCnt/pagePerCnt+1;
		return 0;
	}
	
	// 메세지 전송
	public String happyMessage(String toPhone, String message) {
		String k1 = "";
		String k2 = "";
		String fromPhone = "";
		
		Message coolsms = new Message(k1, k2);
		
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
			return "Success";
		}catch (Exception e) {
			System.out.println(e.getMessage());
		}
	return "Fail";
	}
	
	public String getNewPassword() {
		String[] specialCharacter = {"!","@","#","$","%","^","&","*"};
		List<String> characterList = new ArrayList<String>();
		for(int idx=0;idx<specialCharacter.length;idx++) {
			characterList.add(specialCharacter[idx]);
		}
		for(int idx=65;idx<=90;idx++) {
			characterList.add((char)idx+"");
			characterList.add((char)(idx+32)+"");
		}
		for(int idx=0;idx<=9;idx++) {
			characterList.add(idx+"");
		}
		int characterListLength = characterList.size();
		
		int newPasswordMinCnt = 8;
		int newPasswordMaxCnt = 3;
		// '8.0 <= x < 11.0' === 8 <= x <= 10
		int newPasswordCnt = (int)(Math.random()*newPasswordMaxCnt+newPasswordMinCnt);
		
		String newPassword = "";
		for(int idx=1;idx<=newPasswordCnt;idx++) {
			int randomNumber = (int)(Math.random()*characterListLength);
			newPassword += characterList.get(randomNumber);
		}
		System.out.println("newPassword : "+newPassword);
		System.out.println("newPasswordCnt : "+newPasswordCnt);
		System.out.println("newPassword.length : "+newPassword.length());
		
		return newPassword;
	}
}
