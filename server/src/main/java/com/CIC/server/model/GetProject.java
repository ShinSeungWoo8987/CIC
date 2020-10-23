package com.CIC.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class GetProject {
	private int pro_number;
	private String pro_title;
	private int pro_target;
	private String pro_thumbnail;
	private String pro_logo;
	private String mem_id;
	private float dDay;
	private String pro_price;
}