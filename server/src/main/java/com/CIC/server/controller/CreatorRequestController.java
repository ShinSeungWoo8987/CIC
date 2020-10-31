package com.CIC.server.controller;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.CIC.server.model.Career;
import com.CIC.server.service.CICService;

@RestController
public class CreatorRequestController {

	@Autowired
	private CICService cicService;
	
	ArrayList<Map> career;
	String id="";
	String period_start="";
	String period_finish="";
	String agency="";
	String activity="";

	@RequestMapping(value = "/creator/request", method = RequestMethod.PUT, consumes = "application/json")
	public String createProject(@RequestBody Map map) throws Exception {
		// id가져오기
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails) principal;
		String username = userDetails.getUsername();

		try {
			map.forEach((k, v) -> {
	        	career = (ArrayList)v;
	    		for(Map i : career) { //for문을 통한 전체출력
	    		    Career career = Career.builder().car_org((String)i.get("agency"))
	    		    		.car_start((String)i.get("period_start"))
	    		    		.car_finish((String)i.get("period_finish"))
	    		    		.car_act((String)i.get("activity"))
	    		    		.mem_id(username)
	    		    		.build();
	    		    System.out.println(career);
	    		    this.cicService.addCareer(career);
	    		}
	        });
			return "Successfully insert project";
		} catch (Exception e) {
			return "insert project failed";
		}
	}
}
