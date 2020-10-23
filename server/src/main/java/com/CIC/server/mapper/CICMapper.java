package com.CIC.server.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.CIC.server.model.GetProject;
import com.CIC.server.model.Member;
import com.CIC.server.model.Project;
import com.CIC.server.model.SearchProject;
import com.CIC.server.model.Type;


@Mapper
public interface CICMapper {
	public List<String> getMemberIdList();
	public void addMember(Member member);
	public Member getMember(String id);
	public List<Project> getProjectList(SearchProject searchProject);
	public GetProject getProject(int projectNumber);
	
	public List<Type> getTypeList();
	public void addProject(Project project);
}