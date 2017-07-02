package com.spring.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.model.message.SuccessMessage;
import com.spring.model.test.NameValuePair;
import com.spring.service.TopoInfoService;
@Controller
public class TestNameValuePair {
	@RequestMapping(value="/namevalue.do",method=RequestMethod.POST)
    public @ResponseBody SuccessMessage handler(@RequestBody NameValuePair... parameters ){
		System.out.println("success!!!");
		
        List<NameValuePair> nameValuePair = Arrays.asList(parameters);
        for(int i=0;i<nameValuePair.size();i++){
        	System.out.println(nameValuePair.get(i));
        }
		
    	
    	return new SuccessMessage("isSuccess");
	}
}

