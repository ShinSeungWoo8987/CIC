package com.CIC.server.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.CIC.server.model.Career;
import com.CIC.server.model.Content;
import com.CIC.server.model.Event;
import com.CIC.server.model.Funding;
import com.CIC.server.model.FundingDetail;
import com.CIC.server.model.FundingJoin;
import com.CIC.server.model.FundingMember;
import com.CIC.server.model.FundingSupport;
import com.CIC.server.model.ProjectList;
import com.CIC.server.model.RecentlyNews;
import com.CIC.server.model.Schedule;
import com.CIC.server.model.Member;
import com.CIC.server.model.Money;
import com.CIC.server.model.Notice;
import com.CIC.server.model.Project;
import com.CIC.server.model.ProjectInformation;
import com.CIC.server.model.SearchProject;
import com.CIC.server.model.ServiceCenter;
import com.CIC.server.model.Type;


@Mapper
public interface CICMapper {
	public List<String> getMemberIdList();
	public void addMember(Member member);
	public Member getMember(String id);
	public List<Project> getMainProjectList(SearchProject searchProject);
	public int getMainProjectListCnt(SearchProject searchProject);
	public ProjectList getProject(int projectNumber);
	public void addFunding(Funding funding);
	public void updateMember(Member member);
	public void deleteMember(String id);
	public List<Project> getFundingProjectList(SearchProject searchProject);
	public int getFundingProjectListCnt(SearchProject searchProject);
	public List<Project> getProjectList(SearchProject searchProject);
	public int getProjectListCnt(SearchProject searchProject);
	public List<Project> getProjectListAll(SearchProject searchProject);
	public int getProjectListAllCnt(SearchProject searchProject);
	public List<FundingMember> getFundingMemberList(String search, String number, int startNumber, int endNumber);
	public int getFundingMemberListCnt(String search, String number);
	public int getProjectJoinCnt(String number);
	public void deleteProject(String number);
	public List<FundingDetail> getFundingDetailList(SearchProject searchProject);
	public int getFundingDetailListCnt(SearchProject searchProject);
	void deleteFundingDetailList(String number);
	void deleteMoneyList(String number);
	String findId(String name, String phone, String birth);
	void findPw(String id, String pw);
	List<RecentlyNews> getRecentlyNewsList(SearchProject searchProject);
	int getRecentlyNewsListMaxPage(SearchProject searchProject);
	void deleteRecentlyNews(String number);
	void addRecentlyNews(RecentlyNews recentlyNews);
	void updateRecentlyNews(RecentlyNews recentlyNews);
	List<Schedule> getProjectResult();
	List<FundingJoin> getFundingJoinList(String pro_number);
	void updateMoneyHistory(String fun_number, String result);
	float getProjectDDay(String pro_number);
	Member checkMember(String id, String name, String phone);

	
	
	
	
	
	public List<Type> getTypeList();
	public void addProject(Project project);
	public void addContent(Content content);
	
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
	
	public List<Career> getCreatorRequestMember(String userId);
	
	public void handleCreatorRequest(String decision, String userId);
	
	public List<Content> getContentDetails(int projectNum);
	public ProjectInformation getProjectDetails(int projectNum);
	
	public List<FundingSupport> getProjectSupport(int projectNum, int startNum, int endNum);
	public int getProjectSupportCnt(int projectNum);
	
	public void updateServiceCenterSolution(String num, String solution);
	public void deleteServiceCenterSolution(String num);
	
	public void updateProject(Project project);
	public void updateContent(Content content);
	
	public String checkProjectWriter(int num);
	
	public List<Money> getMoneyDetails(String userId);
	public void chargeMoney(int money, String userId);
	public List<Money> getAllFundingList();
	
	public int checkAvailableMoney(String username, int num);
}