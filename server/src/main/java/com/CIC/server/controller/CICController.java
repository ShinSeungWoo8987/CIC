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
}