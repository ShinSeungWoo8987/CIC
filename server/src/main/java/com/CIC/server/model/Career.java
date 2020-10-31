package com.CIC.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Career {
	private int car_number;
	private String car_org;
	private String car_act;
	private String car_start;
	private String car_finish;
	private String mem_id;
}