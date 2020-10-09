package com.CIC.server.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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


@RestController(value = "cicController")//<context:component-scan>
public class CICController {
	ArrayList<Map> content;
	
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
        System.out.println("-----------------------------------------");
        // System.out.println(map.get(id));
        map.forEach((k, v) -> {
        	if(k.equals("sendContent")) {
        		System.out.println("if");
        		content = (ArrayList)v;
        		// System.out.println(content.size());
        		for(Map i : content) { //for문을 통한 전체출력
        		    System.out.println(i.get("id")+", "+i.get("head"));
        		    System.out.println(i.get("content"));
        		}
        	}else {
        		System.out.println("else");
        		System.out.println(k + ": " + v);
        	}
        });
        System.out.println("-----------------------------------------");
        return "project_num"; 
    }
}