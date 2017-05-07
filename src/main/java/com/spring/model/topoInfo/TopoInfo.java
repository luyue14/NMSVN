package com.spring.model.topoInfo;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.stereotype.Component;

import com.spring.model.message.DeployTopoInfo;
import com.spring.service.TopoInfoService;

@Component
public class TopoInfo {
	Logger logger = Logger.getLogger(TopoInfo.class);  
	@Autowired
	TopoInfoService topoInfoService;
	@Autowired
	DeployTopoInfo topoInfo;// = new DeployTopoInfo();
	
	public TopoInfo(){
		//List<DeployTopoInfo> topoInfos = topoInfoService.getAllTopoinfos();

		//if(topoInfos.size()!=0){
		//	topoInfo=topoInfos.get(0);
		//	System.out.println("there is history infomation in database.");
	//	}else{
			//topoInfo=new DeployTopoInfo(0d,new ArrayList<Integer>());
		//}
	}
	
	//public TopoInfo(){
	//	topoInfo=new DeployTopoInfo(0d,new ArrayList<Integer>());
	//}
	//set 和delete后持久化到数据库
	public synchronized void setTopoInfo(DeployTopoInfo topoInfo){
		//this.topoInfo=topoInfo;
		
		if((this.topoInfo!=null)&&this.topoInfo.getTimeStamp().equals(topoInfo.getTimeStamp())){
			HashSet<Integer> set = new HashSet<Integer>();
			for(int i=0;i<this.topoInfo.getNodes().size();i++){
				set.add(this.topoInfo.getNodes().get(i));
			}
			for(int i=0;i<topoInfo.getNodes().size();i++){
				if(!set.contains(topoInfo.getNodes().get(i))){
					this.topoInfo.getNodes().add(topoInfo.getNodes().get(i));
				}
			}
		}else{
			this.topoInfo=topoInfo;
		}
		topoInfoService.deleteAllTopoInfos();
		List<DeployTopoInfo> topoInfos = new ArrayList<DeployTopoInfo>();
		topoInfos.add(this.topoInfo);
		topoInfoService.saveAllTopoInfos(topoInfos);
	}
	
	public synchronized DeployTopoInfo getTopoInfo(){
		
			if(topoInfo.getTimeStamp()==0||topoInfo.getNodes().isEmpty()){
				List<DeployTopoInfo> deployTopoInfo = new ArrayList<DeployTopoInfo>();
				deployTopoInfo = topoInfoService.getAllTopoinfos();
				if(deployTopoInfo.size()==0){
					return new DeployTopoInfo(0d,new ArrayList<Integer>());
				}else{
					this.topoInfo=deployTopoInfo.get(0);
					return this.topoInfo;
				}
				
			}else{
				return topoInfo;
			}
	}
	
	public synchronized void deleteTopoInfo(DeployTopoInfo deleteInfo){
		for(int i=0;i<deleteInfo.getNodes().size();i++){
			for(int j=0;j<topoInfo.getNodes().size();j++){
				if(deleteInfo.getNodes().get(i).equals(topoInfo.getNodes().get(j))){
					topoInfo.getNodes().remove(j);
					break;
				}
			}
		}
		if(topoInfo.getNodes()==null||topoInfo.getNodes().size()==0){
			topoInfo.setTimeStamp(0d);
		}
		topoInfoService.deleteAllTopoInfos();
	}
	
}
