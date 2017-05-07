package com.spring.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.spring.model.topoconfig.TopoConfig;

@Service
public class PhysicalTopoService {
	
	private static  Logger logger = LoggerFactory.getLogger(PhysicalTopoService.class);
	
	@Autowired
	@Qualifier("MongoTemplate")
	MongoTemplate mongoTemplate;
	
	public TopoConfig getTopoConfigByTimeStamp(Double timeStamp){
		TopoConfig topoConfig = new TopoConfig();
		try{
			topoConfig = mongoTemplate.findOne(new Query(Criteria.where("timeStamp").is(timeStamp)),TopoConfig.class); 
		}catch(Exception e){
			e.printStackTrace();
			logger.error("Can not find topoconfig by timestamp = " + timeStamp);
		}
		return topoConfig;
	}

	public Boolean saveTopoConfig(TopoConfig topoConfig){
		try{
			 mongoTemplate.insert(topoConfig); 
		}catch(Exception e){
			e.printStackTrace();
			logger.error("Can not save topoConfig");
		}
		return true;
	}
	
	public Boolean saveAllTopoConfig(List<TopoConfig> topoConfigs){
 		try{
 			 mongoTemplate.insertAll(topoConfigs); 
 		}catch(Exception e){
 			e.printStackTrace();
 			logger.error("Can not save all topoConfig");
 		}
 		return true;
	}
	
	
	public Boolean deleteTopoConfigByTimeStamp(Double timeStamp){
		//remove(Query query, Class<T> entityClass)
		try{
			mongoTemplate.remove(new Query(Criteria.where("timeStamp").is(timeStamp)),TopoConfig.class); 
		}catch(Exception e){
			e.printStackTrace();
			logger.error("Can not delete topoconfig by timestamp = " + timeStamp);
		}
		return true;
	}
	
	public List<TopoConfig> getAllTopoConfigs(){
		List<TopoConfig> topoConfigs = new ArrayList<TopoConfig>();
		try{
			topoConfigs = mongoTemplate.findAll(TopoConfig.class); 
			System.out.println("get all topoconfig");
		}catch(Exception e){
			e.printStackTrace();
			logger.error("Can not find all topoConfig ");
		}
		return topoConfigs;
	}
	
	public Boolean deleteAllTopoConfigs(){
		//dropCollection(Class<T> entityClass)
		try{
			mongoTemplate.dropCollection(TopoConfig.class); 
		}catch(Exception e){
			e.printStackTrace();
			logger.error("Can not delete all topoConfig ");
		}
		return true;
	}
}
