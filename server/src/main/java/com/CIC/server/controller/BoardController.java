package com.CIC.server.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.CIC.server.model.Project;
import com.CIC.server.model.ServiceCenter;
import com.CIC.server.model.Content;
import com.CIC.server.model.Event;
import com.CIC.server.model.Member;
import com.CIC.server.model.Notice;
import com.CIC.server.model.Type;
import com.CIC.server.service.CICService;

import io.jsonwebtoken.Claims;


@RestController(value = "boardController")//<context:component-scan>
public class BoardController {
	String project_name = "";
	String category = "";
	String target_money = "";
	String sdate = "";
	String fdate = "";
	String thumbnail = "";
	String logo = "";
	String funding_price = "";
	
	String title="";
	String image="";
	String description="";
	
	ArrayList<Map> content;
	
	Authentication authentication;
	
	@Autowired
    private CICService cicService;  

	@RequestMapping(value="/event/add", method=RequestMethod.PUT, consumes="application/json")
    public String addEvent( @RequestBody Map map ) throws Exception {
		// id가져오기
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String username = userDetails.getUsername();

        map.forEach((k, v) -> {
        	//System.out.println(k + ": " + v);
			switch ( (String)k ) {
				case "image":
					image = (String)v;
					break;
				case "thumbnail":
					thumbnail = (String)v;
					break;
				case "title":
					title = (String)v;
					break;
				case "description":
					description = (String)v;
					break;
				default:
					System.out.println("Something Error");
					break;
			}
        });
		
		Event event = Event.builder()
				  .MEM_ID(username)
				  .EVE_TITLE(title)
				  .EVE_THUMBNAIL(thumbnail)
				  .EVE_IMAGE(image)
				  .EVE_DESCRIPTION(description)
				  .build();
		
		try {
			System.out.println(event);
			this.cicService.addEvent(event);
			return "Successfully insert project"; 
		}catch (Exception e) {
			return "insert project failed"; 
		}
    }
	
	@RequestMapping(value="/notice/add", method=RequestMethod.PUT, consumes="application/json")
    public String addNotice( @RequestBody Map map ) throws Exception {
		// id가져오기
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String username = userDetails.getUsername();

        map.forEach((k, v) -> {
        	//System.out.println(k + ": " + v);
			switch ( (String)k ) {
				case "title":
					title = (String)v;
					break;
				case "description":
					description = (String)v;
					break;
				default:
					System.out.println("Something Error");
					break;
			}
        });
		
		Notice notice = Notice.builder()
				  .MEM_ID(username)
				  .NOT_TITLE(title)
				  .NOT_DESCRIPTION(description)
				  .build();
		try {
			System.out.println(notice);
			this.cicService.addNotice(notice);
			return "Successfully insert project"; 
		}catch (Exception e) {
			return "insert project failed"; 
		}
    }
	
	@RequestMapping(value="/service_center/add", method=RequestMethod.PUT, consumes="application/json")
    public String addServiceCenter( @RequestBody Map map ) throws Exception {
		// id가져오기
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String username = userDetails.getUsername();

        map.forEach((k, v) -> {
			switch ( (String)k ) {
				case "title":
					title = (String)v;
					break;
				case "description":
					description = (String)v;
					break;
				default:
					System.out.println("Something Error");
					break;
			}
        });
		
		ServiceCenter serviceCenter = ServiceCenter.builder()
				  .MEM_ID(username)
				  .SER_TITLE(title)
				  .SER_DESCRIPTION(description)
				  .build();
		this.cicService.addServiceCenter(serviceCenter);
		try {
			System.out.println(serviceCenter);
			
			return "Successfully insert project"; 
		}catch (Exception e) {
			return "insert project failed"; 
		}
    }
	
	
	@GetMapping("/noticeCnt")
    public String getNoticeCnt() throws Exception {
        String cnt = this.cicService.getNoticeCnt();
        return cnt; 
    }
	
	@GetMapping("/noticelist/{num}")
    public List<Notice> getNoticeList(@PathVariable String num) throws Exception {
		System.out.println(num);
		
        List<Notice> list = this.cicService.getNoticeList();
        return list; 
    }
	
	
	@GetMapping("/eventCnt")
    public String getEventCnt() throws Exception {
        String cnt = this.cicService.getEventCnt();
        return cnt; 
    }
	
	@GetMapping("/eventlist/{num}")
    public List<Event> getEventList(@PathVariable String num) throws Exception {
		System.out.println(num);
		
        List<Event> list = this.cicService.getEventList();
        return list; 
    }
	
	
	@GetMapping("/centerCnt")
    public String getServiceCenterCnt() throws Exception {
        String cnt = this.cicService.getServiceCenterCnt();
        return cnt; 
    }
	
	@GetMapping("/centerlist/{num}")
    public List<ServiceCenter> getServiceCenterList(@PathVariable String num) throws Exception {
		System.out.println(num);
		
        List<ServiceCenter> list = this.cicService.getServiceCenterList();
        return list; 
    }
	
	
	
}