package com.CIC.server.util;

import org.springframework.stereotype.Component;

@Component
public class Util {
	// React-GlobalState.Main 값에 따라 DB에 저장되어 있는 Type-Number 값으로 반환
	public String convertType(String type) {
		if(type.equals("tech"))
			return "0";
		if(type.equals("travel"))
			return "1";
		if(type.equals("fashion"))
			return "2";
		return "";
	}
}
