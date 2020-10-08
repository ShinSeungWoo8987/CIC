package com.CIC.server.service;

import java.util.List;

import com.CIC.server.model.Member;
import com.CIC.server.model.Project;
import com.CIC.server.model.Type;

public interface CICService {
	void addMember(Member member);
	List<String> getMemberList();
	List<Type> getTypeList();
	List<Project> getProjectList();
}