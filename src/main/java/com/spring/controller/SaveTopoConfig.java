package com.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.model.message.SuccessMessage;
import com.spring.model.topoconfig.TopoConfig;
import com.spring.service.PhysicalTopoService;

@Controller
public class SaveTopoConfig {
	@Autowired
	PhysicalTopoService topoService;
	
	   @RequestMapping(value="/editPhysicalTopo/saveTopoConfig.do",method=RequestMethod.POST)
	   public @ResponseBody SuccessMessage handler(@RequestBody List<TopoConfig> topoConfigs){
		   topoService.deleteAllTopoConfigs();
			  System.out.println(topoConfigs);
			  System.out.println("------------------------------------------------------------------------------");

		   topoService.saveAllTopoConfig(topoConfigs);
		  System.out.println(topoConfigs.get(topoConfigs.size()-1).getNode());
		   return new SuccessMessage("success");
	   }

}
