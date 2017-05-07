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
import com.spring.model.dpinventory.DpInventory;
import com.spring.model.message.SuccessMessage;
import com.spring.model.vn.Vn;
import com.spring.model.vn.VnRepository;
import com.spring.model.vnConfig.VnConfig;
import com.spring.service.DpInventoryService;
import com.spring.service.VnConfigService;

@EnableMongoRepositories("com.spring.model")
@Controller
public class DeleteVn {
	@Autowired
	VnConfigService vnConfigService;
	@Autowired
	DpInventoryService dpInventoryService;
	@Autowired
	private VnRepository vnRepository;
	//VNService vnService = new VNService(10,5);
	@RequestMapping(value="/addVN/deleteVn.do",method=RequestMethod.POST)
    public @ResponseBody SuccessMessage handler(@RequestBody int vnId){
		vnConfigService.deleteSwitchMappingByVnId(vnId);
		vnConfigService.deleteTableMappingByVnId(vnId);
		vnConfigService.deleteFlowSpaceByVnId(vnId);
		return new SuccessMessage("success");
	}
	
	@RequestMapping(value="/showVN/deleteVn.do",method=RequestMethod.POST)
    public @ResponseBody SuccessMessage handler2(@RequestBody int vnId){
		List<VnConfig> vnConfigs = new ArrayList<VnConfig>();
		vnConfigService.deleteSwitchMappingByVnId(vnId);
		vnConfigService.deleteTableMappingByVnId(vnId);
		vnConfigService.deleteFlowSpaceByVnId(vnId);
		vnConfigs = vnConfigService.getByVnId(vnId);
		for(int i=0;i<vnConfigs.size();i++){
			if(vnConfigs.get(i).getSelected()==true){
				vnConfigs.get(i).setSelected(false);
			}
		}
		vnConfigService.deleteByVnId(vnId);
		vnConfigService.saveVnConfigs(vnConfigs);
		dpInventoryService.updateBlockFlagStatus(vnId);
		List<Vn> links = vnRepository.findByVnid(vnId);
		////////
		/*
		int sleepTime=0;
		while(links.size()==0||(sleepTime>10000)){
			//轮询数据库
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
		if(sleepTime==10000){
			//HttpStatus httpStatus = ;
			//ResponseEntity response = new ResponseEntity(500);
			return new ResponseEntity((Object)new SuccessMessage("fail"),HttpStatus.INTERNAL_SERVER_ERROR);
		}else{
			return new ResponseEntity((Object)new SuccessMessage("success"),HttpStatus.OK);
			//return new SuccessMessage("success");
		}
		
		*/
		int sleepTime=0;

		while(sleepTime<10 &&links.size()!=0){
			//轮询数据库
			System.out.println("still can find link!!!");
			try{
			    Thread.currentThread().sleep(1000);
			}catch(InterruptedException ie){
			    ie.printStackTrace();
			}
			try{
				links = vnRepository.findByVnid(vnId);
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
		//return new SuccessMessage("success");
	}
}
