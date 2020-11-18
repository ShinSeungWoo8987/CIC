package com.CIC.server.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	// '//'문자열 허용
	@Override
	public void configure(WebSecurity web) throws Exception {
	    web.httpFirewall(defaultHttpFirewall());
	}
	 
	@Bean
	public HttpFirewall defaultHttpFirewall() {
	    return new DefaultHttpFirewall();
	}


    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private UserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        // configure AuthenticationManager so that it knows from where to load
        // user for matching credentials
        // Use BCryptPasswordEncoder
    	System.out.println("configureGlobal");
        auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
}

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());
        // We don't need CSRF for this example
        httpSecurity.csrf().disable()
            // dont authenticate this particular request
            .authorizeRequests()
            	.antMatchers("/register").permitAll()
            	.antMatchers("/authenticate/findId").permitAll()
            	.antMatchers("/authenticate/findPw").permitAll()
            	.antMatchers("/authenticate").permitAll()
            	.antMatchers("/member/idList").permitAll()
            	.antMatchers("/fundingList/maxPage").hasAnyRole("USER","CREATOR")
            	.antMatchers("/fundingMemberList/maxPage").hasAnyRole("CREATOR")
            	.antMatchers("/fundingMemberList/list").hasAnyRole("CREATOR")
            	.antMatchers("/fundingDetailList/maxPage").hasAnyRole("USER","CREATOR")
            	.antMatchers("/fundingDetailList/list").hasAnyRole("USER","CREATOR")
            	.antMatchers("/fundingDetailList/delete").hasAnyRole("USER","CREATOR")
            	.antMatchers("/recentlyNewsList/maxPage").permitAll()
            	.antMatchers("/recentlyNewsList/list").permitAll()
            	.antMatchers("/recentlyNews/add").hasAnyRole("CREATOR")
            	.antMatchers("/recentlyNews/update").hasAnyRole("CREATOR")
            	.antMatchers("/recentlyNews/delete").hasAnyRole("CREATOR")
            	.antMatchers("/projectList/maxPage").hasAnyRole("CREATOR","ADMIN")
            	.antMatchers("/projectList/list").hasAnyRole("CREATOR","ADMIN")
            	.antMatchers("/projectListAll/maxPage").hasAnyRole("ADMIN")
            	.antMatchers("/projectListAll/list").hasAnyRole("ADMIN")
            	.antMatchers("/main/list").permitAll()
            	.antMatchers("/main/maxPage").permitAll()
            	.antMatchers("/project/delete").hasAnyRole("CREATOR","ADMIN")
            	.antMatchers("/project").permitAll()
            	.antMatchers("/noticeCnt").permitAll()
            	.antMatchers("/noticelist/{num}").permitAll()
            	.antMatchers("/noticelist/{num}/{key}").permitAll()
            	.antMatchers("/eventCnt").permitAll()
            	.antMatchers("/eventlist/{num}").permitAll()
            	.antMatchers("/eventlist/{num}/{key}").permitAll()
            	.antMatchers("/centerCnt").permitAll()
            	.antMatchers("/centerlist/{num}").permitAll()
            	.antMatchers("/centerlist/{num}/{key}").permitAll()
            	.antMatchers("/notice/update/{num}").permitAll()
            	
            	
            	
            	.antMatchers("/service_center/add").permitAll()
            	.antMatchers("/noticeCnt/{key}").permitAll()
            	.antMatchers("/eventCnt/{key}").permitAll()
            	.antMatchers("/centerCnt/{key}").permitAll()
            	.antMatchers("/service_center/update/{num}").permitAll()
            	.antMatchers("/service_center/delete/{num}").permitAll()
            	.antMatchers("/upload").permitAll()
            	.antMatchers("/type").permitAll()
            	.antMatchers("/hello").permitAll()
            	.antMatchers("/fundingList/list").permitAll()
            	.antMatchers("/project_support/{projectNum}/{pageNum}").permitAll()
            	.antMatchers("/project/{num}").permitAll()
            	.antMatchers("/project/information/{num}").permitAll()

            	.antMatchers("/projectListAll/list").hasAnyRole("ADMIN")
            	.antMatchers("/event/update/{num}").hasAnyRole("ADMIN")
            	.antMatchers("/event/delete/{num}").hasAnyRole("ADMIN")
            	.antMatchers("/notice/delete/{num}").hasAnyRole("ADMIN")
            	.antMatchers("/service_center_solution/update/{num}").hasAnyRole("ADMIN")
            	.antMatchers("/service_center_solution/delete/{num}").hasAnyRole("ADMIN")
            	.antMatchers("/event/uploadfile").hasAnyRole("ADMIN")
            	.antMatchers("/member/{sort}/{page}").hasAnyRole("ADMIN")
            	.antMatchers("/member/{sort}/{page}/{key}").hasAnyRole("ADMIN")
            	.antMatchers("/memberCnt/{sort}").hasAnyRole("ADMIN")
            	.antMatchers("/memberCnt/{sort}/{key}").hasAnyRole("ADMIN")
            	.antMatchers("/creator_request/{userId}").hasAnyRole("ADMIN")
            	.antMatchers("/member/delete/{userId}").hasAnyRole("ADMIN")
            	.antMatchers("/creator_request/{userId}/{decision}").hasAnyRole("ADMIN")
            	.antMatchers("/event/add").hasAnyRole("ADMIN")
            	.antMatchers("/notice/add").hasAnyRole("ADMIN")

            	.antMatchers("/project/add").hasAnyRole("CREATOR")
            	.antMatchers("/project/update").hasAnyRole("CREATOR","ADMIN")
            	.antMatchers("/creator/request").hasAnyRole("USER")
            	.antMatchers("/").permitAll()
            // all other requests need to be authenticated
            	.anyRequest().hasAnyRole("USER","CREATOR","ADMIN").and().
            // make sure we use stateless session; session won't be used to
            // store user's state.
                exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Add a filter to validate the tokens with every request
        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
