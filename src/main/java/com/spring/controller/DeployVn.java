package com.spring.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.exception.DeployOrDeleteUnsuccessfulException;
import com.spring.model.message.SuccessMessage;
import com.spring.model.vn.Vn;
import com.spring.model.vn.VnRepository;
import com.spring.model.vnConfig.TableMapping;
import com.spring.model.vnConfig.FlowSpace;
import com.spring.model.vnConfig.FlowSpace;
import com.spring.model.vnConfig.SwitchMapping;
import com.spring.model.vnConfig.VnConfig;
import com.spring.service.DpInventoryService;
import com.spring.service.VNService;
import com.spring.service.VnConfigService;

@EnableMongoRepositories("com.spring.model")
@Controller
public class DeployVn {
	
	@Autowired
	VnConfigService vnConfigService;
	@Autowired
	private VnRepository vnRepository;
	@Autowired
	VNService vnService;
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	//@Autowired
	//FlowSpace flowSpace;
	
	@SuppressWarnings({ "static-access" })
	@RequestMapping(value="/showVN/deployVn.do",method=RequestMethod.POST)
    public @ResponseBody SuccessMessage handler(@RequestBody VnConfig vnConfig){
		//VNService vnService = new VNService(10,5);
		int vnId;
		List<VnConfig> vnConfigs = new ArrayList<VnConfig>();
		List<Vn> links = new ArrayList<Vn>();
		vnConfigs.add(vnConfig);
		FlowSpace flowSpace = vnService.formFlowSpace(vnConfig);
		System.out.println("flowspace="+flowSpace);
		List<TableMapping> tableMappings = vnService.formTableMapping(vnConfigs);
		System.out.println("tableMappings="+tableMappings);

		List<SwitchMapping> switchMappings = vnService.formSwitchmapping(vnConfigs);
		//flowSpace.setNodeId(null);
		if(tableMappings != null){
			vnConfigService.saveFlowSpaces(flowSpace);
			vnConfigService.saveSwitchMappings(switchMappings);
			vnConfigService.saveTableMappings(tableMappings);
			//vnConfigService.saveVnConfigs(vnConfigs);
			vnId = vnConfig.getVnId();
			Long timestamp = vnConfig.getTimeStamp();
			try{
				VnConfig vn = vnConfigService.getByTimestamp(timestamp);
				vn.setSelected(true);
				vnConfigService.deleteByTimestamp(timestamp);
				vnConfigService.saveVnConfig(vn);
			} catch(Exception e){
				System.out.println("Íø¹Ü µ÷ÓÃ");
			}
		}
		//flowSpace.setEdgePorts(null);
		int sleepTime=0;
		while(sleepTime<10 && links.size()==0){
			System.out.println("can not find link!!!");
			try{
			    Thread.currentThread().sleep(1000);
			}catch(InterruptedException ie){
			    ie.printStackTrace();
			}
			try{
				links = vnRepository.findByVnid(vnConfig.getVnId());
			}catch(Exception e){
				e.printStackTrace();
			}
			sleepTime++;
		}
		if(sleepTime>9){
			//HttpStatus httpStatus = ;
			//ResponseEntity response = new ResponseEntity(500);
			//return new ResponseEntity((Object)new SuccessMessage("fail"),HttpStatus.INTERNAL_SERVER_ERROR);
			throw new DeployOrDeleteUnsuccessfulException();
		}else{
			//return new ResponseEntity((Object)new SuccessMessage("success"),HttpStatus.OK);
			return new SuccessMessage("success");
		}
	}


}
