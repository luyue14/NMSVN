package com.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.model.message.SuccessMessage;
import com.spring.model.vnConfig.VnConfig;
import com.spring.service.VnConfigService;

@EnableMongoRepositories("com.spring.model")
@Controller
public class SaveVnConfig {

	@Autowired
	VnConfigService vnConfigService;
	//VNService vnService = new VNService(10,5);
	
	@RequestMapping(value="/addVN/saveVn.do",method=RequestMethod.POST)
    public @ResponseBody SuccessMessage handler(@RequestBody List<VnConfig> vnConfigs){
		
		System.out.println("success!!!");
		
		vnConfigService.deleteAll();
		//vnConfigService.deleteFlowSpaces();
		//vnConfigService.deleteTableMappings();
		//vnConfigService.deleteSwitchMappings();
		//List<FlowSpace> flowSpaces = vnService.formFlowSpace(vnConfigs);
		//System.out.println("flowspace="+flowSpaces);
		//List<TableMapping> tableMappings = vnService.formTableMapping(vnConfigs);
		//System.out.println("tableMappings="+tableMappings);

		//List<SwitchMapping> switchMappings = vnService.formSwitchmapping(vnConfigs);
		//vnConfigService.saveFlowSpaces(flowSpaces);
		//vnConfigService.saveSwitchMappings(switchMappings);
		//vnConfigService.saveTableMappings(tableMappings);
		vnConfigService.saveVnConfigs(vnConfigs);
		
    	
    	return new SuccessMessage("isSuccess");
    }
    

}
