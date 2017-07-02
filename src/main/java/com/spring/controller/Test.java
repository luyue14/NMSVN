package com.spring.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.model.message.SuccessMessage;
import com.spring.model.test.NameValuePair;
import com.spring.model.vnConfig.VnConfig;
import com.spring.service.TopoInfoService;
import com.spring.service.VnConfigService;

@EnableMongoRepositories("com.spring.model")
@Controller
public class Test {

	@Autowired
	TopoInfoService topoInfoService;
	//VnConfigService vnConfigService;
	//VNService vnService = new VNService(10,5);
	
	@RequestMapping(value="/test.do",method=RequestMethod.GET)
    public @ResponseBody List<NameValuePair> handler(){
		topoInfoService.getAllTopoinfos();
		System.out.println("success!!!");
		
		List<NameValuePair> nameValuePair = new ArrayList<NameValuePair>();
		nameValuePair.add(new NameValuePair("1111", "222"));
		nameValuePair.add(new NameValuePair("11jkkl11", "22jk2"));

    	return nameValuePair;
	}
}
