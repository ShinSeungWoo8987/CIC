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
import com.CIC.server.model.Content;
import com.CIC.server.model.Member;
import com.CIC.server.model.Type;
import com.CIC.server.service.CICService;

import io.jsonwebtoken.Claims;


@RestController(value = "cicController")//<context:component-scan>
public class CICController {
	String project_name = "";
	String category = "";
	String target_money = "";
	String sdate = "";
	String fdate = "";
	String thumbnail = "";
	String logo = "";
	String subDescription = "";
	ArrayList<Map> content;
	
	Authentication authentication;
	
	@Autowired
    private CICService cicService;  
	
	@GetMapping("/type")
    public List<Type> getTypeList() throws Exception { 
        List<Type> list = this.cicService.getTypeList();
        return list; 
    }
	@GetMapping("/project")
    public List<Project> getProjectList() throws Exception {
        List<Project> list = this.cicService.getProjectList();
        return list; 
    }
	@RequestMapping(value="/create_project", method=RequestMethod.PUT, consumes="application/json")
    public String createProject( @RequestBody Map map ) throws Exception {
		// id가져오기
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String username = userDetails.getUsername();
		
        System.out.println("-----------------------------------------");
        // System.out.println(map.get(id));
        map.forEach((k, v) -> {
        	if(k.equals("sendContent")) {
        		content = (ArrayList)v;
        		// System.out.println(content.size());
        		for(Map i : content) { //for문을 통한 전체출력
        		    System.out.println(i.get("id")+", "+i.get("head"));
        		    System.out.println(i.get("content"));
        		}
        	}else {
        		//System.out.println(k + ": " + v);
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
				case "subDescription":
					subDescription = (String)v;
					break;
				default:
					System.out.println("Something Error");
					break;
				}
        	}
        });
        System.out.println("-----------------------------------------");
		
		Project project = Project.builder()
				  .MEM_ID(username)
				  .PRO_TITLE(project_name)
				  .TYP_NUMBER( Integer.parseInt(category) )
				  .PRO_TARGET( Integer.parseInt(target_money) )
				  .PRO_START(sdate)
				  .PRO_FINISH(fdate)
				  .PRO_THUMBNAIL(thumbnail)
				  .PRO_LOGO(logo)
				  .PRO_SUBDESCRIPTION(subDescription)
				  .build();
		//이거 왜 프로젝트 넘버가 null이 아니고 0으로 뜨지?
		System.out.println(project);
		
		try {
			this.cicService.addProject(project);
			return "Successfully insert project"; 
		}catch (Exception e) {
			return "insert project failed"; 
		}
    }
}