package com.CIC.server.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.CIC.server.model.Career;
import com.CIC.server.model.Event;
import com.CIC.server.model.Funding;
import com.CIC.server.model.ProjectList;
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
	public ProjectList getProject(int projectNumber);
	public int getProjectListCnt(SearchProject searchProject);
	public void addFunding(Funding funding);
	public void updateMember(Member member);
	public void deleteMember(String id);
	public List<Project> getFundingProjectList(SearchProject searchProject);
	public int getFundingProjectListCnt(SearchProject searchProject);
	
	
	
	
	
	public List<Type> getTypeList();
	public void addProject(Project project);
	
	public void addEvent(Event event);
	public void addNotice(Notice notice);
	public void addServiceCenter(ServiceCenter serviceCenter);
	
	public String getNoticeCnt();
	public String searchNoticeCnt(String key);
	public List<Notice> getNoticeList(int startNum, int endNum);
	public List<Notice> searchNoticeList(int startNum, int endNum, String key);
	
	public String getEventCnt();
	public String searchEventCnt(String key);
	public List<Event> getEventList(int startNum, int endNum);
	public List<Event> searchEventList(int startNum, int endNum, String key);
	
	public String getServiceCenterCnt();
	public String searchServiceCenterCnt(String key);
	public List<ServiceCenter> getServiceCenterList(int startNum, int endNum);
	public List<ServiceCenter> searchServiceCenterList(int startNum, int endNum, String key);
	
	public void updateNotice(Notice notice);
	public void updateServiceCenter(ServiceCenter center);
	public void updateEvent(Event event);
	
	public void deleteNotice(int num);
	public void deleteServiceCenter(int num);
	public void deleteEvent(int num);
	
	public void addCareer(Career career);
	
	public List<Member> getMemberList(int startNum, int endNum);
	public List<Member> getCreatorRequestList(int startNum, int endNum);
	
	public List<Member> searchMemberList(String key, int startNum, int endNum);
	public List<Member> searchCreatorRequestList(String key, int startNum, int endNum);
	
	public int getMemberCnt();
	public int searchMemberCnt(String key);
	
	public int getCreatorRequestMemberCnt();
	public int searchCreatorRequestMemberCnt(String key);
}