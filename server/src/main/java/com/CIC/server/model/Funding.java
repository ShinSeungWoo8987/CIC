package com.CIC.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Funding {
	private int fun_number;
	private String fun_name;
	private String fun_phone;
	private String fun_description;
	private String fun_postcode;
	private String fun_address1;
	private String fun_address2;
	private String fun_register;
	private String mem_id;
	private int pro_number;
}