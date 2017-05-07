package com.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.model.vnConfig.VnConfig;
import com.spring.service.VnConfigService;

@EnableMongoRepositories("com.spring.model")
@Controller
public class ReturnVnConfig {
	@Autowired
	VnConfigService vnConfigService;
	 @RequestMapping(value="/addVN/vnConfig.do",method=RequestMethod.POST)
	 public @ResponseBody List<VnConfig> handler(){
		 return vnConfigService.getAll();
	 }
	
	 @RequestMapping(value="/showVN/vnConfig.do",method=RequestMethod.POST)
	 public @ResponseBody List<VnConfig> handler2(){
		 return vnConfigService.getAll();
	 }
}
