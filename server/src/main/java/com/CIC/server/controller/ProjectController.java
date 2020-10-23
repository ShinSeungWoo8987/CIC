package com.CIC.server.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.CIC.server.model.GetProject;
import com.CIC.server.model.Project;
import com.CIC.server.model.SearchProject;
import com.CIC.server.service.CICService;
import com.CIC.server.util.Util;

@RestController(value="projectContoller")
public class ProjectController {

	@Autowired
	private CICService cicService;
	
	@Autowired
	private Util util;
	
	@RequestMapping(value="/project", method=RequestMethod.POST, consumes="application/json")
    public GetProject getProject(@RequestBody Map map) throws Exception {
		List<String> values = new ArrayList<String>();
        map.forEach((k, v) -> {
			values.add((String)v);
		});
        int projectNumber = Integer.parseInt(values.get(0));
        GetProject project = this.cicService.getProject(projectNumber);
        return project;
	}
	
	@RequestMapping(value="/project/list", method=RequestMethod.POST, consumes="application/json")
    public List<Project> getProjectList(@RequestBody Map map) throws Exception {
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
	            		.search(values.get(1))
	            		.type(this.util.convertType(values.get(2)))
	            		.subMenu(values.get(3))
	            		.build();
	            try {
	            	List<Project> list = this.cicService.getProjectList(searchProject);
	                return list;
	            }catch (Exception e) {
	            	System.out.println("Error Message : Method-getProjectList Error");
				}
	        }catch (Exception e) {
				System.out.println("Error Message : Model-Builder Error");
			}
		}catch (Exception e) {
			System.out.println("Error Message : React-Axios Error");
		}
        return null; 
    }
}
