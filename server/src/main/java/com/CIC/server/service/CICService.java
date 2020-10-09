package com.CIC.server.service;

import java.util.List;

import com.CIC.server.model.Member;
import com.CIC.server.model.Project;
import com.CIC.server.model.Type;

public interface CICService {
	void addMember(Member member);
	Member getMember(String id);
	List<String> getMemberIdList();
	List<Type> getTypeList();
	List<Project> getProjectList();
}