package com.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.model.topoCoordinate.TopoCoordinate;
import com.spring.service.ConfigService;

@EnableMongoRepositories("com.spring.model")
@Controller
public class ReturnAddVnConfig {
	@Autowired
	ConfigService configService;
	@RequestMapping(value="/addVN/config.do",method=RequestMethod.POST)
    public @ResponseBody TopoCoordinate handler(){
		List<TopoCoordinate> ltpc = configService.getByConfigId(0);
		TopoCoordinate tpc = new TopoCoordinate();
		Boolean jud = true;
		if(ltpc.size()!=0){ tpc = ltpc.get(ltpc.size()-1);  jud=false; }
		if(jud){ tpc = configService.getNullConfig(); }
		return tpc;
	}
}