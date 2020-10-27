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
	
	@Override
	public String getNoticeCnt() {
		return this.cicMapper.getNoticeCnt();
	}
	
	@Override
	public List<Notice> getNoticeList(int startNum, int endNum) {
		return this.cicMapper.getNoticeList(startNum, endNum);
	}
	
	@Override
	public String getEventCnt() {
		return this.cicMapper.getEventCnt();
	}
	@Override
	public List<Event> getEventList(int startNum, int endNum) {
		return this.cicMapper.getEventList(startNum, endNum);
	}
	@Override
	public String getServiceCenterCnt() {
		return this.cicMapper.getServiceCenterCnt();
	}
	@Override
	public List<ServiceCenter> getServiceCenterList(int startNum, int endNum) {
		return this.cicMapper.getServiceCenterList(startNum, endNum);
	}
	@Override
	public List<Notice> searchNoticeList(int startNum, int endNum, String key) {
		return this.cicMapper.searchNoticeList(startNum, endNum, key);
	}
	@Override
	public List<Event> searchEventList(int startNum, int endNum, String key) {
		return this.cicMapper.searchEventList(startNum, endNum, key);
	}
	@Override
	public List<ServiceCenter> searchServiceCenterList(int startNum, int endNum, String key) {
		return this.cicMapper.searchServiceCenterList(startNum, endNum, key);
	}
	
	
	
}
