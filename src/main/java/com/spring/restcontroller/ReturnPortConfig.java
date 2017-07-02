package com.spring.restcontroller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.model.portconfig.PortConfig;
import com.spring.model.portconfig.PortConfigs;

@RestController
public class ReturnPortConfig {
	@RequestMapping(value="/portconfig.do",method=RequestMethod.GET)
	 public @ResponseBody List<PortConfig> handler(){
		//DpResource dpResource = new DpResource();
		PortConfigs portConfig = new PortConfigs();
		return portConfig.getPortConfigs();
	}
}
