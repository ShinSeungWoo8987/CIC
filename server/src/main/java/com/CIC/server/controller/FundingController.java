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
import com.CIC.server.model.Project;
import com.CIC.server.model.ProjectList;
import com.CIC.server.model.SearchProject;
import com.CIC.server.service.CICService;
import com.CIC.server.util.Util;

@RestController(value="fundingContoller")
public class FundingController {
	
	@Autowired
	private CICService cicService;
	
	@Autowired
	private Util util;
	
	@RequestMapping(value="/funding", method=RequestMethod.PUT, consumes="application/json")
    public String addFunding(@RequestBody Map map) throws Exception {
		try {
			List<String> values = new ArrayList<String>();
	        map.forEach((k, v) -> {
				values.add((String)v);
			});
	        try {
	        	Funding funding = Funding.builder()
	            		.mem_id(values.get(0))
	            		.fun_name(values.get(1))
	            		.fun_phone(values.get(2))
	            		.fun_postcode(values.get(3))
	            		.fun_address1(values.get(4))
	            		.fun_address2(values.get(5))
	            		.fun_description(values.get(6))
	            		.pro_number(Integer.parseInt(values.get(7)))
	            		.build();
	        	try {
	        		this.cicService.addFunding(funding);
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
		return "Fail";
	}
	
	@RequestMapping(value="/fundingList/maxPage", method=RequestMethod.POST, consumes="application/json")
    public int getMaxPage(@RequestBody Map map) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String username = userDetails.getUsername();
		try {
			List<String> values = new ArrayList<String>();
	        map.forEach((k, v) -> {
				values.add((String)v);
			});
	        try {
	        	SearchProject searchProject = SearchProject.builder()
	            		.subMenu(values.get(0))
	            		.id(username)
	            		.build();
	        	try {
	        		int fundingProjectListCnt = this.cicService.getFundingProjectListCnt(searchProject);
	        		try {
	        			int maxPage = this.util.getMaxPage(fundingProjectListCnt);
	        			return maxPage;
	        		}catch (Exception e) {
	        			System.out.println("FundingController getMaxPage Error Message : Method-getMaxPage Error");
					}
	        	}catch (Exception e) {
	        		System.out.println("FundingController getMaxPage Error Message : Method-getProjectCnt Error");
				}
	        }catch (Exception e) {
	        	System.out.println("FundingController getMaxPage Error Message : Model-Builder Error");
			}
		}catch (Exception e) {
			System.out.println("FundingController getMaxPage Error Message : React-Axios Error");
		}
        return 0;
	}
	@RequestMapping(value="/fundingList/list", method=RequestMethod.POST, consumes="application/json")
    public List<Project> getProjectList(@RequestBody Map map) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String username = userDetails.getUsername();
		try {
			List<String> values = new ArrayList<String>();
	        map.forEach((k, v) -> {
				values.add((String)v);
			});
	        try {
	        	int page = Integer.parseInt(values.get(0));
	    	    int listCnt = 8;
	            SearchProject searchProject = SearchProject.builder()
	            		.startNumber((1+(page-1)*listCnt)+"")
	            		.finishNumber((page*listCnt)+"")
	            		.subMenu(values.get(1))
	            		.id(username)
	            		.build();
	            try {
	            	List<Project> list = this.cicService.getFundingProjectList(searchProject);
	                return list;
	            }catch (Exception e) {
	            	System.out.println("FundingController getProjectList Error Message : Method-getProjectList Error");
				}
	        }catch (Exception e) {
				System.out.println("FundingController getProjectList Error Message : Model-Builder Error");
			}
		}catch (Exception e) {
			System.out.println("FundingController getProjectList Error Message : React-Axios Error");
		}
        return null; 
    }
}
