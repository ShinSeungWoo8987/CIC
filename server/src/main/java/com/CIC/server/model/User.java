package com.CIC.server.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class User implements UserDetails {
    
    private String user_id;
    private String user_pw;
    private String auth;
    private String name;
    
   
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
          // TODO Auto-generated method stub
          
          List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();   
          authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
          return authorities;
    }
    
    @Override
    public String getPassword() {
          // TODO Auto-generated method stub
          return null;
    }
    @Override
    public String getUsername() {
          // TODO Auto-generated method stub
          return null;
    }
    @Override
    public boolean isAccountNonExpired() {
          // TODO Auto-generated method stub
          return true;
    }
    @Override
    public boolean isAccountNonLocked() {
          // TODO Auto-generated method stub
          return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
          // TODO Auto-generated method stub
          return true;
    }
    @Override
    public boolean isEnabled() {
          // TODO Auto-generated method stub
          return true;
    }
}