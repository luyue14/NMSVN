package com.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.model.message.DeployTopoInfo;
import com.spring.model.message.SuccessMessage;
import com.spring.model.topoInfo.TopoInfo;
import com.spring.model.topoInfo.TopoInfoSessionFactory;
import com.spring.service.PhysicalTopoService;
import com.spring.service.SwitchStartupService;

@Controller
public class DeployTopoConfig {
	@Autowired
	PhysicalTopoService topoService;
	@Autowired   
	SwitchStartupService switchstartupservice;
	@Autowired
	TopoInfo topoInfo;
		@RequestMapping(value="/deployPhysicalTopo/deployTopoConfig.do",method=RequestMethod.POST)
	   public @ResponseBody SuccessMessage handler(@RequestBody DeployTopoInfo deployTopoInfo){
			
		  // TopoInfo topoInfo  = topoInfoSessionFactory.getTopoInfo();
		   topoInfo.setTopoInfo(deployTopoInfo);
		   
		   System.out.println(deployTopoInfo.getTimeStamp());
		   System.out.println(deployTopoInfo.getNodes());
		   
		   switchstartupservice.getSwitchNodes(deployTopoInfo.getTimeStamp(), deployTopoInfo.getNodes());
		   System.out.println("-------result---------");
		   System.out.println("------------------------");
		   switchstartupservice.StartSwitch();
		   return new SuccessMessage("success");
	   }
}
