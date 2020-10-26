package com.CIC.server.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
	
	@RequestMapping(value="/member", method=RequestMethod.GET)
    public List<String> getMember() throws Exception {
		// 로그인 된 ID 값 불러오기
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String username = userDetails.getUsername();
		
		Member member = this.cicService.getMember(username);
		List<String> memberData = new ArrayList<String>();
		
		memberData.add(member.getMem_id());
		memberData.add(member.getMem_name());
		memberData.add(member.getMem_phone());
		memberData.add(member.getMem_postcode());
		memberData.add(member.getMem_address1());
		memberData.add(member.getMem_address2());
		
		System.out.println("member : "+member);
		System.out.println("memberData : "+memberData);
		
		return memberData;
		
	}

}
