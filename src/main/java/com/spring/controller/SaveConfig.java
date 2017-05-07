package com.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.model.message.SuccessMessage;
import com.spring.model.topoCoordinate.TopoCoordinate;
import com.spring.service.ConfigService;

@EnableMongoRepositories("com.spring.model")
@Controller
public class SaveConfig {
	@Autowired
	ConfigService configService;
	
	@RequestMapping(value="/showVN/saveConfig.do",method=RequestMethod.POST)
    public @ResponseBody SuccessMessage handler(@RequestBody TopoCoordinate tpc){
		SuccessMessage sm = new SuccessMessage();
		configService.saveConfig(tpc, 0, tpc.getHashCode());
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
		sm.setIsSuccess("success");
		return sm;
	}
	
}
