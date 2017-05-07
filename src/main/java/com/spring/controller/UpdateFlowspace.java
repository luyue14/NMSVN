package com.spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;


import com.spring.model.message.SuccessMessage;
import com.spring.model.vnConfig.EdgePort;
import com.spring.model.vnConfig.EdgePortInfo;
import com.spring.model.vnConfig.FlowSpace;
import com.spring.model.vnConfig.FlowSpace;
import com.spring.service.VnConfigService;

@Controller
public class UpdateFlowspace {
    @Autowired
    VnConfigService vnConfigService;
    //FlowSpace flowSpace;
	@RequestMapping(value="/showVN/edgePorts.do",method=RequestMethod.POST)
	public @ResponseBody SuccessMessage handler(@RequestBody EdgePortInfo edgePortInfo){
		//flowSpace.setEdgePorts(edgePortInfo.getEdgePorts());
		for(EdgePort i:edgePortInfo.getEdgePorts()){
			FlowSpace flowSpace = new FlowSpace();
			flowSpace.setVnId(edgePortInfo.getVnId());
			flowSpace.setNodeId(i.getNodeId());
			flowSpace.setInPort(i.getInPort());
			vnConfigService.saveFlowSpaces(flowSpace);
			System.out.println("add flowspace: "+flowSpace);
		}
		return new SuccessMessage("success");
	}
}
