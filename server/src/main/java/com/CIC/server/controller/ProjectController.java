package com.CIC.server.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.CIC.server.model.ProjectList;
import com.CIC.server.model.ProjectSupportRes;
import com.CIC.server.model.RecentlyNews;
import com.CIC.server.model.Content;
import com.CIC.server.model.JwtRequest;
import com.CIC.server.model.Member;
import com.CIC.server.model.Project;
import com.CIC.server.model.ProjectInformation;
import com.CIC.server.model.SearchProject;
import com.CIC.server.service.CICService;
import com.CIC.server.util.Util;

@RestController(value="projectContoller")
public class ProjectController {
	int pagePerCnt = 8;
	
	private String project_num;
	private String project_name = "";
	private String category = "";
	private String target_money = "";
	private String sdate = "";
	private String fdate = "";
	private String thumbnail = "";
	private String logo = "";
	private String funding_price = "";
	private String email = "";
	
	private String title="";
	private String image="";
	private String description="";

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
	
	@RequestMapping(value="/project/delete", method=RequestMethod.POST, consumes="application/json")
    public void deleteProject(@RequestBody Map map) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String userId = userDetails.getUsername();
		String authority = userDetails.getUsername();
		
		
		try {
			List<String> values = new ArrayList<String>();
	        map.forEach((k, v) -> {
				values.add((String)v);
			});
	        String projectNumber = values.get(0);
	        try {
	        	if( userDetails.getAuthorities().toString().equals("[ROLE_ADMIN]") || userId.equals( this.cicService.checkProjectWriter(Integer.parseInt(projectNumber)) )) {
	        		int joinCnt = this.cicService.getProjectJoinCnt(projectNumber);
					if(joinCnt!=0) 
						return;
			        try {
			        	this.cicService.deleteProject(projectNumber);
			        }catch (Exception e) {
			        	System.out.println("ProjectController deleteProject Error Message : Method-deleteProject Error");
					}
	    		}
	        }catch (Exception e) {
	        	System.out.println("ProjectController deleteProject Error Message : Method-getProjectJoinCnt or checkProjectWriter Error");
			}
		}catch (Exception e) {
			System.out.println("ProjectController deleteProject Error Message : React-Axios Error");
		}
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
	        			int maxPage = this.util.getMaxPage(projectListCnt, pagePerCnt);
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
	            SearchProject searchProject = SearchProject.builder()
	            		.startNumber((1+(page-1)*pagePerCnt)+"")
	            		.finishNumber((page*pagePerCnt)+"")
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
	        			int maxPage = this.util.getMaxPage(fundingProjectListCnt, pagePerCnt);
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
	            SearchProject searchProject = SearchProject.builder()
	            		.startNumber((1+(page-1)*pagePerCnt)+"")
	            		.finishNumber((page*pagePerCnt)+"")
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
	        			int maxPage = this.util.getMaxPage(fundingProjectListCnt, pagePerCnt);
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
	            SearchProject searchProject = SearchProject.builder()
	            		.startNumber((1+(page-1)*pagePerCnt)+"")
	            		.finishNumber((page*pagePerCnt)+"")
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
	        			int maxPage = this.util.getMaxPage(fundingProjectListCnt, pagePerCnt);
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
	            SearchProject searchProject = SearchProject.builder()
	            		.startNumber((1+(page-1)*pagePerCnt)+"")
	            		.finishNumber((page*pagePerCnt)+"")
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
	
	@GetMapping("/project/{num}")
    public List<Content> getProjectDetails(@PathVariable String num) throws Exception {
		int projectNum = Integer.parseInt(num);
		List<Content> content = this.cicService.getContentDetails(projectNum);
        return content;
    }

	@GetMapping("/project/information/{num}")
    public ProjectInformation getProjectInformation(@PathVariable String num) throws Exception {
		int projectNum = Integer.parseInt(num);
		ProjectInformation projectInformation = this.cicService.getProjectDetails(projectNum);
        return projectInformation;
    }
	
	@RequestMapping(value="/project/add", method=RequestMethod.PUT, consumes="application/json")
    public String createProject( @RequestBody Map map ) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String username = userDetails.getUsername();
		
		System.out.println("-----------------------------------------");
        System.out.println( (ArrayList)map.get("sendContent") );
		
        map.forEach((k, v) -> {
        	if(!k.equals("sendContent")) {
        		switch ( (String)k ) {
				case "project_name":
					project_name = (String)v;
					break;
				case "category":
					category = (String)v;
					break;
				case "target_money":
					target_money = (String)v;
					break;
				case "sdate":
					sdate = (String)v;
					break;
				case "fdate":
					fdate = (String)v;
					break;
				case "thumbnail":
					thumbnail = (String)v;
					break;
				case "logo":
					logo = (String)v;
					break;
				case "funding_price":
					funding_price = (String)v;
					break;
				case "email":
					email = (String)v;
					break;
				default:
					System.out.println("Something Error");
					break;
				}
        		
        	}
        });
		Project project = Project.builder()
				  .mem_id(username)
				  .pro_title(project_name)
				  .typ_number( Integer.parseInt(category) )
				  .pro_target( Integer.parseInt(target_money) )
				  .pro_price( Integer.parseInt(funding_price) )
				  .pro_email(email)
				  .pro_start(sdate)
				  .pro_finish(fdate)
				  .pro_thumbnail(thumbnail)
				  .pro_logo(logo)
				  .build();
		try {
			this.cicService.addProject(project);
			
			ArrayList<Map> contentArray = (ArrayList)map.get("sendContent");
	        for(Map i : contentArray) {
				Content content = Content.builder()
	    				.con_type( ((String)i.get("head")).equals("text")?"t":"i" )
	    				.con_content((String)i.get("content"))
	    				.pro_number(project.getPro_number())
	    				.build();
				
				this.cicService.addContent(content);
			}
	        
			return "Successfully insert project";
		}catch (Exception e) {
			e.printStackTrace();
			return "insert project failed"; 
		}
    }
	
	
	
	
	
	@RequestMapping(value="/project/update", method=RequestMethod.POST, consumes="application/json")
    public String updateProject( @RequestBody Map map ) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String userId = userDetails.getUsername();
		
        map.forEach((k, v) -> {
        	if(!k.equals("sendContent")) {
        		switch ( (String)k ) {
        		case "project_num":
        			project_num = (String)v;
					break;
				case "project_name":
					project_name = (String)v;
					break;
				case "category":
					category = (String)v;
					break;
				case "target_money":
					target_money = (String)v;
					break;
				case "sdate":
					sdate = (String)v;
					break;
				case "fdate":
					fdate = (String)v;
					break;
				case "thumbnail":
					thumbnail = (String)v;
					break;
				case "logo":
					logo = (String)v;
					break;
				case "funding_price":
					funding_price = (String)v;
					break;
				case "email":
					email = (String)v;
					break;
				default:
					System.out.println("Something Error");
					break;
				}
        		
        	}
        });
		Project project = Project.builder()
				  .mem_id(userId)
				  .pro_number( Integer.parseInt(project_num) )
				  .pro_title(project_name)
				  .typ_number( Integer.parseInt(category) )
				  .pro_target( Integer.parseInt(target_money) )
				  .pro_price( Integer.parseInt(funding_price) )
				  .pro_email(email)
				  .pro_start(sdate)
				  .pro_finish(fdate)
				  .pro_thumbnail(thumbnail)
				  .pro_logo(logo)
				  .build();
		try {
			if( userDetails.getAuthorities().toString().equals("[ROLE_ADMIN]") ) {
				this.cicService.updateProject(project);
			}else {
				if(userId.equals( this.cicService.checkProjectWriter(project.getPro_number()) )) {
					this.cicService.updateProject(project);
				}else {
					return "권한이 없습니다..";
				}
			}
			
			ArrayList<Map> contentArray = (ArrayList)map.get("sendContent");
	        for(Map i : contentArray) {
				Content content = Content.builder()
						.con_number( (int)i.get("id") )
	    				.con_type( ((String)i.get("head")).equals("text")?"t":"i" )
	    				.con_content((String)i.get("content"))
	    				.pro_number(project.getPro_number())
	    				.build();
				
				this.cicService.updateContent(content);
			}
	        
			return "Successfully update project";
		}catch (Exception e) {
			e.printStackTrace();
			return "update project failed"; 
		}
    }
	
	@GetMapping("/project_support/{projectNum}/{pageNum}")
	public ProjectSupportRes getProjectSupport(@PathVariable String projectNum, @PathVariable String pageNum) {
		int pagePerCnt = 7;
		int startNum = ( Integer.parseInt(pageNum) -1)*pagePerCnt+1;
		int endNum = Integer.parseInt(pageNum)*pagePerCnt;
		int _cnt = this.cicService.getProjectSupportCnt(Integer.parseInt(projectNum));
		
		ProjectSupportRes projectSupportRes = ProjectSupportRes.builder()
				.fundingSupportCnt( util.getMaxPage(_cnt, pagePerCnt))
				.fundingSupportList( this.cicService.getProjectSupport(Integer.parseInt(projectNum),startNum,endNum) )
				.build();
		
		return projectSupportRes;
	}
}
