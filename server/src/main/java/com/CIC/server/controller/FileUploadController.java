package com.CIC.server.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileUploadController{
	
	private void writeFile(MultipartFile file) throws IOException {
		File convertFile = new File("D:/work/" + file.getOriginalFilename());
		convertFile.createNewFile();
		
		try (FileOutputStream fout = new FileOutputStream(convertFile)) {
			fout.write(file.getBytes());
		} catch (Exception e)	{
			e.printStackTrace();
		}
	}
	
	@RequestMapping(
			value = "/upload",
			method = RequestMethod.POST,
			consumes = "multipart/form-data")
	@CrossOrigin(origins = {"http://localhost:3000"})

	public String fileUpload(
			@RequestParam(value = "file0", required = false) MultipartFile file0,
			@RequestParam(value = "file1", required = false) MultipartFile file1,
			@RequestParam(value = "file2", required = false) MultipartFile file2,
			@RequestParam(value = "file3", required = false) MultipartFile file3
			) throws IOException {
		if(file0 != null) writeFile(file0);
		if(file1 != null) writeFile(file1);
		if(file2 != null) writeFile(file2);
		if(file3 != null) writeFile(file3);
		
		System.out.println(file0);
		System.out.println(file1);
		System.out.println(file2);
		System.out.println(file3);
		return "File has uploaded successfully";
	}

}
