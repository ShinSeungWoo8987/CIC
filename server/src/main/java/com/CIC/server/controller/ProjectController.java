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

import com.CIC.server.model.ProjectList;
import com.CIC.server.model.JwtRequest;
import com.CIC.server.model.Member;
import com.CIC.server.model.Project;
import com.CIC.server.model.SearchProject;
import com.CIC.server.service.CICService;
import com.CIC.server.util.Util;

@RestController(value="projectContoller")
public class ProjectController {

	@Autowired
	private CICService cicService;
	
	@Autowired
	private Util util;
	
	@RequestMapping(value="/project", method=RequestMethod.POST, consumes="application/json")
    public ProjectList getProject(@RequestBody Map map) throws Exception {
		try {
			List<String> values = new ArrayList<String>();
	        map.forEach((k, v) -> {
				values.add((String)v);
			});
	        int projectNumber = Integer.parseInt(values.get(0));
	        try {
	        	ProjectList project = this.cicService.getProject(projectNumber);
	            return project;
	        }catch (Exception e) {
	        	System.out.println("ProjectController getProject Error Message : Method-getProject Error");
			}
		}catch (Exception e) {
			System.out.println("ProjectController getProject Error Message : React-Axios Error");
		}
        return null;
	}
	
	@RequestMapping(value="/main/maxPage", method=RequestMethod.POST, consumes="application/json")
    public int getMainMaxPage(@RequestBody Map map) throws Exception {
		try {
			List<String> values = new ArrayList<String>();
	        map.forEach((k, v) -> {
				values.add((String)v);
			});
	        try {
	        	SearchProject searchProject = SearchProject.builder()
	            		.search(values.get(0))
	            		.type(this.util.getType(values.get(1)))
	            		.subMenu(values.get(2))
	            		.build();
	        	try {
	        		int projectListCnt = this.cicService.getMainProjectListCnt(searchProject);
	        		try {
	        			int maxPage = this.util.getMaxPage(projectListCnt);
	        			return maxPage;
	        		}catch (Exception e) {
	        			System.out.println("ProjectController getMainMaxPage Error Message : Method-getMaxPage Error");
					}
	        	}catch (Exception e) {
	        		System.out.println("ProjectController getMainMaxPage Error Message : Method-getProjectCnt Error");
				}
	        }catch (Exception e) {
	        	System.out.println("ProjectController getMainMaxPage Error Message : Model-Builder Error");
			}
		}catch (Exception e) {
			System.out.println("ProjectController getMainMaxPage Error Message : React-Axios Error");
		}
        return 0;
	}
	
	@RequestMapping(value="/main/list", method=RequestMethod.POST, consumes="application/json")
    public List<Project> getMainProjectList(@RequestBody Map map) throws Exception {
		try {
			List<String> values = new ArrayList<String>();
	        map.forEach((k, v) -> {
				values.add((String)v);
			});
	        try {
	        	int page = Integer.parseInt(values.get(0));
	    	    int listCnt = 8;
	            SearchProject searchProject = SearchProject.builder()
	            		.startNumber((1+(page-1)*listCnt)+"")
	            		.finishNumber((page*listCnt)+"")
	            		.search(values.get(1))
	            		.type(this.util.getType(values.get(2)))
	            		.subMenu(values.get(3))
	            		.build();
	            try {
	            	List<Project> list = this.cicService.getMainProjectList(searchProject);
	                return list;
	            }catch (Exception e) {
	            	System.out.println("ProjectController getMainProjectList Error Message : Method-getProjectList Error");
				}
	        }catch (Exception e) {
				System.out.println("ProjectController getMainProjectList Error Message : Model-Builder Error");
			}
		}catch (Exception e) {
			System.out.println("ProjectController getMainProjectList Error Message : React-Axios Error");
		}
        return null; 
    }
	
	@RequestMapping(value="/fundingList/maxPage", method=RequestMethod.POST, consumes="application/json")
    public int getFudningMaxPage(@RequestBody Map map) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String username = userDetails.getUsername();
		try {
			List<String> values = new ArrayList<String>();
	        map.forEach((k, v) -> {
				values.add((String)v);
			});
	        try {
	        	SearchProject searchProject = SearchProject.builder()
	            		.subMenu(values.get(0))
	            		.id(username)
	            		.build();
	        	try {
	        		int fundingProjectListCnt = this.cicService.getFundingProjectListCnt(searchProject);
	        		try {
	        			int maxPage = this.util.getMaxPage(fundingProjectListCnt);
	        			return maxPage;
	        		}catch (Exception e) {
	        			System.out.println("ProjectController getFudningMaxPage Error Message : Method-getMaxPage Error");
					}
	        	}catch (Exception e) {
	        		System.out.println("ProjectController getFudningMaxPage Error Message : Method-getProjectCnt Error");
				}
	        }catch (Exception e) {
	        	System.out.println("ProjectController getFudningMaxPage Error Message : Model-Builder Error");
			}
		}catch (Exception e) {
			System.out.println("ProjectController getFudningMaxPage Error Message : React-Axios Error");
		}
        return 0;
	}
	@RequestMapping(value="/fundingList/list", method=RequestMethod.POST, consumes="application/json")
    public List<Project> getFudningProjectList(@RequestBody Map map) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String username = userDetails.getUsername();
		try {
			List<String> values = new ArrayList<String>();
	        map.forEach((k, v) -> {
				values.add((String)v);
			});
	        try {
	        	int page = Integer.parseInt(values.get(0));
	    	    int listCnt = 8;
	            SearchProject searchProject = SearchProject.builder()
	            		.startNumber((1+(page-1)*listCnt)+"")
	            		.finishNumber((page*listCnt)+"")
	            		.subMenu(values.get(1))
	            		.id(username)
	            		.build();
	            try {
	            	List<Project> list = this.cicService.getFundingProjectList(searchProject);
	                return list;
	            }catch (Exception e) {
	            	System.out.println("ProjectController getFudningProjectList Error Message : Method-getProjectList Error");
				}
	        }catch (Exception e) {
				System.out.println("ProjectController getFudningProjectList Error Message : Model-Builder Error");
			}
		}catch (Exception e) {
			System.out.println("ProjectController getFudningProjectList Error Message : React-Axios Error");
		}
        return null; 
    }
	
	@RequestMapping(value="/projectList/maxPage", method=RequestMethod.POST, consumes="application/json")
    public int getMaxPage(@RequestBody Map map) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String username = userDetails.getUsername();
		try {
			List<String> values = new ArrayList<String>();
	        map.forEach((k, v) -> {
				values.add((String)v);
			});
	        try {
	        	SearchProject searchProject = SearchProject.builder()
	            		.subMenu(values.get(0))
	            		.id(username)
	            		.build();
	        	try {
	        		int fundingProjectListCnt = this.cicService.getProjectListCnt(searchProject);
	        		try {
	        			int maxPage = this.util.getMaxPage(fundingProjectListCnt);
	        			return maxPage;
	        		}catch (Exception e) {
	        			System.out.println("ProjectController getMaxPage Error Message : Method-getMaxPage Error");
					}
	        	}catch (Exception e) {
	        		System.out.println("ProjectController getMaxPage Error Message : Method-getProjectCnt Error");
				}
	        }catch (Exception e) {
	        	System.out.println("ProjectController getMaxPage Error Message : Model-Builder Error");
			}
		}catch (Exception e) {
			System.out.println("ProjectController getMaxPage Error Message : React-Axios Error");
		}
        return 0;
	}
	
	@RequestMapping(value="/projectList/list", method=RequestMethod.POST, consumes="application/json")
    public List<Project> getProjectList(@RequestBody Map map) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String username = userDetails.getUsername();
		try {
			List<String> values = new ArrayList<String>();
	        map.forEach((k, v) -> {
				values.add((String)v);
			});
	        try {
	        	int page = Integer.parseInt(values.get(0));
	    	    int listCnt = 8;
	            SearchProject searchProject = SearchProject.builder()
	            		.startNumber((1+(page-1)*listCnt)+"")
	            		.finishNumber((page*listCnt)+"")
	            		.subMenu(values.get(1))
	            		.id(username)
	            		.build();
	            try {
	            	List<Project> list = this.cicService.getProjectList(searchProject);
	                return list;
	            }catch (Exception e) {
	            	System.out.println("ProjectController getProjectList Error Message : Method-getProjectList Error");
				}
	        }catch (Exception e) {
				System.out.println("ProjectController getProjectList Error Message : Model-Builder Error");
			}
		}catch (Exception e) {
			System.out.println("ProjectController getProjectList Error Message : React-Axios Error");
		}
        return null; 
    }
	
	@RequestMapping(value="/projectListAll/maxPage", method=RequestMethod.POST, consumes="application/json")
    public int getAlltMaxPage(@RequestBody Map map) throws Exception {
		try {
			List<String> values = new ArrayList<String>();
	        map.forEach((k, v) -> {
				values.add((String)v);
			});
	        try {
	        	SearchProject searchProject = SearchProject.builder()
	            		.subMenu(values.get(0))
	            		.build();
	        	try {
	        		int fundingProjectListCnt = this.cicService.getProjectListAllCnt(searchProject);
	        		try {
	        			int maxPage = this.util.getMaxPage(fundingProjectListCnt);
	        			return maxPage;
	        		}catch (Exception e) {
	        			System.out.println("ProjectController getAlltMaxPage Error Message : Method-getMaxPage Error");
					}
	        	}catch (Exception e) {
	        		System.out.println("ProjectController getAlltMaxPage Error Message : Method-getProjectCnt Error");
				}
	        }catch (Exception e) {
	        	System.out.println("ProjectController getAlltMaxPage Error Message : Model-Builder Error");
			}
		}catch (Exception e) {
			System.out.println("ProjectController getAlltMaxPage Error Message : React-Axios Error");
		}
        return 0;
	}
	
	@RequestMapping(value="/projectListAll/list", method=RequestMethod.POST, consumes="application/json")
    public List<Project> getProjectListAll(@RequestBody Map map) throws Exception {
		try {
			List<String> values = new ArrayList<String>();
	        map.forEach((k, v) -> {
				values.add((String)v);
			});
	        try {
	        	int page = Integer.parseInt(values.get(0));
	    	    int listCnt = 8;
	            SearchProject searchProject = SearchProject.builder()
	            		.startNumber((1+(page-1)*listCnt)+"")
	            		.finishNumber((page*listCnt)+"")
	            		.subMenu(values.get(1))
	            		.build();
	            try {
	            	List<Project> list = this.cicService.getProjectListAll(searchProject);
	                return list;
	            }catch (Exception e) {
	            	System.out.println("ProjectController getProjectListAll Error Message : Method-getProjectList Error");
				}
	        }catch (Exception e) {
				System.out.println("ProjectController getProjectListAll Error Message : Model-Builder Error");
			}
		}catch (Exception e) {
			System.out.println("ProjectController getProjectListAll Error Message : React-Axios Error");
		}
        return null; 
    }
}
