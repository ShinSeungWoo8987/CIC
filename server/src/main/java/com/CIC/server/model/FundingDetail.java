package com.CIC.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class FundingDetail {
	private String number;
	private String title;
	private String period;
	private String name;
	private String address;
}
