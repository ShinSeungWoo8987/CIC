package com.CIC.server.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.CIC.server.model.Funding;
import com.CIC.server.model.Money;
import com.CIC.server.service.CICService;

@RestController(value="moneyContoller")
public class MoneyController {
	
	@Autowired
    private CICService cicService;
	
	@GetMapping("/money/details")
	public List<Money> getMoneyDetails (){
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String username = userDetails.getUsername();
		
		List<Money> moneyDetails = this.cicService.getMoneyDetails(username);
		return moneyDetails;
	}
	
	@PutMapping(value="/money/charge", consumes="application/json")
    public List<Money> chargeMoney(@RequestBody Map map) {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails userDetails = (UserDetails)principal;
		String username = userDetails.getUsername();
		
		this.cicService.chargeMoney( (int)map.get("money"), username );
		
		List<Money> moneyDetails = this.cicService.getMoneyDetails(username);
		return moneyDetails;
    }
}