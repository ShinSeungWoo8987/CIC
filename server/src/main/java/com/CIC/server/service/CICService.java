package com.CIC.server.service;

import java.util.List;

import com.CIC.server.model.Event;
import com.CIC.server.model.Funding;
import com.CIC.server.model.GetProject;
import com.CIC.server.model.Member;
import com.CIC.server.model.Notice;
import com.CIC.server.model.Project;
import com.CIC.server.model.SearchProject;
import com.CIC.server.model.ServiceCenter;
import com.CIC.server.model.Type;

public interface CICService {
	List<String> getMemberIdList();
	void addMember(Member member);
	Member getMember(String id);
	List<Project> getProjectList(SearchProject searchProject);
	GetProject getProject(int projectNumber);
	int getProjectCnt(SearchProject searchProject);
	void addFunding(Funding funding);
	void updateMember(Member member);
	
	
	List<Type> getTypeList();
	void addProject(Project project);
	
	void addEvent(Event event);
	void addNotice(Notice notice);
	
	void addServiceCenter(ServiceCenter serviceCenter);
	
	String getNoticeCnt();
	List<Notice> getNoticeList(int startNum, int endNum);
	List<Notice> searchNoticeList(int startNum, int endNum, String key);
	
	String getEventCnt();
	List<Event> getEventList(int startNum, int endNum);
	List<Event> searchEventList(int startNum, int endNum, String key);
	
	String getServiceCenterCnt();
	List<ServiceCenter> getServiceCenterList(int startNum, int endNum);
	List<ServiceCenter> searchServiceCenterList(int startNum, int endNum, String key);
	
	void updateNotice(Notice notice);
	void updateServiceCenter(ServiceCenter center);
	void updateEvent(Event event);
	
	
}