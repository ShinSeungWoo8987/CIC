package com.CIC.server.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.CIC.server.model.Project;
import com.CIC.server.model.Type;


@Mapper
public interface CICMapper {
	public List<Type> getTypeList();
	public List<Project> getProjectList();
}