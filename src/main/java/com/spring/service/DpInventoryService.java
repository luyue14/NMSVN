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
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.spring.model.dpinventory.BlockFlag;
import com.spring.model.dpinventory.DpInventory;

@Service
public class DpInventoryService {

	private static  Logger logger = LoggerFactory.getLogger(DpInventoryService.class);
	
	@Autowired
	@Qualifier("MongoTemplate")
	MongoTemplate mongoTemplate;
	
	public DpInventory findByDpId(int dpId){
		DpInventory dpInventory= new DpInventory();
		try{
			dpInventory = mongoTemplate.findOne(new Query(Criteria.where("dpId").is(dpId)),DpInventory.class); 
		}catch(Exception e){
			e.printStackTrace();
			logger.error("Can not find DpInventory by dpId = " + dpId);
		}
		return dpInventory;
	}
	
	public Boolean updateBlockFlag(int dpId,List<BlockFlag> blockFlag){
		try{
			Update update = new Update();
			update.set("blockFlag", blockFlag);
			Query query = new Query(Criteria.where("dpId").is(dpId));
			//mongoTemplate.findAndModify(query, update, DpInventory.class);
			mongoTemplate.upsert(query, update,  DpInventory.class);
		}catch(Exception e){
			logger.error("Cannot update blockFlag");
		}
		return true;
	}
	
	public Boolean updateBlockFlagStatus(int vnId){
		try{
			Update update = new Update();
			update.set("blockFlag.$.status", -1);
			Query query = new Query(Criteria.where("blockFlag").elemMatch(Criteria.where("status").is(vnId)));
			mongoTemplate.updateMulti(query, update,  DpInventory.class);
		}catch(Exception e){
			e.printStackTrace();
		}
	return true;		

	}
	
	public Boolean updateTableSize(int dpId, int tableSize){
		try{
			Update update = new Update();
			update.set("tableSize", tableSize);
			Query query = new Query(Criteria.where("dpId").is(dpId));
			mongoTemplate.findAndModify(query, update, DpInventory.class);
		}catch(Exception e){
			logger.error("Cannot update tableSize");
		}
		return true;
	}
	
	public Boolean updateBlockSize(int dpId, int blockSize){
		try{
			Update update = new Update();
			update.set("blockSize", blockSize);
			Query query = new Query(Criteria.where("dpId").is(dpId));
			mongoTemplate.findAndModify(query, update, DpInventory.class);
		}catch(Exception e){
			logger.error("Cannot update blockSize");
		}
		return true;
	}
	
	public Boolean updateReservedSize(int dpId, int reservedSize){
		try{
			Update update = new Update();
			update.set("reservedSize", reservedSize);
			Query query = new Query(Criteria.where("dpId").is(dpId));
			mongoTemplate.findAndModify(query, update, DpInventory.class);
		}catch(Exception e){
			logger.error("Cannot update reservedSize");
		}
		return true;
	}
	
	public List<DpInventory> getDpInventory(){
		List<DpInventory> dpInventory = new ArrayList<DpInventory>();
		try{
			dpInventory = mongoTemplate.findAll(DpInventory.class); 
			System.out.println("get all DpInventory");
		}catch(Exception e){
			e.printStackTrace();
			logger.error("Can not find all DpInventory ");
		}
		return dpInventory;
	}
}
