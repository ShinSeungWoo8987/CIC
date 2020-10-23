package com.CIC.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Project {
	private float dDay;
	private int PRO_NUMBER;
	private String PRO_TITLE;
	private int PRO_TARGET;
	private int PRO_PRICE;
	private String PRO_THUMBNAIL;
	private String PRO_LOGO;
	private String PRO_START;
	private String PRO_FINISH;
	private String PRO_REGISTER;
	private String MEM_ID;
	private int TYP_NUMBER;
}