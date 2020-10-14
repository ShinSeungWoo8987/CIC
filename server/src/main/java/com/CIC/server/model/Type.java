package com.CIC.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Type {
	private int typ_number;
	private String typ_name;
	private String typ_logo;
}