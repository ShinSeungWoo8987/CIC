package com.CIC.server.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.CIC.server.model.Member;
import com.CIC.server.service.CICService;
import com.CIC.server.util.Util;

@RestController(value="memberContoller")
public class MemberController {
	
	@Autowired
	private CICService cicService;
	
	@Autowired
	private Util util;
	
	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
	
	@RequestMapping(value="/member", method=RequestMethod.GET)
    public List<String> getMember() throws Exception {
		try {
			// 로그인 된 ID 값 불러오기
			Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			UserDetails userDetails = (UserDetails)principal;
			String username = userDetails.getUsername();
			try {
				Member member = this.cicService.getMember(username);
				try {
					List<String> memberData = new ArrayList<String>();
					
					memberData.add(member.getMem_id());
					memberData.add(member.getMem_name());
					memberData.add(member.getMem_phone());
					memberData.add(member.getMem_postcode());
					memberData.add(member.getMem_address1());
					memberData.add(member.getMem_address2());
					
					return memberData;
				}catch (Exception e) {
					System.out.println("Error Message : Add-List Error");
				}
			}catch (Exception e) {
				System.out.println("Error Message : Method-getMember Error");
			}
		}catch (Exception e) {
			System.out.println("Error Message : Get-Id Error");
		}
		return null;
	}
	
	@RequestMapping(value="/member/update", method=RequestMethod.POST, consumes="application/json")
    public String updateMember(@RequestBody Map map) throws Exception {
		List<String> values = new ArrayList<String>();
        map.forEach((k, v) -> {
			values.add((String)v);
		});
        Member member = new Member();
        if(values.get(1).length()!=0) {
        	member = Member.builder()
            		.mem_id(values.get(0))
            		.mem_pw(bcrypt.encode(values.get(1)))
            		.mem_name(values.get(2))
            		.mem_phone(values.get(3))
            		.mem_postcode(values.get(4))
            		.mem_address1(values.get(5))
            		.mem_address2(values.get(6))
            		.build();
        }else {
	        member = Member.builder()
	        		.mem_id(values.get(0))
	        		.mem_name(values.get(2))
	        		.mem_phone(values.get(3))
	        		.mem_postcode(values.get(4))
	        		.mem_address1(values.get(5))
	        		.mem_address2(values.get(6))
	        		.build();
        }
        System.out.println("member : "+member);
        this.cicService.updateMember(member);
		
		return "코딩 확인";
	}
}
