package com.CIC.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class SearchProject {
	private String startNumber;
	private String finishNumber;
	private String search;
	private String type;
	private String subMenu;
}
