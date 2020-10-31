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
    	try { // 아이디 중복하는 체크
    		authenticate(registerRequest.getUsername(), registerRequest.getPassword());
        	final UserDetails userDetails = userDetailsService
                .loadUserByUsername(registerRequest.getUsername());
            final String token = jwtTokenUtil.generateToken(userDetails);
            
            return "username is already exist";
    	} catch (Exception e) { // 중복되는 아이디가 없다면, 등록하기.
    		String username = registerRequest.getUsername();
    		String password = bcrypt.encode(registerRequest.getPassword()); // 암호화
//    		System.out.println("암호화된 pw : " + password);
    		
    		// 회원가입 진행
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
    	// 디테일.패스워드 값이 노출되지 않도록 위쪽에 선언
    	authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        // req로 받은 username을 통해 userDetails를 가져오고, 
    	final UserDetails userDetails = userDetailsService
            .loadUserByUsername(authenticationRequest.getUsername());
        // 가져온 userDetails를 통해 토큰을 생성해준다. -> 이후 위에서 실행한 authenticate메소드에 따라 생성된 token과 가져온 값을 비교하여 일치하는지 자동으로 검증된다. 
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
        return ResponseEntity.ok(new JwtResponse(token,authority));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
        	// request로 들어온 아이디/비밀번호 값으로 UsernamePasswordAuthenticationToken객체를 생성한다.
        	// authenticationManager.authenticate를 통해 request의 username을 통해 가져온 userDetails와 자동으로 매칭하여 일치하는지 확인한다.
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
    
    @RequestMapping(value = "/authenticate/pw", method = RequestMethod.POST, consumes="application/json")
    public List<String> checkPw(@RequestBody Map map) throws Exception {
    	try {
	    	List<String> values = new ArrayList<String>();
			map.forEach((k, v) -> {
				values.add((String)v);
			});
			String inputPw = values.get(0);
			try {
				Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
				UserDetails userDetails = (UserDetails)principal;
				try {
					authenticate(userDetails.getUsername(), values.get(0));
					final String token = jwtTokenUtil.generateToken(userDetails);
					String confirm = "Success";
					String authority = "0";
			        if(userDetails.getAuthorities().toString().equals("[ROLE_CREATOR]")){
			        	authority = "1";
			        }else if(userDetails.getAuthorities().toString().equals("[ROLE_ADMIN]")){
			        	authority = "2";
			        }
			        List<String> result = new ArrayList<String>();
			        result.add(confirm);
			        result.add(authority);
					return result;
				}catch (Exception e) {
					System.out.println("checkPw Error Message : Response Error");
				}
			}catch (Exception e) {
				System.out.println("checkPw Error Message : JWT Error");
			}
    	}catch (Exception e) {
			System.out.println("checkPw Error Message : React-Axios Error");
		}
    	return null;
    }
}
