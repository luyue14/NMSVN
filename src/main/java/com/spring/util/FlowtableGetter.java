package com.spring.util;

import java.net.URI;
import java.net.URISyntaxException;



import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.spring.model.topoInfo.TopoInfo;
import com.spring.model.topoInfo.TopoInfoSessionFactory;


public class FlowtableGetter {
	private String nodeId;
	private String tableId;
	private String uri;
	GetConfig getConfig = new GetConfig("vnconfig.properties");

	
	
	//public FlowtableGetter(String nodeId,String tableId){
	//	uri = "http://"+getConfig.getValue("flowtableAddress")+"/restconf/operational/opendaylight-inventory:nodes/node/";
		
	//	uri = uri + nodeId + "/flow-node-inventory:table/" + tableId;
	//	}
	
	public FlowtableGetter(String nodeId){
		uri = "http://"+getConfig.getValue("flowtableAddress")+":"+getConfig.getValue("flowtablePort")+"/restconf/operational/opendaylight-inventory:nodes/node/";
		
		uri = uri + nodeId;
	}
	
	//get flowtable address from database
	//use timestamp and id find odl address
	
	public FlowtableGetter(String ip, String nodeId, String tableId){
		
	}
	
	public FlowtableGetter(String ip, String nodeId){
		/*get ip address
		default port is 8080
		use default port
		*/
		uri = "http://"+ip+":"+getConfig.getValue("flowtablePort")+"/restconf/operational/opendaylight-inventory:nodes/node/";
		
		uri = uri + nodeId;

		
	}

	
	
	public JSONObject getFlowtable(){
		System.out.println(uri);
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
	
		HttpHeaders putheaders = new HttpHeaders();
		putheaders.setContentType(MediaType.APPLICATION_JSON);
		putheaders.set("AUTHORIZATION", "Basic YWRtaW46YWRtaW4=");
		RequestEntity<String> requestEntity=null;
		ResponseEntity<String> response=null;
	    JSONObject rsbody = null;
		
	    try {
			requestEntity = new RequestEntity<String>(putheaders,HttpMethod.GET,
					 new URI(uri));
		} catch (URISyntaxException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	    
	
	    
		try {
				response = restTemplate.exchange(requestEntity,String.class);
				
			} catch (RestClientException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				
				rsbody = null;
				return rsbody;
			}

	    rsbody = new JSONObject(response.getBody());
	    return rsbody;
		
	}
	

}
