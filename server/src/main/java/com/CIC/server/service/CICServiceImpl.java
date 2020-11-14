package com.CIC.server.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.CIC.server.mapper.CICMapper;
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
	public ProjectList getProject(int projectNumber) {
		return this.cicMapper.getProject(projectNumber);
	}
	@Override
	public List<Project> getMainProjectList(SearchProject searchProject) {
		return this.cicMapper.getMainProjectList(searchProject);
	}
	@Override
	public int getMainProjectListCnt(SearchProject searchProject) {
		return this.cicMapper.getMainProjectListCnt(searchProject);
	}
	@Override
	public List<Project> getProjectList(SearchProject searchProject) {
		return this.cicMapper.getProjectList(searchProject);
	}
	@Override
	public int getProjectListCnt(SearchProject searchProject) {
		return this.cicMapper.getProjectListCnt(searchProject);
	}
	@Override
	public List<Project> getProjectListAll(SearchProject searchProject) {
		return this.cicMapper.getProjectListAll(searchProject);
	}
	@Override
	public int getProjectListAllCnt(SearchProject searchProject) {
		return this.cicMapper.getProjectListAllCnt(searchProject);
	}
	@Override
	public void addFunding(Funding funding) {
		this.cicMapper.addFunding(funding);
	}
	@Override
	public void updateMember(Member member) {
		this.cicMapper.updateMember(member);
	}
	@Override
	public void deleteMember(String id) {
		this.cicMapper.deleteMember(id);
	}
	@Override
	public List<Project> getFundingProjectList(SearchProject searchProject) {
		return this.cicMapper.getFundingProjectList(searchProject);
	}
	@Override
	public int getFundingProjectListCnt(SearchProject searchProject) {
		return this.cicMapper.getFundingProjectListCnt(searchProject);
	}
	@Override
	public List<FundingMember> getFundingMemberList(String search, String number, int startNumber, int endNumber) {
		return this.cicMapper.getFundingMemberList(search, number, startNumber, endNumber);
	}
	@Override
	public int getFundingMemberListCnt(String search, String number) {
		return this.cicMapper.getFundingMemberListCnt(search, number);
	}
	@Override
	public int getProjectJoinCnt(String number) {
		return this.cicMapper.getProjectJoinCnt(number);
	}
	@Override
	public void deleteProject(String number) {
		this.cicMapper.deleteProject(number);
	}
	@Override
	public List<FundingDetail> getFundingDetailList(SearchProject searchProject) {
		return this.cicMapper.getFundingDetailList(searchProject);
	}
	@Override
	public int getFundingDetailListCnt(SearchProject searchProject) {
		return this.cicMapper.getFundingDetailListCnt(searchProject);
	}
	@Override
	public void deleteFundingDetailList(String number) {
		cicMapper.deleteFundingDetailList(number);
	}
	@Override
	public void deleteMoneyList(String number) {
		cicMapper.deleteMoneyList(number);
	}
	@Override
	public String findId(String name, String phone, String birth) {
		return cicMapper.findId(name, phone, birth);
	}
	@Override
	public void findPw(String id, String pw) {
		cicMapper.findPw(id, pw);
	}
	@Override
	public List<RecentlyNews> getRecentlyNewsList(SearchProject searchProject) {
		return cicMapper.getRecentlyNewsList(searchProject);
	}
	@Override
	public int getRecentlyNewsListMaxPage(SearchProject searchProject) {
		return cicMapper.getRecentlyNewsListMaxPage(searchProject);
	}
	@Override
	public void deleteRecentlyNews(String number) {
		cicMapper.deleteRecentlyNews(number);
	}
	@Override
	public void addRecentlyNews(RecentlyNews recentlyNews) {
		cicMapper.addRecentlyNews(recentlyNews);
	}
	@Override
	public void updateRecentlyNews(RecentlyNews recentlyNews) {
		cicMapper.updateRecentlyNews(recentlyNews);
	}
	@Override
	public List<Schedule> getProjectResult() {
		return cicMapper.getProjectResult();
	}
	@Override
	public List<FundingJoin> getFundingJoinList(String pro_number) {
		return cicMapper.getFundingJoinList(pro_number);
	}
	@Override
	public void updateMoneyHistory(String fun_number, String result) {
		cicMapper.updateMoneyHistory(fun_number, result);
	}
	@Override
	public float getProjectDDay(String pro_number) {
		return cicMapper.getProjectDDay(pro_number);
	}
	@Override
	public Member checkMember(String id, String name, String phone) {
		return cicMapper.checkMember(id, name, phone);
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
	public void addContent(Content content) {
		this.cicMapper.addContent(content);
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
	public String searchNoticeCnt(String key) {
		return this.cicMapper.searchNoticeCnt(key);
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
	public String searchEventCnt(String key) {
		return this.cicMapper.searchEventCnt(key);
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
	public String searchServiceCenterCnt(String key) {
		return this.cicMapper.searchServiceCenterCnt(key);
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
	
	@Override
	public void updateEvent(Event event) {
		this.cicMapper.updateEvent(event);
	}
	
	@Override
	public void updateNotice(Notice notice) {
		this.cicMapper.updateNotice(notice);
	}
	@Override
	public void updateServiceCenter(ServiceCenter center) {
		this.cicMapper.updateServiceCenter(center);
	}
	
	@Override
	public void deleteEvent(int num) {
		this.cicMapper.deleteEvent(num);
	}
	
	@Override
	public void deleteNotice(int num) {
		this.cicMapper.deleteNotice(num);
	}
	
	@Override
	public void deleteServiceCenter(int num) {
		this.cicMapper.deleteServiceCenter(num);
	}
	
	@Override
	public void addCareer(Career career) {
		this.cicMapper.addCareer(career);
	}
	
	@Override
	public List<Member> getMemberList(int startNum, int endNum) {
		return this.cicMapper.getMemberList(startNum,endNum);
	}
	
	@Override
	public List<Member> getCreatorRequestList(int startNum, int endNum) {
		return this.cicMapper.getCreatorRequestList(startNum,endNum);
	}
	
	@Override
	public List<Member> searchMemberList(String key, int startNum, int endNum) {
		return this.cicMapper.searchMemberList(key,startNum,endNum);
	}
	
	@Override
	public List<Member> searchCreatorRequestList(String key, int startNum, int endNum) {
		return this.cicMapper.searchCreatorRequestList(key,startNum,endNum);
	}
	
	@Override
	public int getMemberCnt() {
		return this.cicMapper.getMemberCnt();
	}
	@Override
	public int getCreatorRequestMemberCnt() {
		return this.cicMapper.getCreatorRequestMemberCnt();
	}
	
	@Override
	public int searchMemberCnt(String key) {
		return this.cicMapper.searchMemberCnt(key);
	}
	@Override
	public int searchCreatorRequestMemberCnt(String key) {
		return this.cicMapper.searchCreatorRequestMemberCnt(key);
	}
	@Override
	public List<Career> getCreatorRequestMember(String userId) {
		return this.cicMapper.getCreatorRequestMember(userId);
	}
	
	@Override
	public void handleCreatorRequest(String decision, String userId) {
		this.cicMapper.handleCreatorRequest(decision, userId);
	}
	
	@Override
	public List<Content> getContentDetails(int projectNum) {
		return this.cicMapper.getContentDetails(projectNum);
	}
	
	@Override
	public ProjectInformation getProjectDetails(int projectNum) {
		return this.cicMapper.getProjectDetails(projectNum);
	}
	
	@Override
	public List<FundingSupport> getProjectSupport(int projectNum, int startNum, int endNum) {
		return this.cicMapper.getProjectSupport(projectNum, startNum, endNum);
	}
	
	@Override
	public int getProjectSupportCnt(int projectNum) {
		return this.cicMapper.getProjectSupportCnt(projectNum);
	}
	
	@Override
	public void updateServiceCenterSolution(String num, String solution) {
		this.cicMapper.updateServiceCenterSolution(num, solution);

	}
	@Override
	public void deleteServiceCenterSolution(String num) {
		this.cicMapper.deleteServiceCenterSolution(num);
	}
	
	@Override
	public void updateProject(Project project) {
		this.cicMapper.updateProject(project);
	}
	@Override
	public void updateContent(Content content) {
		this.cicMapper.updateContent(content);
	}
	
	@Override
	public String checkProjectWriter(int num) {
		return this.cicMapper.checkProjectWriter(num);
	}
	@Override
	public List<Money> getMoneyDetails(String userId) {
		return this.cicMapper.getMoneyDetails(userId);
	}
	@Override
	public void chargeMoney(int money, String userId) {
		this.cicMapper.chargeMoney(money, userId);
	}
	
	@Override
	public List<Money> getAllFundingList() {
		return this.cicMapper.getAllFundingList();
	}
	@Override
	public int checkAvailableMoney(String username, int num) {
		return this.cicMapper.checkAvailableMoney(username, num);
	}
}
