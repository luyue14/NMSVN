package com.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;

import com.spring.model.message.DeployTopoInfo;
import com.spring.model.topoInfo.TopoInfo;

@Controller
public class TopoState {
	@Autowired
	TopoInfo topoInfo;
	@RequestMapping(value="/deployPhysicalTopo/topoState.do",method=RequestMethod.POST)
    public @ResponseBody DeployTopoInfo handler(){
		DeployTopoInfo info = topoInfo.getTopoInfo();
		return info;
	}
}

