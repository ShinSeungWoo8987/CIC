package com.CIC.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Event {
	private String MEM_ID;
	private int EVE_NUMBER;
	private String EVE_TITLE;
    private String EVE_DESCRIPTION;
    private String EVE_THUMBNAIL;
    private String EVE_IMAGE;
    private String EVE_REGISTER;
}