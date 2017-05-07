package com.spring.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.model.dpinventory.BlockFlag;
import com.spring.model.dpinventory.DpInventory;
import com.spring.model.vnConfig.*;

@Service
public class VNService {
	private static  Logger logger = LoggerFactory.getLogger(VNService.class);
	
	private Integer BlockNum;
	private Integer BlockSize;
//	private Integer TableNum;
	private int[] TableFlag;
	
	@Autowired
	DpInventoryService dpInventoryService;
	
	public VNService(){
	}
	
	public VNService(Integer BlockNum,Integer BlockSize){
		this.BlockNum = BlockNum;
		this.TableFlag = new int[BlockNum];
		this.BlockSize = BlockSize;
	}
	
	public void setBlockNum(Integer BlockNum){
		this.BlockNum = BlockNum; 
	}
	
	public Integer getBlockNum(){
		return this.BlockNum;
	}
	
	public void setTableFlag(){
		this.TableFlag = new int[BlockNum];
	}
	
	public void setTableFlag(int[] flag){
		this.TableFlag = flag;
	}
	
	public void setTableFlag(int flag, int pos){
		this.TableFlag[pos] = flag;
	}
	
	public int[] getTableFlag(){
		return this.TableFlag;
	}
	
	public void setBlockSize(Integer BlockSize){
		this.BlockSize = BlockSize;
	}
	
	public Integer getBlockSize(){
		return this.BlockSize;
	}
	
	public FlowSpace  formFlowSpace(VnConfig vnConfig){
			FlowSpaceFront fs = vnConfig.getFlowSpace();
			FlowSpace flowspace = new FlowSpace();
			flowspace.setIpv4Dst(fs.getIpv4Dst());
			flowspace.setIpv4Src(fs.getIpv4Src());
			flowspace.setVnId(vnConfig.getVnId());
		return flowspace;
	}
	
	public List<SwitchMapping> formSwitchmapping(List<VnConfig> vn){
		
		List<SwitchMapping> switchMapping = new ArrayList<SwitchMapping>();
		
		for(VnConfig i : vn){
			Integer vnId = i.getVnId();
			String ip = i.getControllerIp();
			List<Dp> dp = i.getDp();
			
			for(Dp j : dp){
				SwitchMapping s = new SwitchMapping(); 
				
				s.setVnId(vnId);
				s.setIp(ip);
				
				String DpId = j.getDpId();
				Integer nodeID = Integer.valueOf(DpId.split(":")[1]);
				s.setNode(nodeID);
				
				List<String> po = j.getPorts();
				List<Integer> ports = s.getPorts();
				for(String k : po){
					String[] tmp = k.split(":");
					ports.add(Integer.valueOf(tmp[2]));
				}
				switchMapping.add(s);
				
			}
			 
		 }
		return switchMapping;
	}
	
	public List<TableMapping> formTableMapping(List<VnConfig> vn) {
		List<TableMapping> tableMapping = new ArrayList<TableMapping>();
		
		for(VnConfig i : vn){
			Integer vnId = i.getVnId();
			List<Dp> dp = i.getDp();
			
			for(Dp j : dp){
//				System.out.println("---------"+j+"---------");

				int dpId =Integer.valueOf( j.getDpId().split(":")[1]);

				DpInventory dpInventory = dpInventoryService.findByDpId(dpId);
				
				if(dpInventory==null){
					return null;
				}
				
				
				int blockSize  = 0;
				try{
					 blockSize  = dpInventory.getBlockSize();//获取dpInventory中的blockSize;
				}
				catch(Exception e){
					blockSize = 10;
					dpInventoryService.updateBlockSize(dpId, blockSize);
				}
				
				int tableSize = 0;
				try{
					tableSize = dpInventory.getTableSize();
				}
				catch(Exception e){
					e.printStackTrace();
				}
				
				int reservedSize  = 0;
				try{
					reservedSize  = dpInventory.getReservedSize();//获取dpInventory中的reserveSize;
				}
				catch(Exception e){
					reservedSize = 10;
					reservedSize = (tableSize-reservedSize)%blockSize + reservedSize;
					dpInventoryService.updateReservedSize(dpId, reservedSize);
				}
				
				int blockFLagSize = 0;
				List<BlockFlag> blockFlags ;
				try{
					blockFlags = dpInventory.getBlockFlag(); //获取dpInventory中的blockFLag[];
				}
				catch(Exception e){
					blockFlags = new ArrayList<BlockFlag>();
				}
				blockFLagSize = blockFlags.size();
				
				if(blockFLagSize == 0){
					blockFLagSize = (tableSize - reservedSize)/blockSize;
					for( int k = 0;k<blockFLagSize;k++){
						BlockFlag blockFlag = new BlockFlag();
						blockFlag.setBlockNo(k);
						blockFlag.setStatus(-1);
						blockFlags.add(blockFlag);
						
					}
					dpInventoryService.updateBlockFlag(dpId, blockFlags);
				}
				
				int blockNo = -1;
				for(int m=0;m<blockFLagSize;m++){
					BlockFlag blockFlag = blockFlags.get(m);
					if(blockFlag.getStatus()== -1){
						blockNo = blockFlag .getBlockNo() ;
						blockFlag.setStatus(vnId);
						blockFlags.get(m).setStatus(vnId);
						dpInventoryService.updateBlockFlag(dpId, blockFlags);
						break;
					}
				}
			
				if(blockNo ==  -1){
					logger.error("Space is not enough!");
					break;
				}
				
				
//				System.out.println(blockNo);
				for(int k=0;k<j.getFlowtableNumber();k++){
					
					if(k>blockSize-1) break;
					
					TableMapping t = new TableMapping();
					t.setVnId(vnId);
					t.setNodeId(dpId);

					
					Integer vnTableId =k;
					t.setVnTableId(vnTableId);
					
					//增
					Integer tableId = reservedSize+blockNo*blockSize+k;
					t.setTableId(tableId);
					tableMapping.add(t);
				}	
				
		 }
		}
		return tableMapping;
	}
}
