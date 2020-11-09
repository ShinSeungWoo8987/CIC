package com.CIC.server.model;


import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ProjectSupportRes {
	private int fundingSupportCnt;
	private List<FundingSupport> fundingSupportList;
}