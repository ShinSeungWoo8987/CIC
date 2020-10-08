package com.CIC.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FileUploadRes {
	private String folderName;
	private String thumbnail;
	private String logo;
	private String fileName0;
	private String fileName1;
	private String fileName2;
	private String fileName3;
	private String fileName4;
}
