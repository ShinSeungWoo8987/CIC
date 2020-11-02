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
			@RequestParam(value = "thumbnail", required = false) MultipartFile thumbnail,
			@RequestParam(value = "logo", required = false) MultipartFile logo,
			@RequestParam(value = "file0", required = false) MultipartFile file0,
			@RequestParam(value = "file1", required = false) MultipartFile file1,
			@RequestParam(value = "file2", required = false) MultipartFile file2,
			@RequestParam(value = "file3", required = false) MultipartFile file3,
			@RequestParam(value = "file4", required = false) MultipartFile file4,
			@RequestParam(value = "file5", required = false) MultipartFile file5,
			@RequestParam(value = "file6", required = false) MultipartFile file6,
			@RequestParam(value = "file7", required = false) MultipartFile file7,
			@RequestParam(value = "file8", required = false) MultipartFile file8,
			@RequestParam(value = "file9", required = false) MultipartFile file9,
			@RequestParam(value = "file10", required = false) MultipartFile file10,
			@RequestParam(value = "file10", required = false) MultipartFile file11,
			@RequestParam(value = "file10", required = false) MultipartFile file12
			) throws IOException {
		String folderName = UUID.randomUUID().toString();
		
		String thumbnailName = thumbnail == null ? "" : uploadS3(folderName, convert(thumbnail));
		String logoName = logo == null ? "" : uploadS3(folderName, convert(logo));
		String fileName0 = file0 == null ? "" : uploadS3(folderName, convert(file0));
		String fileName1 = file1 == null ? "" : uploadS3(folderName, convert(file1));
		String fileName2 = file2 == null ? "" : uploadS3(folderName, convert(file2));
		String fileName3 = file3 == null ? "" : uploadS3(folderName, convert(file3));
		String fileName4 = file4 == null ? "" : uploadS3(folderName, convert(file4));
		String fileName5 = file5 == null ? "" : uploadS3(folderName, convert(file5));
		String fileName6 = file6 == null ? "" : uploadS3(folderName, convert(file6));
		String fileName7 = file7 == null ? "" : uploadS3(folderName, convert(file7));
		String fileName8 = file8 == null ? "" : uploadS3(folderName, convert(file8));
		String fileName9 = file9 == null ? "" : uploadS3(folderName, convert(file9));
		String fileName10 = file10 == null ? "" : uploadS3(folderName, convert(file10));
		String fileName11 = file11 == null ? "" : uploadS3(folderName, convert(file11));
		String fileName12 = file12 == null ? "" : uploadS3(folderName, convert(file12));
		
		if(!(fileName0.equals(fileName1)&&fileName1.equals(fileName2)&&fileName2.equals(fileName3)&&fileName3.equals(fileName4))) {
			FileUploadRes res = new FileUploadRes(
					folderName, thumbnailName, logoName, fileName0, fileName1, fileName2, fileName3, fileName4,
					fileName5, fileName6, fileName7, fileName8, fileName9, fileName10, fileName11, fileName12
					);
			return res;
		}else {
			FileUploadRes res = new FileUploadRes(folderName,thumbnailName,logoName,"","","","","","","","","","","","","");
			return res;
		}
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
