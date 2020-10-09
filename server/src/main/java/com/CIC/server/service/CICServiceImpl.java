package com.CIC.server.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.CIC.server.mapper.CICMapper;
import com.CIC.server.model.Member;
import com.CIC.server.model.Project;
import com.CIC.server.model.Type;

@Service(value = "cicService")
public class CICServiceImpl implements CICService {

	@Autowired
	private CICMapper cicMapper;
	
	@Override
	public List<Type> getTypeList() {
		return this.cicMapper.getTypeList();
	}
	
	@Override
	public List<Project> getProjectList() {
		return this.cicMapper.getProjectList();
	}

	@Override
	public void addMember(Member member) {
		this.cicMapper.addMember(member);
	}

	@Override
	public List<String> getMemberIdList() {
		return this.cicMapper.getMemberIdList();
	}

	@Override
	public Member getMember(String id) {
		return this.cicMapper.getMember(id);
	}
}
