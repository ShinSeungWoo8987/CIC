package com.CIC.server.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.CIC.server.model.Project;
import com.CIC.server.model.Type;
import com.CIC.server.service.CICService;
import com.CIC.server.service.FileUploadService;

@RestController(value = "cicController")//<context:component-scan>
public class CICController {
	
	@Autowired
    private CICService cicService;
	
	@Autowired
	FileUploadService fileUploadService;
	
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
	
	
	@PostMapping("/upload")
	public String fileUploadTest(
			@RequestPart(value = "image0", required = false) MultipartFile file0,
			@RequestPart(value = "image1", required = false) MultipartFile file1,
			@RequestPart(value = "image2", required = false) MultipartFile file2,
			@RequestPart(value = "image3", required = false) MultipartFile file3
			) throws Exception {
		
//		String url0 = fileUploadService.restore(file0);
//		String url1 = fileUploadService.restore(file1);
//		String url2 = fileUploadService.restore(file2);
//		String url3 = fileUploadService.restore(file3);
		
		System.out.println(file0);
		System.out.println(file1);
		System.out.println(file2);
		System.out.println(file3);
		return "result";
	}
}