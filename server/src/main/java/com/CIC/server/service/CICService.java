package com.CIC.server.service;

import java.util.List;

import com.CIC.server.model.Project;
import com.CIC.server.model.Type;

public interface CICService {
	List<Type> getTypeList();
	List<Project> getProjectList();
}