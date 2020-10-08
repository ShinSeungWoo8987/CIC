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
	@RequestMapping(value="/memberList", method=RequestMethod.PUT, consumes="application/json")
	public String memberList(@RequestBody Map map) throws Exception {
		String mem_id;
		List<String> list = new ArrayList<String>();
		try {
			mem_id = (String)map.get("id");
			System.out.println("map-id : "+(String)map.get("id"));
			System.out.println("mem_id : "+mem_id);
			try {
				list = this.cicService.getMemberList();
				System.out.println("list : "+list);
				System.out.println("list.size : "+list.size());
				try {
					for(int i=0; i<list.size(); i++) {
						System.out.println("compare result : "+list.get(i).equals(mem_id));
						System.out.println("list.get(i) :"+list.get(i));
						if(mem_id.equals(list.get(i))) {
							return "사용할 수 없는 아이디입니다.";
						}
					}
				}catch (Exception e) {
					System.out.println("Compare Error");
					return "Fail";
				}
			}catch (Exception e) {
				System.out.println("Method-getMemberList Error");
				return "Fail";
			}
		}catch (Exception e) {
			System.out.println("React-Data Error");
			return "Fail";
		}
        return "사용할 수 있는 아이디입니다."; 
	}
	@RequestMapping(value="/register", method=RequestMethod.PUT, consumes="application/json")
	public String register(@RequestBody Map map) throws Exception {
		List<String> values = new ArrayList<String>();
		try {
			map.forEach((k, v) -> {
				values.add((String)v);
			});
			try {
				Member member = Member.builder()
						.mem_id(values.get(0))
						.mem_pw(values.get(1))
						.mem_name(values.get(2))
						.mem_birth(values.get(3))
						.mem_phone(values.get(4))
						.mem_postcode(values.get(5))
						.mem_address1(values.get(6))
						.mem_address2(values.get(7))
						.build();
				try {
					this.cicService.addMember(member);
				}catch (Exception e) {
					System.out.println("Method-addMember Error");
					return "Fail";
				}
			}catch (Exception e) {
				System.out.println("Model-Builder Error");
				return "Fail";
			}
		}catch (Exception e) {
			System.out.println("React-Data Error");
			return "Fail";
		}
        return "Success"; 
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