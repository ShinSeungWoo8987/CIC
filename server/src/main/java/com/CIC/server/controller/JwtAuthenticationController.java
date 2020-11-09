package com.CIC.server.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.CIC.server.config.JwtTokenUtil;
import com.CIC.server.model.JwtRegisterRequest;
import com.CIC.server.model.JwtRequest;
import com.CIC.server.model.JwtResponse;
import com.CIC.server.model.Member;
import com.CIC.server.service.CICService;
import com.CIC.server.service.JwtUserDetailsService;


@RestController
@CrossOrigin
public class JwtAuthenticationController {
	
	@Autowired
	private CICService cicService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;
    
    BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    
    @RequestMapping(value = "/register", method = RequestMethod.PUT)
    public String register(@RequestBody JwtRegisterRequest registerRequest) {
//    	System.out.println(registerRequest.getUsername()+" / "+ registerRequest.getPassword());
    	try { // �븘�씠�뵒 以묐났�븯�뒗 泥댄겕
    		authenticate(registerRequest.getUsername(), registerRequest.getPassword());
        	final UserDetails userDetails = userDetailsService
                .loadUserByUsername(registerRequest.getUsername());
            final String token = jwtTokenUtil.generateToken(userDetails);
            
            return "username is already exist";
    	} catch (Exception e) { // 以묐났�릺�뒗 �븘�씠�뵒媛� �뾾�떎硫�, �벑濡앺븯湲�.
    		String username = registerRequest.getUsername();
    		String password = bcrypt.encode(registerRequest.getPassword()); // �븫�샇�솕
//    		System.out.println("�븫�샇�솕�맂 pw : " + password);
    		
    		// �쉶�썝媛��엯 吏꾪뻾
    		try {
    			Member member = Member.builder()
						.mem_id(username)
						.mem_pw(password)
						.mem_name(registerRequest.getName())
						.mem_birth(registerRequest.getBirth())
						.mem_phone(registerRequest.getPhone())
						.mem_postcode(registerRequest.getPostcode())
						.mem_address1(registerRequest.getAddress1())
						.mem_address2(registerRequest.getAddress2())
						.build();
				try {
					this.cicService.addMember(member);
				}catch (Exception e1) {
					System.out.println("register Error Message : Method-addMember Error");
					return "Fail";
				}
			}catch (Exception e2) {
				System.out.println("register Error Message : Model-Builder Error");
				return "Fail";
			}
    		
    		
    		
			return "Registered Successfully";
		}
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
    	// �뵒�뀒�씪.�뙣�뒪�썙�뱶 媛믪씠 �끂異쒕릺吏� �븡�룄濡� �쐞履쎌뿉 �꽑�뼵
    	authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        // req濡� 諛쏆� username�쓣 �넻�빐 userDetails瑜� 媛��졇�삤怨�, 
    	final UserDetails userDetails = userDetailsService
            .loadUserByUsername(authenticationRequest.getUsername());
        // 媛��졇�삩 userDetails瑜� �넻�빐 �넗�겙�쓣 �깮�꽦�빐以��떎. -> �씠�썑 �쐞�뿉�꽌 �떎�뻾�븳 authenticate硫붿냼�뱶�뿉 �뵲�씪 �깮�꽦�맂 token怨� 媛��졇�삩 媛믪쓣 鍮꾧탳�븯�뿬 �씪移섑븯�뒗吏� �옄�룞�쑝濡� 寃�利앸맂�떎. 
        final String token = jwtTokenUtil.generateToken(userDetails);
        int authority = 0;
//        System.out.println("Creator : "+userDetails.getAuthorities().toString().equals("[ROLE_CREATOR]"));
//        System.out.println("Admin : "+userDetails.getAuthorities().toString().equals("[ROLE_ADMIN]"));
        if(userDetails.getAuthorities().toString().equals("[ROLE_CREATOR]")){
        	authority = 1;
        }else if(userDetails.getAuthorities().toString().equals("[ROLE_ADMIN]")){
        	authority = 2;
        }
//        System.out.println("authority : "+authority);
        return ResponseEntity.ok(new JwtResponse(token,authority,userDetails.getUsername()));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
        	// request濡� �뱾�뼱�삩 �븘�씠�뵒/鍮꾨�踰덊샇 媛믪쑝濡� UsernamePasswordAuthenticationToken媛앹껜瑜� �깮�꽦�븳�떎.
        	// authenticationManager.authenticate瑜� �넻�빐 request�쓽 username�쓣 �넻�빐 媛��졇�삩 userDetails�� �옄�룞�쑝濡� 留ㅼ묶�븯�뿬 �씪移섑븯�뒗吏� �솗�씤�븳�떎.
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
    
    @RequestMapping(value = "/authenticate/pw", method = RequestMethod.POST, consumes="application/json")
    public List<String> checkPw(@RequestBody Map map) throws Exception {
    	List<String> result = new ArrayList<String>();
    	try {
	    	List<String> values = new ArrayList<String>();
			map.forEach((k, v) -> {
				values.add((String)v);
			});
			String inputPw = values.get(0);
			String pro_number = values.get(1);
			try {
				Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
				UserDetails userDetails = (UserDetails)principal;
				try {
					// 鍮꾨�踰덊샇 寃�利�
					authenticate(userDetails.getUsername(), values.get(0));
					final String token = jwtTokenUtil.generateToken(userDetails);
					// �봽濡쒖젥�듃 �궘�젣�쓽 寃쎌슦 �빐�떦 �봽濡쒖젥�듃�뿉 李몄뿬�븳 �씤�썝�씠 �엳�뒗吏� 泥댄겕
					if(pro_number!="") {
						try {
							int joinCnt = this.cicService.getProjectJoinCnt(pro_number);
							if(joinCnt!=0) {
								result.add("Refuse");
								return result;
							}
						}catch (Exception e) {
							System.out.println("JwtAuthenticationController checkPw Error Message : Method-getProjectJoinCnt Error");
						}
					}
					String confirm = "Success";
					String authority = "0";
			        if(userDetails.getAuthorities().toString().equals("[ROLE_CREATOR]")){
			        	authority = "1";
			        }else if(userDetails.getAuthorities().toString().equals("[ROLE_ADMIN]")){
			        	authority = "2";
			        }
			        result.add(confirm);
			        result.add(authority);
					return result;
				// 鍮꾨�踰덊샇 寃�利앹쓣 �떎�뙣�뻽�쓣 �븣, �빐�떦 �쐞移섎줈 �꽆�뼱�삤�뒗 寃쎌슦 or �삤瑜섍� 諛쒖깮�븳 寃쎌슦
				}catch (Exception e) {
					System.out.println("JwtAuthenticationController checkPw Error Message : Response Error");
				}
			}catch (Exception e) {
				System.out.println("JwtAuthenticationController checkPw Error Message : JWT Error");
			}
    	}catch (Exception e) {
			System.out.println("JwtAuthenticationController checkPw Error Message : React-Axios Error");
		}
    	result.add("Fail");
    	return result;
    }
    
    @RequestMapping(value = "/authenticate/findId", method = RequestMethod.POST, consumes="application/json")
    public String findId(@RequestBody Map map) throws Exception {
    	try {
	    	// index(0) : name, index(1): phone, index(2): birth
	    	List<String> values = new ArrayList<String>();
			map.forEach((k, v) -> {
				values.add((String)v);
			});
			try {
				String id = cicService.findId(values.get(0), values.get(1), values.get(2));
				if(id==null)
					return "Fail";
				return id;
			}catch (Exception e) {
				System.out.println("JwtAuthenticationController findId Error Message : Method-findId Error");
			}
    	}catch (Exception e) {
    		System.out.println("JwtAuthenticationController findId Error Message : React-Axios Error");
		}
    	return "Fail";
    }
    
    @RequestMapping(value = "/authenticate/findPw", method = RequestMethod.POST, consumes="application/json")
    public String findPw(@RequestBody Map map) throws Exception {
//    	.mem_pw(bcrypt.encode(values.get(1)))
    	try {
	    	// index(0) : id, index(1): pw
	    	List<String> values = new ArrayList<String>();
			map.forEach((k, v) -> {
				values.add((String)v);
			});
			try {
				if(cicService.getMember(values.get(0))!=null) {
					try {
						cicService.findPw(values.get(0), bcrypt.encode(values.get(1)));
						return "鍮꾨�踰덊샇媛� 蹂�寃쎈릺�뿀�뒿�땲�떎.";
					}catch (Exception e) {
						System.out.println("JwtAuthenticationController findPw Error Message : Method-findPw Error");
					}
				}
			}catch (Exception e) {
				System.out.println("JwtAuthenticationController findPw Error Message : Method-getMember Error");
			}
    	}catch (Exception e) {
    		System.out.println("JwtAuthenticationController findPw Error Message : React-Axios Error");
		}
		return "議댁옱�븯吏� �븡�뒗 �젙蹂댁엯�땲�떎.";
    }
}
