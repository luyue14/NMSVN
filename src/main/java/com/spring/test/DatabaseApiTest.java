package com.spring.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;

import com.spring.service.PhysicalTopoService;

//@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration({"/applicationContext.xml"})
public class DatabaseApiTest {
	//@Resource
	//DpInventoryService dpInventoryService=new DpInventoryService();// = new DpInventoryService();
   // @Transactional   //标明此方法需使用事务  
    //@Rollback(false)  //标明使用完此方法后事务不回滚,true时为回滚  

	PhysicalTopoService topoService;
	
	@Test
	public void testservice(){
		topoService = new PhysicalTopoService();

		//topoService.getAllTopoConfigs();
		System.out.println(topoService.getAllTopoConfigs());
		
		return ;
	}
}
