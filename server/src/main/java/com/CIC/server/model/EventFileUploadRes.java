package com.CIC.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EventFileUploadRes {
	private String folderName;
	private String image;
	private String thumbnail;
}
