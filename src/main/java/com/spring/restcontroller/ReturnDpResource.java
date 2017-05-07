package com.spring.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.model.dpResource.DpResource;
import com.spring.service.DpResourceService;

@RestController
public class ReturnDpResource {
	@Autowired
	private DpResourceService dpResourceService;
	
	@RequestMapping(value="/dpResource.do",method=RequestMethod.GET)
	 public @ResponseBody DpResource handler(){
		//DpResource dpResource = new DpResource();
		
		return dpResourceService.getDpResource();
	}
}
