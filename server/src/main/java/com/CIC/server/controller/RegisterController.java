package com.CIC.server.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.CIC.server.model.Member;
import com.CIC.server.service.CICService;

@RestController(value = "registerController")
public class RegisterController {
	
	@Autowired
	private CICService cicService;

	// ID Valid Check
	@RequestMapping(value="/memberList", method=RequestMethod.POST, consumes="application/json")
	public String memberList(@RequestBody Map map) throws Exception {
		String mem_id;
		List<String> list = new ArrayList<String>();
		try {
			mem_id = (String)map.get("id");
			try {
				list = this.cicService.getMemberIdList();
				try {
					for(int i=0; i<list.size(); i++) {
						if(mem_id.equals(list.get(i))) {
							return "사용할 수 없는 아이디입니다.";
						}
					}
				}catch (Exception e) {
					System.out.println("Error Message : Compare Error");
					return "Fail";
				}
			}catch (Exception e) {
				System.out.println("Error Message : Method-getMemberIdList Error");
				return "Fail";
			}
		}catch (Exception e) {
			System.out.println("Error Message : React-Data Error");
			return "Fail";
		}
        return "사용할 수 있는 아이디입니다."; 
	}
	
}
