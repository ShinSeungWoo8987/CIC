package com.CIC.server.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.CIC.server.model.RecentlyNews;
import com.CIC.server.model.SearchProject;
import com.CIC.server.service.CICService;
import com.CIC.server.util.Util;

@RestController(value="recentlyNewsController")
public class RecentlyNewsController {
	int pagePerCnt = 7;
	
	@Autowired
	private CICService cicService;
	
	@Autowired
	private Util util;
	
	@RequestMapping(value="/recentlyNewsList/maxPage", method=RequestMethod.POST, consumes="application/json")
    public int getRecentlyNewsListMaxPage(@RequestBody Map map) throws Exception {
		try {
			// index(0) - search, index(1) - projectNumber
			List<String> values = new ArrayList<String>();
	        map.forEach((k, v) -> {
				values.add((String)v);
			});
	        try {
	        	SearchProject searchProject = SearchProject.builder()
	            		.search(values.get(0))
	            		.number(values.get(1))
	            		.build();
	        	try {
	        		int recentlyNewsListCnt = cicService.getRecentlyNewsListMaxPage(searchProject);
	            	int maxPage = util.getMaxPage(recentlyNewsListCnt, pagePerCnt);
	        		return maxPage;
	        	}catch (Exception e) {
	        		System.out.println("ProjectController getRecentlyNewsListMaxPage Error Message : Method-getRecentlyNewsListMaxPage Error");
				}
	        }catch (Exception e) {
	        	System.out.println("ProjectController getRecentlyNewsListMaxPage Error Message : Model-Builder Error");
			}
		}catch (Exception e) {
			System.out.println("ProjectController getRecentlyNewsListMaxPage Error Message : React-Axios Error");
		}
		return 0;
	}
	
	@RequestMapping(value="/recentlyNewsList/list", method=RequestMethod.POST, consumes="application/json")
    public List<RecentlyNews> getRecentlyNewsList(@RequestBody Map map) throws Exception {
		try {
			// index(0) - search, index(1) - page, index(2) - projectNumber
			List<String> values = new ArrayList<String>();
	        map.forEach((k, v) -> {
				values.add((String)v);
			});
	        int page = Integer.parseInt(values.get(1));
	        try {
	        	SearchProject searchProject = SearchProject.builder()
	            		.search(values.get(0))
	            		.startNumber((1+(page-1)*pagePerCnt)+"")
	            		.finishNumber((page*pagePerCnt)+"")
	            		.number(values.get(2))
	            		.build();
	        	try {
	        		List<RecentlyNews> list = cicService.getRecentlyNewsList(searchProject);
	        		return list;
	        	}catch (Exception e) {
	        		System.out.println("ProjectController getRecentlyNewsList Error Message : Method-getRecentlyNewsList Error");
				}
	        }catch (Exception e) {
	        	System.out.println("ProjectController getRecentlyNewsList Error Message : Model-Builder Error");
			}
		}catch (Exception e) {
			System.out.println("ProjectController getRecentlyNewsList Error Message : React-Axios Error");
		}
        return null;
	}
	
	@RequestMapping(value="/recentlyNews/add", method=RequestMethod.POST, consumes="application/json")
    public void addRecentlyNews(@RequestBody Map map) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String username = userDetails.getUsername();
		// index(0) - pro_number,  index(1) - title, index(2) - content, index(3) - id
		List<String> values = new ArrayList<String>();
        map.forEach((k, v) -> {
			values.add((String)v);
		});
        // 현재 로그인된 아이디와 토큰 정보(아이디)가 다른 경우
        if(!username.equals(values.get(3))) 
        	return;
        // 창작자 or 관리자가 아닌경우 거절
		if(!userDetails.getAuthorities().toString().equals("[ROLE_CREATOR]") && !userDetails.getAuthorities().toString().equals("[ROLE_ADMIN]")) {
			System.out.println("관리자 or 창작자가 아닌 경우");
			return;
		}
		RecentlyNews recentlyNews = RecentlyNews.builder()
				.pro_number(values.get(0))
				.new_title(values.get(1))
				.new_description(values.get(2))
				.build();
		cicService.addRecentlyNews(recentlyNews);
	}
	
	@RequestMapping(value="/recentlyNews/update", method=RequestMethod.POST, consumes="application/json")
    public void updateRecentlyNews(@RequestBody Map map) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String username = userDetails.getUsername();
		// index(0) - pro_number,  index(1) - title, index(2) - content, index(3) - id, index(4) - new_number
		List<String> values = new ArrayList<String>();
        map.forEach((k, v) -> {
			values.add((String)v);
		});
        // 현재 로그인된 아이디와 토큰 정보(아이디)가 다른 경우
        if(!username.equals(values.get(3))) 
        	return;
        // 창작자 or 관리자가 아닌경우 거절
		if(!userDetails.getAuthorities().toString().equals("[ROLE_CREATOR]") && !userDetails.getAuthorities().toString().equals("[ROLE_ADMIN]")) {
			System.out.println("관리자 or 창작자가 아닌 경우");
			return;
		}
		RecentlyNews recentlyNews = RecentlyNews.builder()
				.pro_number(values.get(0))
				.new_title(values.get(1))
				.new_description(values.get(2))
				.new_number(values.get(4))
				.build();
		cicService.updateRecentlyNews(recentlyNews);
	}
	
	@RequestMapping(value="/recentlyNews/delete", method=RequestMethod.POST, consumes="application/json")
    public void deleteRecentlyNews(@RequestBody Map map) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String username = userDetails.getUsername();
		// index(0) - number, index(1) - id
		List<String> values = new ArrayList<String>();
        map.forEach((k, v) -> {
			values.add((String)v);
		});
        if(!username.equals(values.get(1))) 
        	return;
        // 창작자 or 관리자가 아닌경우 거절
		if(!userDetails.getAuthorities().toString().equals("[ROLE_CREATOR]") && !userDetails.getAuthorities().toString().equals("[ROLE_ADMIN]")) {
			System.out.println("관리자 or 창작자가 아닌 경우");
			return;
		}
		cicService.deleteRecentlyNews(values.get(0));
	}

}
