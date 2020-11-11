package com.CIC.server.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.CIC.server.model.Career;
import com.CIC.server.model.Member;
import com.CIC.server.service.CICService;
import com.CIC.server.util.Util;

@RestController(value="memberContoller")
public class MemberController {
	
	private int pagePerCnt = 18;
	
	@Autowired
	private CICService cicService;
	
	@Autowired
	private Util util;
	
	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
	
	@RequestMapping(value="/member", method=RequestMethod.GET)
    public List<String> getMember() throws Exception {
		try {
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
					System.out.println("MemberController getMember Error Message : Add-List Error");
				}
			}catch (Exception e) {
				System.out.println("MemberController getMember Error Message : Method-getMember Error");
			}
		}catch (Exception e) {
			System.out.println("MemberController getMember Error Message : Get-Id Error");
		}
		return null;
	}
	
	@RequestMapping(value="/member/update", method=RequestMethod.POST, consumes="application/json")
    public String updateMember(@RequestBody Map map) throws Exception {
		try {
			List<String> values = new ArrayList<String>();
	        map.forEach((k, v) -> {
				values.add((String)v);
			});
	        try {
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
	            try {
	            	this.cicService.updateMember(member);
	            	return "Member Update Success";
	            }catch (Exception e) {
	            	System.out.println("MemberController updateMember Error Message : Method-updateMember Error");
				}
	        }catch (Exception e) {
	        	System.out.println("MemberController updateMember Error Message : Model-Builder Error");
			}
		}catch (Exception e) {
			System.out.println("MemberController updateMember Error Message : React-Aioxs Error");
		}
		return "Member Update Fail";
	}
	
	@RequestMapping(value="/member/delete", method=RequestMethod.POST)
    public String deleteMember() throws Exception {
		try {
			Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			UserDetails userDetails = (UserDetails)principal;
			
			// 창작자 계정인 경우 묻지도 따지지도 않고 거절
			if(userDetails.getAuthorities().toString().equals("[ROLE_CREATOR]")){
				return null;
			}
			
			String username = userDetails.getUsername();
			this.cicService.deleteMember(username);
		}catch (Exception e) {
			System.out.println("MemberController deleteMember Error Message : Method-deleteMember Error");
		}
		
		return "Member Delete Fail";
	}
	
	
	
	
	
	@GetMapping("/member/{sort}/{page}")
    public List<Member> getMemberList(@PathVariable String sort, @PathVariable String page) throws Exception {
		int startNum = ( Integer.parseInt(page) -1)*pagePerCnt+1;
		int endNum = Integer.parseInt(page)*pagePerCnt;
        if(sort.equals("all")) {
        	List<Member> list = this.cicService.getMemberList(startNum,endNum);
            return list;
        }else {
        	List<Member> list = this.cicService.getCreatorRequestList(startNum,endNum);
            return list; 
        }
    }
	
	@GetMapping("/member/{sort}/{page}/{key}")
    public List<Member> searchMemberList(
    		@PathVariable String sort, @PathVariable String page, @PathVariable String key
    		) throws Exception {
		int startNum = ( Integer.parseInt(page) -1)*pagePerCnt+1;
		int endNum = Integer.parseInt(page)*pagePerCnt;
        if(sort.equals("all")) {
        	List<Member> list = this.cicService.searchMemberList(key,startNum,endNum);
            return list;
        }else {
        	List<Member> list = this.cicService.searchCreatorRequestList(key,startNum,endNum);
            return list; 
        }
    }
	
	@GetMapping("/memberCnt/{sort}")
    public int getMemberCnt(@PathVariable String sort) throws Exception {
		if(sort.equals("all")) {
			int cnt = util.getMaxPage(this.cicService.getMemberCnt(),pagePerCnt);
	        return cnt; 
		}else{
			int cnt = util.getMaxPage(this.cicService.getCreatorRequestMemberCnt(),pagePerCnt);
	        return cnt; 
		}
    }
	
	@GetMapping("/memberCnt/{sort}/{key}")
    public int searchMemberCnt(@PathVariable String sort, @PathVariable String key) throws Exception {
		if(sort.equals("all")) {
			int cnt = util.getMaxPage(this.cicService.searchMemberCnt(key),pagePerCnt);
	        return cnt; 
		}else{
			int cnt = util.getMaxPage(this.cicService.searchCreatorRequestMemberCnt(key),pagePerCnt);
	        return cnt; 
		}
    }
	
	@GetMapping("/creator_request/{userId}")
    public List<Career> getCreatorRequestMember(@PathVariable String userId) throws Exception {
		List<Career> career = this.cicService.getCreatorRequestMember(userId);
		return career;
    }
	
	@DeleteMapping ("/member/delete/{userId}")
    public void deleteMember(@PathVariable String userId) throws Exception {
		cicService.deleteMember(userId);
    }
	
	@DeleteMapping ("/creator_request/{userId}/{decision}")
    public void deleteCareer(@PathVariable String decision, @PathVariable String userId) throws Exception {
		this.cicService.handleCreatorRequest(decision, userId);
    }
}
