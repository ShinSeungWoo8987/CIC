package com.CIC.server.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.CIC.server.model.Event;
import com.CIC.server.model.GetProject;
import com.CIC.server.model.Member;
import com.CIC.server.model.Notice;
import com.CIC.server.model.Project;
import com.CIC.server.model.SearchProject;
import com.CIC.server.model.ServiceCenter;
import com.CIC.server.model.Type;


@Mapper
public interface CICMapper {
	public List<String> getMemberIdList();
	public void addMember(Member member);
	public Member getMember(String id);
	public List<Project> getProjectList(SearchProject searchProject);
	public GetProject getProject(int projectNumber);
	public int getProjectCnt(SearchProject searchProject);
	
	public List<Type> getTypeList();
	public void addProject(Project project);
	
	public void addEvent(Event event);
	public void addNotice(Notice notice);
	public void addServiceCenter(ServiceCenter serviceCenter);
	
	public String getNoticeCnt();
	public List<Notice> getNoticeList(int startNum, int endNum);
	public List<Notice> searchNoticeList(int startNum, int endNum, String key);
	
	public String getEventCnt();
	public List<Event> getEventList(int startNum, int endNum);
	public List<Event> searchEventList(int startNum, int endNum, String key);
	
	public String getServiceCenterCnt();
	public List<ServiceCenter> getServiceCenterList(int startNum, int endNum);
	public List<ServiceCenter> searchServiceCenterList(int startNum, int endNum, String key);
	
}