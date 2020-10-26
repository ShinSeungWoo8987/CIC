package com.CIC.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ServiceCenter {
	private int SER_NUMBER;
	private String SER_TITLE;
    private String SER_DESCRIPTION;
    private String SER_SOLUTION;
    private String SER_REGISTER;
    private String MEM_ID;
}