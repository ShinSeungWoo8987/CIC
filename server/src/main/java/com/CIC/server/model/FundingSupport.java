package com.CIC.server.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class FundingSupport {
	private int fun_number;
	private String fun_name;
	private String fun_description;
	private String fun_register;
}