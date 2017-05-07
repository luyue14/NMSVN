package com.spring.test;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.spring.model.topoconfig.Node;
import com.spring.model.topoconfig.TerminationPoint;
import com.spring.service.SwitchStartupService;



public class SwitchStartupTest {

	//@Autowired
	private SwitchStartupService service;
	private List<Node> nodes;
	
	@Test
	public void test(){
		
		Node node1 = new Node();
		
		node1.setControllerIp("172.17.17.2");
		node1.setDatapathId("");
		node1.setNodeId(1);
		node1.setSwitchIp("172.17.17.3");
		node1.setSwitchType("ofsoftswitch");
		TerminationPoint terminationPoint1 = new TerminationPoint();
		terminationPoint1.setTpId("eth1");
		TerminationPoint terminationPoint2 = new TerminationPoint();
		terminationPoint2.setTpId("eth3");
		List<TerminationPoint> list = new ArrayList<TerminationPoint>();
		list.add(terminationPoint1);
		list.add(terminationPoint2);
		node1.setTerminationPoint(list);
		
		System.out.println(node1.toString());
		
        Node node2 = new Node();
		
		node2.setControllerIp("172.17.17.2");
		node2.setDatapathId("000000000004");
		node2.setNodeId(2);
		node2.setSwitchIp("172.17.17.7");
		node2.setSwitchType("ofsoftswitch");
		TerminationPoint terminationPoint3 = new TerminationPoint();
		terminationPoint3.setTpId("eth2");
		TerminationPoint terminationPoint4 = new TerminationPoint();
		terminationPoint4.setTpId("eth3");
		List<TerminationPoint> list1 = new ArrayList<TerminationPoint>();
		list1.add(terminationPoint3);
		list1.add(terminationPoint4);
		node2.setTerminationPoint(list1);
		
		System.out.println(node2.toString());
		nodes = new ArrayList<Node>();
		nodes.add(node1);
		nodes.add(node2);
		
		
	    service = new SwitchStartupService();
		
		service.StartSwitch(nodes);
		
		
	}
}
