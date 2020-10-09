package com.CIC.server.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.CIC.server.model.Member;
import com.CIC.server.model.Project;
import com.CIC.server.model.Type;


@Mapper
public interface CICMapper {
	public void addMember(Member member);
	public Member getMember(String id);
	public List<Type> getTypeList();
	public List<Project> getProjectList();
	public List<String> getMemberIdList();
}