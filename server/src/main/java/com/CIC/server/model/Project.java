package com.CIC.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Project {
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
	private String pro_start;
	private String pro_finish;
	private String pro_register;
	private int typ_number;
}