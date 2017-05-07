package com.spring.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.spring.model.message.DeployTopoInfo;

@Service
public class TopoInfoService {
	private  Logger logger = LoggerFactory.getLogger(TopoInfoService.class);
	
	@Autowired
	@Qualifier("MongoTemplate")
	MongoTemplate mongoTemplate;
	
	public List<DeployTopoInfo> getAllTopoinfos(){
		List<DeployTopoInfo> topoInfos = new ArrayList<DeployTopoInfo>();
		try{
			topoInfos = mongoTemplate.findAll(DeployTopoInfo.class); 
			logger.info("get all topoinfo");
		}catch(Exception e){
			e.printStackTrace();
			logger.error("Can not find all topoinfo ");
		}
		return topoInfos;
	}
	
	public Boolean deleteAllTopoInfos(){
		//dropCollection(Class<T> entityClass)
		try{
			mongoTemplate.dropCollection(DeployTopoInfo.class); 
			logger.info("delete all topo info");
		}catch(Exception e){
			e.printStackTrace();
			logger.error("Can not delete all topoInfo ");
			return false;
		}
		return true;
	}
	
	public Boolean saveAllTopoInfos(List<DeployTopoInfo> topoInfos){
		try{
			mongoTemplate.insertAll(topoInfos); 
			logger.info("save all topoinfo");
		}catch(Exception e){
 			e.printStackTrace();
 			logger.error("Can not save all topoInfo");
			return false;
		}
		return true;
	}
	
}
