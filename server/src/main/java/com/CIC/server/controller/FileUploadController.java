package com.CIC.server.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
import java.util.UUID;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.CIC.server.model.EventFileUploadRes;
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
        } catch (Exception e) {
            e.printStackTrace();
        }
		return fileName;
	}
	
	@RequestMapping( value = "/upload", method = RequestMethod.PUT, consumes = "multipart/form-data")
	@CrossOrigin//(origins = {"http://localhost:3000"})
	public FileUploadRes projectFileUpload( //ArrayList<FileUploadRes>
			MultipartHttpServletRequest request
			) throws IOException {
		Map<String, MultipartFile> fileList = request.getFileMap();
		String folderName = UUID.randomUUID().toString();
		
		MultipartFile thumbnail = request.getFile("thumbnail"); //없으면 어쩔껀지 처리해줘야함
		MultipartFile logo = request.getFile("logo");
		
		String thumbnailName = thumbnail == null ? "" : uploadS3(folderName, convert(thumbnail));
		String logoName = logo == null ? "" : uploadS3(folderName, convert(logo));
		
		int period = fileList.size();
		if(thumbnail != null) {
			period--;
		}
		if(logo != null) {
			period--;
		}
		
		ArrayList<String> files = new ArrayList();
		for(int i=0; i<period; i++) {
			MultipartFile file = request.getFile("file"+i);
			
			files.add( uploadS3(folderName, convert(file)) );
		}
		FileUploadRes res = new FileUploadRes(folderName,thumbnailName,logoName,files);
		return res;
	}
	
	@RequestMapping( value = "/event/uploadfile", method = RequestMethod.PUT, consumes = "multipart/form-data")
	@CrossOrigin//(origins = {"http://localhost:3000"})
	public EventFileUploadRes eventFileUpload( //ArrayList<FileUploadRes>
			@RequestParam(value = "image", required = false) MultipartFile image,
			@RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail
			) throws IOException {
		String folderName = UUID.randomUUID().toString();
		
		String imageName = image == null ? "" : uploadS3(folderName, convert(image));
		String thumbnailName = thumbnail==null? "" : uploadS3(folderName, convert(thumbnail));
		
		EventFileUploadRes res = new EventFileUploadRes(folderName, imageName, thumbnailName);
		return res;
	}
}
