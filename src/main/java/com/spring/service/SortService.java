package com.spring.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.spring.model.flowtable.Flow;
import com.spring.model.flowtable.Flowtable;

/**
 * @author luyue
 *
 */
@Service
public class SortService {
	public String sortFlowtable(JSONObject flowtable){
		JSONArray table = new JSONArray();
		List<Flowtable> forSort = new ArrayList<Flowtable>();
		JSONArray result = new JSONArray();
		//JSONArray flowResult = new JSONArray();
		JSONObject results =new JSONObject();

		int tableLength;
		
		try{
			table = flowtable.getJSONArray("node").getJSONObject(0).getJSONArray("flow-node-inventory:table");
		}catch(Exception e){
			return null;
		}
		tableLength = table.length();
		for(int i=0;i<tableLength;i++){
			Flowtable temp = new Flowtable(table.getJSONObject(i));
			//JSONArray flowResult = new JSONArray();
			try{
				temp.getTable().get("flow");//如果没有flow则舍弃
				forSort.add(temp);
			}catch(Exception e){
			}
		}
		//sort by id
		Collections.sort(forSort);
		for(int i=0;i<forSort.size();i++){
			System.out.println("forSort:"+forSort.get(i));
		}
		
		for(int i=0;i<forSort.size();i++){
			JSONArray flowResult = new JSONArray();
			JSONObject temp = new JSONObject();
			temp = forSort.get(i).getTable();
			JSONArray array = new JSONArray();
			array=temp.getJSONArray("flow");
			List<Flow> forFlowSort = new ArrayList<Flow>();
			int arrayLength = array.length();
			System.out.println("arrayLength======"+arrayLength);
			for(int j=0;j<arrayLength;j++){
				Flow tempFlow = new Flow(array.getJSONObject(j));
				forFlowSort.add(tempFlow);
				//System.out.println(tempFlow.getFlow());
				//System.out.println(j);
			}
			//sort by priority
			Collections.sort(forFlowSort);

			for(int j=0;j<forFlowSort.size();j++){
				JSONObject tempFlow = forFlowSort.get(j).getFlow();
				flowResult.put(tempFlow);
				//System.out.println(j);
				//System.out.println("add:"+tempFlow);
			}
			
			JSONObject element = new JSONObject();
			element.put("id",temp.get("id"));
			element.put("flow",flowResult);
			result.put(element);
			System.out.println("add:"+flowResult);
		}
		results.put("table", result);
		System.out.println(results.toString());
		return results.toString();
	}
}
