package com.CIC.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ProjectInformation {
	private int pro_number;
	private String pro_title;
	private int pro_target;
	private String pro_thumbnail;
	private String pro_logo;
	private String pro_start;
	private String pro_finish;
	private String pro_register;
	private int pro_price;
	private String pro_email;
	private int typ_number;
	private String mem_id;
}