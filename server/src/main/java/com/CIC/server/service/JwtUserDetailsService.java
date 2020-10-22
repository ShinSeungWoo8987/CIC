package com.CIC.server.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.CIC.server.model.Member;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Value("${jwt.secret}")
	private String secret;
	
	@Autowired
	private CICService cicService;

	@Override
    public UserDetails loadUserByUsername(String username) {
		List<GrantedAuthority> roles = new ArrayList<GrantedAuthority>();
		try {
			Member member = this.cicService.getMember(username);
			
			if(member.getGra_number()==1){ // 창작자
                roles.add(new SimpleGrantedAuthority("ROLE_CREATOR"));
//                System.out.println(roles);
                return new User(member.getMem_id(), member.getMem_pw(), roles);
            } else if(member.getGra_number()==2){ // 관리자
                roles.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
//                System.out.println(roles);
                return new User(member.getMem_id(), member.getMem_pw(), roles);
            } else { // 일반회원
                roles.add(new SimpleGrantedAuthority("ROLE_USER"));
//                System.out.println(roles);
                return new User(member.getMem_id(), member.getMem_pw(), roles);
            }
		}catch (UsernameNotFoundException e) {
			roles.add(new SimpleGrantedAuthority("ROLE_UNDEFINEDUSER"));
//			System.out.println(roles);
			return new User("", " ", roles);
		}
    }
}
