package com.CIC.server.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.CIC.server.model.Funding;
import com.CIC.server.model.FundingDetail;
import com.CIC.server.model.FundingMember;
import com.CIC.server.model.SearchProject;
import com.CIC.server.service.CICService;
import com.CIC.server.util.Util;

@RestController(value="fundingContoller")
public class FundingController {
	int pagePerCnt = 12;
	
	@Autowired
	private CICService cicService;
	
	@Autowired
	private Util util;
	
	@RequestMapping(value="/funding", method=RequestMethod.PUT, consumes="application/json")
    public String addFunding(@RequestBody Map map) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String username = userDetails.getUsername();
		try {
			List<String> values = new ArrayList<String>();
	        map.forEach((k, v) -> {
				values.add((String)v);
			});
	        try {
	        	Funding funding = Funding.builder()
	            		.mem_id(username)
	            		.fun_name(values.get(1))
	            		.fun_phone(values.get(2))
	            		.fun_postcode(values.get(3))
	            		.fun_address1(values.get(4))
	            		.fun_address2(values.get(5))
	            		.fun_description(values.get(6))
	            		.pro_number(Integer.parseInt(values.get(7)))
	            		.build();
	        	try {
	        		int check = this.cicService.checkAvailableMoney(username, Integer.parseInt(values.get(7)));
	        		if( check==0 ) { // 사용가능금액이 모자란경우
	        			return "Fail";
	        		}else { // 펀딩가능
	        			this.cicService.addFunding(funding);
	        		}
	        		return "Success";
	        	}catch (Exception e) {
					System.out.println("FundingController addFunding Error Message : Method-addFunding Error");
				}
	        }catch (Exception e) {
				System.out.println("FundingController addFunding Error Message : Model-Builder Error");
			}
		}catch (Exception e) {
			System.out.println("FundingController addFunding Error Message : React-Axios Error");
		}
		return "???";
	}
	
	@RequestMapping(value="/fundingMemberList/maxPage", method=RequestMethod.POST, consumes="application/json")
    public int getFundingMemberListMaxPage(@RequestBody Map map) throws Exception {
		try {
			List<String> values = new ArrayList<String>();
	        map.forEach((k, v) -> {
				values.add((String)v);
			});
	        String search = values.get(0);
	        String number = values.get(1);
	        try {
	        	int fundingMemberListCnt = this.cicService.getFundingMemberListCnt(search, number);
	        	try {
	        		int maxPage = this.util.getMaxPage(fundingMemberListCnt, pagePerCnt);
	        		return maxPage;
	        	}catch (Exception e) {
	        		System.out.println("FundingController getFundingMemberListMaxPage Error Message : Method-getMaxPage Error");
				}
	        }catch (Exception e) {
	        	System.out.println("FundingController getFundingMemberListMaxPage Error Message : Method-getFundingMemberListCnt Error");
			}
		}catch (Exception e) {
			System.out.println("FundingController getFundingMemberListMaxPage Error Message : React-Axios Error");
		}
		return 0;
	}
	
	@RequestMapping(value="/fundingMemberList/list", method=RequestMethod.POST, consumes="application/json")
    public List<FundingMember> getFundingMemberList(@RequestBody Map map) throws Exception {
		try {
			List<String> values = new ArrayList<String>();
	        map.forEach((k, v) -> {
				values.add((String)v);
			});
	        String search = values.get(0);
	        String number = values.get(1);
	        int page = Integer.parseInt(values.get(2));
	        int startNumber = 1+(page-1)*pagePerCnt;
	        int endNumber = page*pagePerCnt;
	        try {
	        	List<FundingMember> list = this.cicService.getFundingMemberList(search, number, startNumber, endNumber);
	    		return list;
	        }catch (Exception e) {
	        	System.out.println("FundingController getFundingMemberList Error Message : Method-getFundingMemberList Error");
			}
		}catch (Exception e) {
			System.out.println("FundingController getFundingMemberList Error Message : React-Axios Error");
		}
		return null;
	}
	
	@RequestMapping(value="/fundingDetailList/maxPage", method=RequestMethod.POST, consumes="application/json")
    public int getFundingDetailListMaxPage(@RequestBody Map map) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String id = userDetails.getUsername();
		try {
			List<String> values = new ArrayList<String>();
	        map.forEach((k, v) -> {
				values.add((String)v);
			});
	        String type = values.get(0);
	        String search = values.get(1);
	        
	        SearchProject searchProject = SearchProject.builder()
	        		.type(values.get(0))
	        		.search(values.get(1))
	        		.id(id)
	        		.build();
	        try {
	        	int fundingDetailListCnt = this.cicService.getFundingDetailListCnt(searchProject);
	        	try {
	        		int maxPage = this.util.getMaxPage(fundingDetailListCnt, pagePerCnt);
	        		return maxPage;
	        	}catch (Exception e) {
	        		System.out.println("FundingController getFundingDetailListMaxPage Error Message : Method-getMaxPage Error");
				}
	        }catch (Exception e) {
	        	System.out.println("FundingController getFundingDetailListMaxPage Error Message : Method-fundingDetailListCnt Error");
			}
		}catch (Exception e) {
			System.out.println("FundingController getFundingDetailListMaxPage Error Message : React-Axios Error");
		}
		return 0;
	}
	
	@RequestMapping(value="/fundingDetailList/list", method=RequestMethod.POST, consumes="application/json")
    public List<FundingDetail> getFundingDetailList(@RequestBody Map map) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String id = userDetails.getUsername();
		try {
			List<String> values = new ArrayList<String>();
	        map.forEach((k, v) -> {
				values.add((String)v);
			});
	        int page = Integer.parseInt(values.get(2));
	        SearchProject searchProject = SearchProject.builder()
	        		.type(values.get(0))
	        		.search(values.get(1))
	        		.startNumber(1+(page-1)*pagePerCnt+"")
	        		.finishNumber(page*pagePerCnt+"")
	        		.id(id)
	        		.build();
	        try {
	        	List<FundingDetail> list = this.cicService.getFundingDetailList(searchProject);
	    		return list;
	        }catch (Exception e) {
	        	System.out.println("FundingController getFundingDetailList Error Message : Method-getFundingDetailList Error");
			}
		}catch (Exception e) {
			System.out.println("FundingController getFundingDetailList Error Message : React-Axios Error");
		}
		return null;
	}
	
	@RequestMapping(value="/fundingDetailList/delete", method=RequestMethod.POST, consumes="application/json")
    public void deleteFundingDetailList(@RequestBody Map map) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String id = userDetails.getUsername();
		
		// index-0 : number, index-1: id
		List<String> values = new ArrayList<String>();
        map.forEach((k, v) -> {
			values.add((String)v);
		});
        
        if(!id.equals(values.get(1))) {
        	return;
        }
        cicService.deleteMoneyList(values.get(0));
        cicService.deleteFundingDetailList(values.get(0));
	}
}
