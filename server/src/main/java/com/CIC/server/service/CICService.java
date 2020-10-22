package com.CIC.server.service;

import java.util.List;

import com.CIC.server.model.Member;
import com.CIC.server.model.Project;
import com.CIC.server.model.SearchProject;
import com.CIC.server.model.Type;

public interface CICService {
	List<String> getMemberIdList();
	void addMember(Member member);
	Member getMember(String id);
	List<Project> getProjectList(SearchProject searchProject);
	List<Type> getTypeList();
	void addProject(Project project);
}