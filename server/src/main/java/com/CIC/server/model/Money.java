package com.CIC.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Money {
	private int mon_number;
	private int mon_type;
	private int mon_money;
	private String mon_register;
	private String mon_title;
	private String mem_id;
	private int fun_number;
}