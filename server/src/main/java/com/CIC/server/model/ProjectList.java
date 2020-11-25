package com.CIC.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ProjectList {
	private int pro_number;
	private String pro_title;
	private int pro_target;
	private int pro_price;
	private String pro_email;
	private String pro_thumbnail;
	private String pro_logo;
	private String mem_id;
	private float dDay;
	private int fundingCnt;
}