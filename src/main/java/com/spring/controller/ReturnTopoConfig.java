package com.spring.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.model.topo.Topo;
import com.spring.model.topoconfig.TopoConfig;
import com.spring.service.PhysicalTopoService;
import com.spring.service.SwitchStartupService;

@Controller
public class ReturnTopoConfig {
	@Autowired
	PhysicalTopoService topoService;

	   @RequestMapping(value="/deployPhysicalTopo/topoConfig.do",method=RequestMethod.POST)
	   public @ResponseBody List<TopoConfig> handler(){
		   	List<TopoConfig> topoConfigs = topoService.getAllTopoConfigs();
		   	topoConfigs = topoService.getAllTopoConfigs();
		   return topoConfigs;
	   }
	   
	   @RequestMapping(value="/editPhysicalTopo/topoConfig.do",method=RequestMethod.POST)
	   public @ResponseBody List<TopoConfig> handler2(){
		   	List<TopoConfig> topoConfigs = topoService.getAllTopoConfigs();
		   	topoConfigs = topoService.getAllTopoConfigs();
		   return topoConfigs;
	   }
	
}
