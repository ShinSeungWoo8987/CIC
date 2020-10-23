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

@RestController(value = "loginController")
public class LoginController {

	@Autowired
	private CICService cicService;
	
	@RequestMapping(value="/login", method=RequestMethod.POST, consumes="application/json")
	public List<String> login(@RequestBody Map map) throws Exception {
		List<String> values = new ArrayList<String>();
		String inputId;
		String inputPw;
		List<String> result = new ArrayList<String>();
		try {
			map.forEach((k, v) -> {
				values.add((String)v);
			});
			inputId = values.get(0);
			inputPw = values.get(1);
			try {
				Member member = this.cicService.getMember(inputId);
				try {
					if(member == null) {
						result.add("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.");
						return result;
					}
					if(inputId.equals(member.getMem_id())) {
						if(inputPw.equals(member.getMem_pw())){
							result.add("true");
							result.add(member.getMem_id());
							result.add(member.getGra_number()+"");
							return result;
						}else {
							result.add("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.");
							return result;
						}
					}else {
						result.add("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.");
						return result;
					}
				}catch (Exception e) {
					System.out.println("Error Message : Compare Error");
					result.add("잠시 후에 다시 시도해주세요.");
					return result;
				}
			}catch (Exception e) {
				System.out.println("Error Message : Method-getMember Error");
				result.add("잠시 후에 다시 시도해주세요.");
				return result;
			}
		}catch (Exception e) {
			System.out.println("Error Message : React-Axios Error");
			result.add("잠시 후에 다시 시도해주세요.");
			return result;
		}
	}
	
//	@RequestMapping(value="/login", method=RequestMethod.POST, consumes="application/json")
//	public List<String> login(@RequestBody Map map) throws Exception {
//		List<String> values = new ArrayList<String>();
//		String inputId;
//		String inputPw;
//		List<String> result = new ArrayList<String>();
//		map.forEach((k, v) -> {
//			values.add((String)v);
//		});
//		inputId = values.get(0);
//		inputPw = values.get(1);
//		Member member = this.cicService.getMember(inputId);
//		System.out.println("member : "+member);
//		System.out.println("inputId : "+inputId);
//		System.out.println("member.getMem_id() :"+member.getMem_id());
//		if(inputId.equals(member.getMem_id())) {
//			if(inputPw.equals(member.getMem_pw())){
//				result.add("true");
//				result.add(member.getMem_id());
//				result.add(member.getGra_number()+"");
//				return result;
//			}else {
//				result.add("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.");
//				return result;
//			}
//		}else {
//			result.add("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.");
//			return result;
//		}
//	}
}
