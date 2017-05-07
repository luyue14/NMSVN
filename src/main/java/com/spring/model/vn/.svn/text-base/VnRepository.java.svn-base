package com.spring.model.vn;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.spring.model.topo.Topo;


public interface VnRepository extends MongoRepository<Vn, String> {
	
	public List<Vn> findAll();
	public List<Vn> findByVnid(int vnid);

}
