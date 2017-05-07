package com.spring.model.vnConfig;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VnConfigRepository extends MongoRepository<VnConfig, String> {
	public List<VnConfig> findAll();
	public List<VnConfig> findBySelected(boolean selected);
	public List<VnConfig> findByVnId(int vnId);
	public int deleteByVnId(int vnId);
	public VnConfig findByTimeStamp(long timeStamp);
	public VnConfig save(VnConfig s);
	public void deleteAll();
	public int deleteByTimeStamp(long timeStamp);
	
}