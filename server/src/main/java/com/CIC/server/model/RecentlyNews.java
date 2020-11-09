package com.CIC.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class RecentlyNews {
	private String new_number;
	private String new_title;
	private String new_description;
	private String new_register;
	private String pro_number;
}