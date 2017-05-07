package com.spring.model.message;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;

@Component
public class DeployTopoInfo {
	//@Autowired
	Double timeStamp; //= new Double(0d);
	//@Autowired
	List<Integer> nodes;// = new ArrayList<Integer>();
	public DeployTopoInfo(){
		
	}
	
	@Autowired
	public DeployTopoInfo(Double timestamp){
		this.timeStamp = timestamp;
	}
	
	public DeployTopoInfo(Double timestamp,List<Integer> nodes){
		this.timeStamp = timestamp;
		this.nodes = nodes;
	}
	
	public Double getTimeStamp() {
		return timeStamp;
	}
	public void setTimeStamp(Double timeStamp) {
		this.timeStamp = timeStamp;
	}
	public List<Integer> getNodes() {
		return nodes;
	}
	public void setNodes(List<Integer> nodes) {
		this.nodes = nodes;
	}

	
}
