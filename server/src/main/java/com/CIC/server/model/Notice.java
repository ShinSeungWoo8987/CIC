package com.CIC.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Notice {
	private String MEM_ID;
	private int NOT_NUMBER;
	private String NOT_TITLE;
    private String NOT_DESCRIPTION;
    private String NOT_REGISTER;
}