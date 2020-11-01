package com.CIC.server.util;

import org.springframework.stereotype.Component;

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
			if (itemCnt == 0)
				return 0; 
			if (itemCnt < pagePerCnt)
				return 1;
			if(itemCnt%pagePerCnt==0) 
				return itemCnt/pagePerCnt;
			if(itemCnt%pagePerCnt!=0) 
				return itemCnt/pagePerCnt+1;
			return 0;
		}
}
