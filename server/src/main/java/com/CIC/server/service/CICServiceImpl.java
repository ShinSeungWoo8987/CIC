package com.CIC.server.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.CIC.server.mapper.CICMapper;
import com.CIC.server.model.Event;
import com.CIC.server.model.GetProject;
import com.CIC.server.model.Member;
import com.CIC.server.model.Notice;
import com.CIC.server.model.Project;
import com.CIC.server.model.SearchProject;
import com.CIC.server.model.ServiceCenter;
import com.CIC.server.model.Type;

@Service(value = "cicService")
public class CICServiceImpl implements CICService {

	@Autowired
	private CICMapper cicMapper;
	
	@Override
	public List<String> getMemberIdList() {
		return this.cicMapper.getMemberIdList();
	}
	@Override
	public void addMember(Member member) {
		this.cicMapper.addMember(member);
	}
	@Override
	public Member getMember(String id) {
		return this.cicMapper.getMember(id);
	}
	@Override
	public List<Project> getProjectList(SearchProject searchProject) {
		return this.cicMapper.getProjectList(searchProject);
	}
	@Override
	public GetProject getProject(int projectNumber) {
		return this.cicMapper.getProject(projectNumber);
	}
	@Override
	public int getProjectCnt(SearchProject searchProject) {
		return this.cicMapper.getProjectCnt(searchProject);
	}
	
	@Override
	public List<Type> getTypeList() {
		return this.cicMapper.getTypeList();
	}
	
	@Override
	public void addProject(Project project) {
		this.cicMapper.addProject(project);
	}

	@Override
	public void addEvent(Event event) {
		this.cicMapper.addEvent(event);
	}
	
	@Override
	public void addNotice(Notice notice) {
		this.cicMapper.addNotice(notice);
	}
	
	@Override
	public void addServiceCenter(ServiceCenter serviceCenter) {
		this.cicMapper.addServiceCenter(serviceCenter);
	}
}
