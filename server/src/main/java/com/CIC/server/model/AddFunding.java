package com.CIC.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class AddFunding {
	private int fun_number;
	private int mon_number;
	private String pro_title;
	private String pro_price;
}