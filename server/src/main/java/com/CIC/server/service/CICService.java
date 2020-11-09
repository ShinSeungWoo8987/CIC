package com.CIC.server.service;

import java.util.List;

import com.CIC.server.model.Career;
import com.CIC.server.model.Content;
import com.CIC.server.model.Event;
import com.CIC.server.model.Funding;
import com.CIC.server.model.FundingDetail;
import com.CIC.server.model.FundingMember;
import com.CIC.server.model.FundingSupport;
import com.CIC.server.model.ProjectList;
import com.CIC.server.model.RecentlyNews;
import com.CIC.server.model.Schedule;
import com.CIC.server.model.Member;
import com.CIC.server.model.Notice;
import com.CIC.server.model.Project;
import com.CIC.server.model.ProjectInformation;
import com.CIC.server.model.SearchProject;
import com.CIC.server.model.ServiceCenter;
import com.CIC.server.model.Type;

public interface CICService {
	List<String> getMemberIdList();
	void addMember(Member member);
	Member getMember(String id);
	ProjectList getProject(int projectNumber);
	List<Project> getMainProjectList(SearchProject searchProject);
	int getMainProjectListCnt(SearchProject searchProject);
	void addFunding(Funding funding);
	void updateMember(Member member);
	void deleteMember(String id);
	List<Project> getFundingProjectList(SearchProject searchProject);
	int getFundingProjectListCnt(SearchProject searchProject);
	List<Project> getProjectList(SearchProject searchProject);
	int getProjectListCnt(SearchProject searchProject);
	List<Project> getProjectListAll(SearchProject searchProject);
	int getProjectListAllCnt(SearchProject searchProject);
	List<FundingMember> getFundingMemberList(String search, String number, int startNumber, int endNumber);
	int getFundingMemberListCnt(String search, String number);
	int getProjectJoinCnt(String number);
	void deleteProject(String number);
	List<FundingDetail> getFundingDetailList(SearchProject searchProject);
	int getFundingDetailListCnt(SearchProject searchProject);
	void deleteFundingDetailList(String number);
	String findId(String name, String phone, String birth);
	void findPw(String id, String pw);
	List<RecentlyNews> getRecentlyNewsList(SearchProject searchProject);
	int getRecentlyNewsListMaxPage(SearchProject searchProject);
	void deleteRecentlyNews(String number);
	void addRecentlyNews(RecentlyNews recentlyNews);
	void updateRecentlyNews(RecentlyNews recentlyNews);
	List<Schedule> getProjectResult();
	List<FundingMember> getFundingJoinList(String pro_number);
	
	
	
	
	
	List<Type> getTypeList();
	void addProject(Project project);
	void addContent(Content content);
	
	void addEvent(Event event);
	void addNotice(Notice notice);
	void addServiceCenter(ServiceCenter serviceCenter);
	
	String getNoticeCnt();
	String searchNoticeCnt(String key);
	List<Notice> getNoticeList(int startNum, int endNum);
	List<Notice> searchNoticeList(int startNum, int endNum, String key);
	
	String getEventCnt();
	String searchEventCnt(String key);
	List<Event> getEventList(int startNum, int endNum);
	List<Event> searchEventList(int startNum, int endNum, String key);
	
	String getServiceCenterCnt();
	String searchServiceCenterCnt(String key);
	List<ServiceCenter> getServiceCenterList(int startNum, int endNum);
	List<ServiceCenter> searchServiceCenterList(int startNum, int endNum, String key);
	
	void updateNotice(Notice notice);
	void updateServiceCenter(ServiceCenter center);
	void updateEvent(Event event);
	
	void deleteEvent(int num);
	void deleteNotice(int num);
	void deleteServiceCenter(int num);
	
	void addCareer(Career career);
	List<Career> getCreatorRequestMember(String userId);
	
	List<Member> getMemberList(int startNum, int endNum);
	List<Member> getCreatorRequestList(int startNum, int endNum);
	
	List<Member> searchMemberList(String key, int startNum, int endNum);
	List<Member> searchCreatorRequestList(String key, int startNum, int endNum);
	
	int getMemberCnt();
	int searchMemberCnt(String key);
	
	int getCreatorRequestMemberCnt();
	int searchCreatorRequestMemberCnt(String key);
	
	void handleCreatorRequest(String decision, String userId);
	
	List<Content> getContentDetails(int projectNum);
	ProjectInformation getProjectDetails(int projectNum);
	
	
	List<FundingSupport> getProjectSupport(int projectNum, int startNum, int endNum);
	int getProjectSupportCnt(int projectNum);
	
	
	void updateServiceCenterSolution(String num, String solution);
	void deleteServiceCenterSolution(String num);
	
	void updateProject(Project project);
	void updateContent(Content content);
}