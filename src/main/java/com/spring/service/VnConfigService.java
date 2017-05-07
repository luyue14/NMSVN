package com.spring.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Service;

import com.spring.model.vnConfig.FlowSpace;
import com.spring.model.vnConfig.FlowSpace;
import com.spring.model.vnConfig.FlowSpaceRepository;
import com.spring.model.vnConfig.SwitchMapping;
import com.spring.model.vnConfig.SwitchMappingRepository;
import com.spring.model.vnConfig.TableMapping;
import com.spring.model.vnConfig.TableMappingRepository;
import com.spring.model.vnConfig.VnConfig;
import com.spring.model.vnConfig.VnConfigRepository;
//@EnableMongoRepositories("com.spring.model")
@Service
public class VnConfigService {
	
	private static  Logger logger = LoggerFactory.getLogger(VnConfigService.class);
	
	@Autowired
	VnConfigRepository vnConfigRepository;
	@Autowired
	FlowSpaceRepository flowSpaceRepository;
	@Autowired
	TableMappingRepository tableMappingRepository;
	@Autowired
	SwitchMappingRepository switchMappingRepository;
	public List<VnConfig> getAll(){
		List<VnConfig> vnConfigs = new ArrayList<VnConfig>();
		try{
			vnConfigs = vnConfigRepository.findAll();
		}catch(Exception e){
			logger.error("cannot find all vnconfig!");
		}
		return vnConfigs;
	}

	public List<VnConfig> getSelected(){
		List<VnConfig> vnConfigs = new ArrayList<VnConfig>();
		try{
			vnConfigs = vnConfigRepository.findBySelected(true);
		}catch(Exception e){
			logger.error("cannot find all selected vnconfig!");
		}
		return vnConfigs;
	}
	
	public List<VnConfig> getByVnId(int vnId){
		List<VnConfig> vnConfigs = new ArrayList<VnConfig>();
		try{
			vnConfigs = vnConfigRepository.findByVnId(vnId);
		}catch(Exception e){
			logger.error("cannot find vnid = " +vnId+" vnconfig!");
		}
		return vnConfigs;
	}
	
	public Boolean deleteByVnId(int vnId){
		try{
			vnConfigRepository.deleteByVnId(vnId);
		}catch(Exception e){
			logger.error("cannot delete vnid = " +vnId+" vnconfig!");
		}
		return true;
	}
	
	public VnConfig getByTimestamp(long timestamp){
		VnConfig vnConfig = new VnConfig();
		try{
			vnConfig = vnConfigRepository.findByTimeStamp(timestamp);
		}catch(Exception e){
			logger.error("cannot find timestamp = " +timestamp+" vnconfig!");
		}
		return vnConfig;
	}
	
	public Boolean saveVnConfigs(List<VnConfig> vnConfigs){
		System.out.println("vnconfig size"+vnConfigs.size());
		for(int i = 0;i<vnConfigs.size();i++){
			try{
				VnConfig temp = vnConfigs.get(i);
				System.out.println(temp);
				vnConfigRepository.save(temp);
			}catch(Exception e){
				e.printStackTrace();
				System.out.println("vnconfig error!!!!!!!!!!!!!");
				logger.error("cannot save i = "+i+"vnconfig!");
			}finally{
				logger.info("finish save vn config");
			}
		}
		return true;
	}
	
	public Boolean saveVnConfig(VnConfig vnConfig){
		try{
			vnConfigRepository.save(vnConfig);
		}catch(Exception e){
			logger.error("cannot save vnconfig!");
		}
		return true;
	}	
	
	
	//public void deleteAll();
	//public int deleteByTimeStamp(long timeStamp);
	
	public Boolean deleteAll(){
		try{
			vnConfigRepository.deleteAll();
		}catch(Exception e){
			logger.error("cannot delete vnconfig!");
		}
		return true;
	}
	
	public Boolean deleteByTimestamp(Long timestamp){
		try{
			vnConfigRepository.deleteByTimeStamp(timestamp);
			logger.info("delete timestamp = " +timestamp+" vnconfig!");

		}catch(Exception e){
			logger.error("cannot delete timestamp = " +timestamp+" vnconfig!");
		}
		return true;
	}
	
	public Boolean deleteFlowSpaces(){
		try{
			flowSpaceRepository.deleteAll();
		}catch(Exception e){
			logger.error("cannot delete all flow space");
		}
		return true;
	}
	
	public Boolean saveFlowSpaces(FlowSpace flowSpace){
			try{
				flowSpaceRepository.save(flowSpace);
				System.out.println(flowSpace);

			}catch(Exception e){
				logger.error("cannot save flow space!");
				e.printStackTrace();
			}finally{
				logger.info("finish save flowspace");
			}
		return true;
	}
	
	public Boolean deleteTableMappings(){
		try{
			tableMappingRepository.deleteAll();
		}catch(Exception e){
			logger.error("cannot delete all table mapping");
		}
		return true;
	}
	
	public List<TableMapping> getTableMappingsByVnId(int vnId){
		List<TableMapping> tableMappings = new ArrayList<TableMapping>();
		try{
			tableMappings = tableMappingRepository.findByVnId(vnId);
		}catch(Exception e){
			logger.error("cannot getl table mapping");
		}
		return tableMappings;
	}
	
	public Boolean saveTableMappings(List<TableMapping> tableMappings){
		if(tableMappings==null){
			return true;
		}
		for(int i = 0;i<tableMappings.size();i++){
			try{
				tableMappingRepository.save(tableMappings.get(i));
				System.out.println(tableMappings.get(i));
			}catch(Exception e){
				logger.error("cannot save i = "+i+"table mapping!");
			}finally{
				logger.info("finish save table mapping");
			}
		}
		return true;
	}
	
	public Boolean deleteSwitchMappings(){
		try{
			switchMappingRepository.deleteAll();
		}catch(Exception e){
			logger.error("cannot delete all switch mappings");
		}
		return true;
	}
	
	public Boolean saveSwitchMappings(List<SwitchMapping> switchMappings){
		for(int i = 0;i<switchMappings.size();i++){
			try{
				switchMappingRepository.save(switchMappings.get(i));
			}catch(Exception e){
				logger.error("cannot save i = "+i+"switch mapping!");
			}finally{
				logger.info("finish save swich mapping");
			}
		}
		return true;
	}
	
	public Boolean deleteTableMappingByVnId(int vnId){
		try{
			tableMappingRepository.deleteByVnId(vnId);
			logger.info("delete table mapping!");

		}catch(Exception e){
			logger.error("cannot delete table mapping!");
			return false;
		}
		return true;
	}

	public Boolean deleteFlowSpaceByVnId(int vnId){
		try{
			flowSpaceRepository.deleteByVnId(vnId);
			logger.info("delete flow space!");

		}catch(Exception e){
			logger.error("cannot delete flow space!");
			return false;
		}
		return true;
	}
	
	public Boolean deleteSwitchMappingByVnId(int vnId){
		try{
			switchMappingRepository.deleteByVnId(vnId);
		}catch(Exception e){
			logger.error("cannot delete switchMapping!");
			return false;
		}
		return true;
	}

}
