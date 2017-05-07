package com.spring.service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadPoolExecutor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.scheduling.quartz.SimpleThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;

import com.spring.model.topoconfig.Node;
import com.spring.model.topoconfig.TerminationPoint;
import com.spring.model.topoconfig.TopoConfig;
import com.spring.util.ShellExecuter;

@Service
public class SwitchStartupService {

	private static  Logger logger = LoggerFactory.getLogger(SwitchStartupService.class);

	private List<Node> nodes;

	private String path;

	@Autowired
	PhysicalTopoService physicalTopoService;


	SimpleAsyncTaskExecutor taskExecutor;

	public void StartSwitch(){

		logger.info("entering service");

		path = "/home/openflow/godbean/original_0709/ofsoftswitch13-master";
		taskExecutor = new SimpleAsyncTaskExecutor ();
		

		for(Node node : nodes)
		{
		logger.info("executing task");

			try {
	
				taskExecutor.execute(new ConfigDeployer(node, path, "start"));
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	public void StopSwitch(){
		
		logger.info("entering service");

		path = "/home/openflow/godbean/original_0709/ofsoftswitch13-master";
		taskExecutor = new SimpleAsyncTaskExecutor();
		

		for(Node node : nodes)
		{
		logger.info("executing task");

			try {
				
				taskExecutor.execute(new ConfigDeployer(node, path, "stop"));
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	public void getSwitchNodes(Double timeStamp,List<Integer> nodesToStartup)  {
		this.nodes = new ArrayList<Node>();
		TopoConfig topoConfig = null;
		List<Node> topoNodes = new ArrayList<Node>();
		topoConfig = physicalTopoService.getTopoConfigByTimeStamp(timeStamp);

		if(topoConfig==null||topoConfig.getNode()==null){
			logger.info("topoConfig or topoConfig.getNode() is null");
			return ;
		}

		topoNodes = topoConfig.getNode();
		//			System.out.println("topoNodes num:"+topoNodes.size());
		//			System.out.println("-----------------");
		//			System.out.println("node"+topoNodes);
		//			System.out.println("-----------------");
		if(nodesToStartup == null) {
			return;
		}
		else{
			for(Integer i : nodesToStartup){
				Node tmp = topoConfig.getNodeByNodeId(i);
				if(tmp == null) {
					logger.info("can not find node:" + i);
					logger.error("can not find node:" + i);
				}
				else{
					System.out.println("tmp:"+tmp);
					this.nodes.add(tmp);
				}

			}
		}
	}

	private class ConfigDeployer implements Runnable{

		private Node node;
		private String mode;
		private String path,dpid,ports,shellcmd1,shellcmd2;

		private ShellExecuter shellExecuter;

		public ConfigDeployer(Node node, String path,String mode){
			logger.info("operation mode:"+mode);
			this.mode = mode;
			this.node = node;
			this.path = path;
			dpid = "";
			ports = "";
			shellcmd1 = "";
			shellcmd2 = "";
			logger.info("connecting to "+node.getSwitchIp());
			shellExecuter = new ShellExecuter("openflow","openflow",node.getSwitchIp(),22);	

			logger.info("task initialized");
		}

		public void run() {
			logger.info("entering task");	
			logger.info("switch type "+node.getSwitchType());		


			if(node.getSwitchType().equals("ofsoftswitch")){


				shellcmd1 = "cd "+path+"\n "
						+ "sudo ./stop.sh \n";
				
				logger.info("operation mode:",mode);

				if(mode.equals("start")){

					if(!node.getDatapathId().equals(""))
					{
						dpid =" -d "+node.getDatapathId();
					}

					ports = " -i ";
					for(TerminationPoint port :node.getTerminationPoint()){
						ports += port.getTpId()+",";
					}

					shellcmd2 ="cd "+path+"\n "
							+ "sudo ./udatapath/ofdatapath --detach punix:/var/run/dp0" + dpid + ports +"\n"	
							+ "sudo ./secchan/ofprotocol -D unix:/var/run/dp0 tcp:"+ node.getControllerIp()+":6633"+"\n";
					System.out.println(shellcmd2);

					shellExecuter.executeFile(shellcmd1);
					try {
						Thread.sleep(3000);
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					shellExecuter.executeFile(shellcmd2);

					logger.info("switch started");


				}
			
			else if(mode.equals("stop")){
				logger.info("stopping switch");
				shellExecuter.executeFile(shellcmd1);
				logger.info("switch stoped");

			}
			}

		}
	}

}
