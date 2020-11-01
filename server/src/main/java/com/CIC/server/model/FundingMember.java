package com.CIC.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class FundingMember {
	private String id;
	private String name;
	private String phone;
	private String address;
	private int fundingCnt;
}
