package com.spring.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.spring.model.dpResource.DpResource;
import com.spring.model.dpinventory.DpInventory;
@Service
public class DpResourceService {
	
	private static  Logger logger = LoggerFactory.getLogger(DpResourceService.class);
	
	@Autowired
	@Qualifier("MongoTemplate")
	private MongoTemplate mongoTemplate;
	@Autowired
	private DpInventoryService dpInventoryService;
	
	public DpResource getDpResource(){
		List<DpResource> dpResources = new ArrayList<DpResource>();
		DpResource dpResource = new DpResource();
		try{
			dpResources = mongoTemplate.findAll(DpResource.class); 
			dpResource = dpResources.get(0);
			System.out.println("get all dpResources");
		}catch(Exception e){
			e.printStackTrace();
			logger.error("Can not find all dpResources ");
		}
		return addCurrentTables(dpResource);
	}
	
	public DpResource addCurrentTables(DpResource dpResource){
		List<DpInventory> dpInventorys = dpInventoryService.getDpInventory();
		for(DpInventory dpInventory: dpInventorys){
			int currentTableSize = 0;
			int nodeId = dpInventory.getDpId();
			//计算currentTableSize
			//dpInventory里的blockflag 怎么标识这个block有没有用？？？
			for(int i=0;i<dpInventory.getBlockFlag().size();i++){
				if(dpInventory.getBlockFlag().get(i).getStatus()!=-1){
					currentTableSize = currentTableSize + 1;
				}
			}
			
			if(dpInventory.getBlockSize()!=null){
				currentTableSize = currentTableSize*dpInventory.getBlockSize();
			}else{
				currentTableSize = 0;
			}
			//currentTableSize = dpInventory.getTableSize() * dpInventory.getBlockFlag();
			//找到dpId 对应的 dpresource里的Node
			//修改node的current table
			for(int i=0;i<dpResource.getNode().size();i++){
				String dpId = dpResource.getNode().get(i).getNodeId();
				System.out.println(dpId);
				System.out.println("nodeId"+nodeId);
				int dpIdInt = Integer.parseInt(dpId.substring(9));
				System.out.println("dpId"+dpIdInt);
				if(dpIdInt==nodeId){
					System.out.println("success!!!@");
					dpResource.getNode().get(i).setCurrentTables(currentTableSize);
				}
			}
			
		}
		return dpResource;
	}
	
}
