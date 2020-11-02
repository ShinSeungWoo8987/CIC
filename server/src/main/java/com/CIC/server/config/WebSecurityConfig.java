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
            	.antMatchers("/authenticate/pw").hasAnyRole("USER","CREATOR","ADMIN")
            	.antMatchers("/authenticate").permitAll()
            	.antMatchers("/member/update").hasAnyRole("USER","CREATOR","ADMIN")
            	.antMatchers("/member/delete").hasAnyRole("USER","CREATOR","ADMIN")
            	.antMatchers("/member/idList").permitAll()
            	.antMatchers("/member").hasAnyRole("USER","CREATOR","ADMIN")
            	.antMatchers("/fundingList/maxPage").hasAnyRole("USER","CREATOR")
            	.antMatchers("/fundingList/list").hasAnyRole("USER","CREATOR","ADMIN")
            	.antMatchers("/fundingMemberList/maxPage").hasAnyRole("CREATOR")
            	.antMatchers("/fundingMemberList/list").hasAnyRole("CREATOR")
            	.antMatchers("/funding").hasAnyRole("USER","CREATOR","ADMIN")
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
            	.antMatchers("/").permitAll()
            // all other requests need to be authenticated
            	.anyRequest().hasAnyRole("USER","ADMIN").and().
            // make sure we use stateless session; session won't be used to
            // store user's state.
                exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Add a filter to validate the tokens with every request
        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
