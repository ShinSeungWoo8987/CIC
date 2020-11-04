package com.CIC.server.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FileUploadRes {
	private String folderName;
	private String thumbnail;
	private String logo;
	private List<String> files;
}