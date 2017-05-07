package com.spring.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spring.model.vn.Vn;
import com.spring.model.vn.VnRepository;
@EnableMongoRepositories("com.spring.model")
@Controller
public class ReturnLink {

		@Autowired
		private VnRepository vnRepository;
		@RequestMapping(value="/showVN/link.do",method=RequestMethod.POST)
	    public @ResponseBody List<Vn> handler(){
			List<Vn> ls = new ArrayList<Vn>();
			ls=vnRepository.findAll();
			//Vn l = new Vn();
			//try{
			//	l=ls.get(0);
			//}catch(Exception e){
			//	System.out.println("link error");
			//}
			return ls;
		}
	
}
