package com.CIC.server.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CIC.server.model.Project;
import com.CIC.server.model.Type;
import com.CIC.server.service.CICService;


@RestController(value = "cicController")//<context:component-scan>
public class CICController {
	
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
}