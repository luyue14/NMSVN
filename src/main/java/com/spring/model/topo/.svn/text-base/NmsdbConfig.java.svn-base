package com.spring.model.topo;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Component;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.ServerAddress;
import com.spring.util.GetConfig;
@Configuration
@Component

public class NmsdbConfig extends AbstractMongoConfiguration {

	@Override
	protected String getDatabaseName() {
		// TODO Auto-generated method stub
		GetConfig getConfig = new GetConfig("vnconfig.properties");
		String database = getConfig.getValue("database");
		return database;
	}

	@Bean
	public MongoClient mongo() throws Exception {
		// TODO Auto-generated method stub
		MongoClient mongoClient = null;
		GetConfig getConfig = new GetConfig("vnconfig.properties");
		//getConfig.setConfigFile("vnconfig.properties");
System.out.println(getConfig.getValue("ip"));
System.out.println(getConfig.getValue("port"));

		try {
			mongoClient = new MongoClient(new ServerAddress(getConfig.getValue("ip"),new Integer(getConfig.getValue("port"))));
//			mongoClient = new MongoClient(new ServerAddress("10.108.106.132", 30000));
			System.out.println("NMSVN DB connection established.");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return mongoClient;
	}
	
	@Bean(name="MongoTemplate")
	public MongoTemplate  template() throws Exception {
		// TODO Auto-generated method stub
		SimpleMongoDbFactory test = null;
		GetConfig getConfig = new GetConfig("vnconfig.properties");
		//getConfig.setConfigFile("vnconfig.properties");
System.out.println(getConfig.getValue("ip"));
System.out.println(getConfig.getValue("port"));
MongoClientURI uri = new MongoClientURI("mongodb://"+getConfig.getValue("ip")+
		":"+getConfig.getValue("port")+
		"/"+getConfig.getValue("database"));


		try {
			 test =new SimpleMongoDbFactory(uri);
//			mongoClient = new MongoClient(new ServerAddress("10.108.106.132", 30000));
			System.out.println("NMSVN DB connection established.");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return new MongoTemplate(test);
	}

}
