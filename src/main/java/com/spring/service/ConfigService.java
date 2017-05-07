package com.spring.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import com.spring.model.topo.TopoRepository;
import com.spring.model.topoCoordinate.Link;
import com.spring.model.topoCoordinate.Node;
import com.spring.model.topoCoordinate.TopoCoordinate;
import com.spring.model.topoCoordinate.TopoCoordinateRepository;

//@EnableMongoRepositories("com.spring.model")
@Service
public class ConfigService {
	
	private  Logger logger = LoggerFactory.getLogger(ConfigService.class);

	@Autowired
	public TopoCoordinateRepository topoCoordinateRepository; 
	@Autowired
	public TopoRepository topoRepository;
	
	
	public Boolean saveConfig(TopoCoordinate topoCoordinate, int configId, int topoHashCode){
		try{
			topoCoordinate.setConfigId(configId);
			topoCoordinate.setHashCode(topoHashCode);
			topoCoordinateRepository.save(topoCoordinate);
			logger.info("save config to database!");

		}catch(Exception e){
			e.printStackTrace();
			logger.error("Can not save config to database!");
		}
		return true;
	}
	
	public TopoCoordinate getNullConfig(){
		TopoCoordinate topoCoordinate = new TopoCoordinate();
		Integer  configId = 1;
		long timeStamp = 0;
	    List<Link> link = new ArrayList<Link>();
	    List<Node> node = new ArrayList<Node>();
	    topoCoordinate.setTimeStamp(timeStamp);
		topoCoordinate.setConfigId(configId);
		topoCoordinate.setLink(link);
		topoCoordinate.setNode(node);
		return topoCoordinate;
	}
	
	public TopoCoordinate getClusterConfig(long timeStamp){
		List<TopoCoordinate> topoCoordinates = new ArrayList<TopoCoordinate>();
		TopoCoordinate topoCoordinate = new TopoCoordinate();
		try{
				topoCoordinates = topoCoordinateRepository.findByTimeStamp(timeStamp);
		}catch(Exception e){
			    logger.error("Can not find timestamp = "  + timeStamp + " config ");
		}
		try{
				topoCoordinate = topoCoordinates.get(0);
		}catch (Exception e){
				logger.error("Can not find timestamp = "  + timeStamp + " config ");
		}
		return topoCoordinate;
	}
	
	public List<TopoCoordinate> getByConfigId(int configId){
		List<TopoCoordinate> topoCoordinates = new ArrayList<TopoCoordinate>();
		try{
				topoCoordinates = topoCoordinateRepository.findByConfigId(configId);
		}catch(Exception e){
			    logger.error("Can not find configId = "  + configId + " config ");
		}
		return topoCoordinates;
	}
	
	public Boolean deleteByConfigId(int configId){
		try{
			topoCoordinateRepository.deleteByConfigId(configId);
		}catch(Exception e){
		    logger.error("Can not delete configId = "  + configId + " config ");
		}
		return true;
	}
	
	public Boolean deleteByTimeStamp(long timeStamp){
		try{
			topoCoordinateRepository.deleteByTimeStamp(timeStamp);
		}catch(Exception e){
		    logger.error("Can not delete timeStamp = "  + timeStamp + " config ");
		}
		return true;
	}
	
}
