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
import com.CIC.server.model.Career;
import com.CIC.server.model.Content;
import com.CIC.server.model.Event;
import com.CIC.server.model.Member;
import com.CIC.server.model.Notice;
import com.CIC.server.model.Type;
import com.CIC.server.service.CICService;

import io.jsonwebtoken.Claims;


@RestController(value = "cicController")//<context:component-scan>
public class CICController {
	private String project_name = "";
	private String category = "";
	private String target_money = "";
	private String sdate = "";
	private String fdate = "";
	private String thumbnail = "";
	private String logo = "";
	private String funding_price = "";
	
	private String title="";
	private String image="";
	private String description="";
	
	private Authentication authentication;
	
	@Autowired
    private CICService cicService;
	
	@GetMapping("/type")
    public List<Type> getTypeList() throws Exception { 
        List<Type> list = this.cicService.getTypeList();
        return list; 
    }
//	@GetMapping("/project")
//    public List<Project> getProjectList() throws Exception {
//        List<Project> list = this.cicService.getProjectList();
//        return list; 
//    }
	@RequestMapping(value="/create_project", method=RequestMethod.PUT, consumes="application/json")
    public String createProject( @RequestBody Map map ) throws Exception {
		// id가져오기
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String username = userDetails.getUsername();
		
		System.out.println("-----------------------------------------");
        System.out.println( (ArrayList)map.get("sendContent") );
		
        map.forEach((k, v) -> {
        	if(!k.equals("sendContent")) {
        		switch ( (String)k ) {
				case "project_name":
					project_name = (String)v;
					break;
				case "category":
					category = (String)v;
					break;
				case "target_money":
					target_money = (String)v;
					break;
				case "sdate":
					sdate = (String)v;
					break;
				case "fdate":
					fdate = (String)v;
					break;
				case "thumbnail":
					thumbnail = (String)v;
					break;
				case "logo":
					logo = (String)v;
					break;
				case "funding_price":
					funding_price = (String)v;
					break;
				default:
					System.out.println("Something Error");
					break;
				}
        		
        	}
        });
		Project project = Project.builder()
				  .mem_id(username)
				  .pro_title(project_name)
				  .typ_number( Integer.parseInt(category) )
				  .pro_target( Integer.parseInt(target_money) )
				  .pro_price( Integer.parseInt(funding_price) )
				  .pro_start(sdate)
				  .pro_finish(fdate)
				  .pro_thumbnail(thumbnail)
				  .pro_logo(logo)
				  .build();
		try {
			this.cicService.addProject(project);
			
			ArrayList<Map> contentArray = (ArrayList)map.get("sendContent");
	        for(Map i : contentArray) { //for문을 통한 전체출력
				Content content = Content.builder()
	    				.con_type( ((String)i.get("head")).equals("text")?"t":"i" )
	    				.con_content((String)i.get("content"))
	    				.pro_number(project.getPro_number()) //이거 바꿔줘야함.
	    				.build();
				
				this.cicService.addContent(content); //만들어서 연결필요
			}
	        
			return "Successfully insert project";
		}catch (Exception e) {
			e.printStackTrace();
			return "insert project failed"; 
		}
		
		
    }
}