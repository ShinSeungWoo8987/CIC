package com.CIC.server.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.CIC.server.mapper.CICMapper;
import com.CIC.server.model.Project;
import com.CIC.server.model.Type;

@Service(value = "cicService")
public class CICServiceImpl implements CICService {

	@Autowired
	private CICMapper cicMapper;
	
	@Override
	public List<Type> getTypeList() {
		System.out.println( this.cicMapper.getTypeList() );
		return this.cicMapper.getTypeList();
	}
	
	@Override
	public List<Project> getProjectList() {
		System.out.println( this.cicMapper.getProjectList() );
		return this.cicMapper.getProjectList();
	}
}
