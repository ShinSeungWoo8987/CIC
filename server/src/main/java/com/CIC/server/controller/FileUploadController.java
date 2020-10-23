package com.CIC.server.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.CIC.server.model.FileUploadRes;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@RestController
public class FileUploadController{
	String k1 = "...";
	String k2 = "...";
	
	AWSCredentials credentials = new BasicAWSCredentials(k1, k2);
	
	AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
	        .withCredentials(new AWSStaticCredentialsProvider(credentials))
	        .withRegion(Regions.AP_NORTHEAST_2)
	        .build();
	
	
	public File convert(MultipartFile mfile) throws IOException {
		File file = new File(mfile.getOriginalFilename());
		file.createNewFile();
		FileOutputStream fos = new FileOutputStream(file);
		fos.write(mfile.getBytes());
		fos.close();
		return file;
	}
	
	private String uploadS3(String folderName, File file) throws IOException {
		String fileName = UUID.randomUUID().toString();
		try {
			s3Client.putObject("crowdincreative", folderName+"/"+fileName, file);
		} catch (AmazonServiceException e) {
            e.printStackTrace();
        } catch (SdkClientException e) {
            e.printStackTrace();
        }
		return fileName;
	}
	
	@RequestMapping( value = "/upload", method = RequestMethod.PUT, consumes = "multipart/form-data")
	@CrossOrigin//(origins = {"http://localhost:3000"})
	public FileUploadRes fileUpload( //ArrayList<FileUploadRes>
			@RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail,
			@RequestParam(value = "logo", required = false) MultipartFile logo,
			@RequestParam(value = "file0", required = false) MultipartFile file0,
			@RequestParam(value = "file1", required = false) MultipartFile file1,
			@RequestParam(value = "file2", required = false) MultipartFile file2,
			@RequestParam(value = "file3", required = false) MultipartFile file3,
			@RequestParam(value = "file4", required = false) MultipartFile file4
			) throws IOException {
		String folderName = UUID.randomUUID().toString();
		
		String thumbnailName = thumbnail == null ? "" : uploadS3(folderName, convert(thumbnail));
		String logoName = logo == null ? "" : uploadS3(folderName, convert(logo));
		String fileName0 = file0 == null ? "" : uploadS3(folderName, convert(file0));
		String fileName1 = file1 == null ? "" : uploadS3(folderName, convert(file1));
		String fileName2 = file2 == null ? "" : uploadS3(folderName, convert(file2));
		String fileName3 = file3 == null ? "" : uploadS3(folderName, convert(file3));
		String fileName4 = file4 == null ? "" : uploadS3(folderName, convert(file4));
		
		if(!(fileName0.equals(fileName1)&&fileName1.equals(fileName2)&&fileName2.equals(fileName3)&&fileName3.equals(fileName4))) {
			FileUploadRes res = new FileUploadRes(folderName, thumbnailName, logoName, fileName0, fileName1, fileName2, fileName3, fileName4);
			return res;
		}else {
			FileUploadRes res = new FileUploadRes(folderName,thumbnailName,logoName,"","","","","");
			return res;
		}
	}
}
