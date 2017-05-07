package com.spring.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import com.spring.model.topo.Topo;
import com.spring.model.topo.TopoRepository;
import com.spring.model.topoCoordinate.TopoCoordinateRepository;

//@EnableMongoRepositories("com.spring.model")
@Service
public class TopoService {
	
	private static  Logger logger = LoggerFactory.getLogger(TopoService.class);
	
	@Autowired
	public TopoCoordinateRepository topoCoordinateRepository; 
	@Autowired
	public TopoRepository topoRepository;
	
	public List<Topo> getAllTopo(){
	       List<Topo> topos = new ArrayList<Topo>();
			try {
	    	   topos  = topoRepository.findAll();	    	   
			} catch (Exception e) {
				logger.error("Can not get all topo from database.");;
			}
			return topos;
	}
	
	public  Topo getTopo(int index){
		   List<Topo> topos = new ArrayList<Topo>();
	       Topo topo = new Topo();
			try {
	    	   topos  = topoRepository.findAll();	    	   
			} catch (Exception e) {
				logger.error("Can not get all topo from database.");;
			}
			try{
				topo = topos.get(index);
			} catch (Exception e){
				logger.error("Can not get" + index + " topo.");
			}
			return topo;
	}
}
