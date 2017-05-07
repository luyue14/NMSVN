package com.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.model.message.DeployTopoInfo;
import com.spring.model.message.SuccessMessage;
import com.spring.model.topoInfo.TopoInfo;
import com.spring.model.topoInfo.TopoInfoSessionFactory;
import com.spring.model.topoconfig.TopoConfig;
import com.spring.service.SwitchStartupService;

@EnableMongoRepositories("com.spring.model")
@Controller
public class DeleteTopoConfig {
	@Autowired   
	SwitchStartupService switchstartupservice;
	@Autowired
	TopoInfo topoInfo;
	@RequestMapping(value="/deployPhysicalTopo/deleteTopoConfig.do",method=RequestMethod.POST)
	   public @ResponseBody SuccessMessage handler(@RequestBody DeployTopoInfo deployTopoInfo){
			//TopoInfo topoInfo = deployTopoInfo.getTopoInfo();
			topoInfo.deleteTopoInfo(deployTopoInfo);
			switchstartupservice.getSwitchNodes(deployTopoInfo.getTimeStamp(), deployTopoInfo.getNodes());
			System.out.println("-------result---------");
			System.out.println("------------------------");
			switchstartupservice.StopSwitch();
			return new SuccessMessage("success");
		}
}
