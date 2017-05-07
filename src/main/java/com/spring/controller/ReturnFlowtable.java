package com.spring.controller;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.model.flowtableInfo.FlowtableInfo;
import com.spring.model.message.DeployTopoInfo;
import com.spring.model.topoInfo.TopoInfo;
import com.spring.model.topoInfo.TopoInfoSessionFactory;
import com.spring.model.topoconfig.Node;
import com.spring.model.topoconfig.TopoConfig;
import com.spring.model.vnConfig.TableMapping;
import com.spring.service.PhysicalTopoService;
import com.spring.service.SortService;
import com.spring.service.VnConfigService;
import com.spring.util.FlowtableGetter;
import com.spring.util.GetConfig;

@EnableMongoRepositories("com.spring.model")
@Controller
public class ReturnFlowtable {
	@Autowired
	SortService sortService;
	@Autowired
	VnConfigService vnConfigService;
	@Autowired
	PhysicalTopoService physicalTopoService;
	@Autowired
	TopoInfo topoInfo;
	
	@RequestMapping(value="/showVN/flowtable.do",method=RequestMethod.POST)
    public @ResponseBody String handler(@RequestBody FlowtableInfo flowtableInfo){
		System.out.println(flowtableInfo.getId());
		System.out.println(flowtableInfo.getVn());
		String nodeId = flowtableInfo.getId();
		//List<Integer> tableIds = new ArrayList<Integer>();
		String result = flowtableInfo.getId();
		//int vn = 0;
		
		if((flowtableInfo.getVn()!=null)&&(!flowtableInfo.getVn().equals("not"))){
			//获取虚拟网流表
			//从tableMapping获取物理网和虚拟网流表的映射关系
			System.out.println("vn flowtable");
			List<TableMapping> tableMappings = vnConfigService.getTableMappingsByVnId(Integer.parseInt(flowtableInfo.getVn()));
			for(int i=0;i<tableMappings.size();i++){
				//tableIds.add(tableMappings.get(i).getTableId());
				FlowtableGetter flowtableGetter = new FlowtableGetter(nodeId,tableMappings.get(i).getTableId().toString());
				result = result + flowtableGetter.getFlowtable();
			}
		}else{
			System.out.println("switch flowtable");
			//use odl ip in database 
			DeployTopoInfo deployTopoInfo = topoInfo.getTopoInfo();
			Double timestamp;
			TopoConfig topoConfig;
			try{
				timestamp = deployTopoInfo.getTimeStamp();
			}catch(Exception e){
				e.printStackTrace();
				return null;
			}
			System.out.println("timestamp===="+timestamp);
			try{
				topoConfig = physicalTopoService.getTopoConfigByTimeStamp(timestamp);
			}catch(Exception e){
				e.printStackTrace();
				return null;
			}
			
			int intnodeId;
			try{
				intnodeId = Integer.parseInt(nodeId.split(":")[1]);
			}catch(Exception e){
				e.printStackTrace();
				return null;
			}
			System.out.println("intnodeId===="+intnodeId);
			Node node = topoConfig.getNodeByNodeId(intnodeId);
			String ip = node.getControllerIp();
			FlowtableGetter flowtableGetter = new FlowtableGetter(ip,nodeId);
			try{
				JSONObject flowtable  = flowtableGetter.getFlowtable();
				System.out.println("flowtable:"+flowtable);
				result = sortService.sortFlowtable(flowtable);
				System.out.println("result:"+result);
			}catch(Exception e){
				e.printStackTrace();
			}
		}
		//nodeId=nodeId.substring(1,nodeId.length()-1);

		return result;
	}
}
