package com.spring.model.vnConfig;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Component;

@Component
public class FlowSpace{

	@Field("vnid")
   private Integer vnId;

	private String ipv4Src;
  
    private String ipv4Dst;

	private Integer nodeId;
	private List<Integer> inPort;
   

	public Integer getNodeId() {
		return nodeId;
	}

	public void setNodeId(Integer  nodeId) {
		this.nodeId = nodeId;
	}

	public List<Integer> getInPort() {
		return inPort;
	}

	public void setInPort(List<Integer> inPort) {
		this.inPort = inPort;
	}

	/**
     * 
     * @return
     *     The ipv4Src
     */
   
    public Integer getVnId() {
	return vnId;
	}
	
	public void setVnId(Integer vnId) {
		this.vnId = vnId;
	}
    public String getIpv4Src() {
        return ipv4Src;
    }

    /**
     * 
     * @param ipv4Src
     *     The ipv4Src
     */
   
    public void setIpv4Src(String ipv4Src) {
        this.ipv4Src = ipv4Src;
    }

    /**
     * 
     * @return
     *     The ipv4Dst
     */
    
    public String getIpv4Dst() {
        return ipv4Dst;
    }

    /**
     * 
     * @param ipv4Dst
     *     The ipv4Dst
     */
  
    public void setIpv4Dst(String ipv4Dst) {
        this.ipv4Dst = ipv4Dst;
    }



	@Override
	public String toString() {
		return "FlowSpace [vnId=" + vnId + ", ipv4Src=" + ipv4Src + ", ipv4Dst=" + ipv4Dst + ", nodeId=" + nodeId
				+ ", inPort=" + inPort + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((ipv4Dst == null) ? 0 : ipv4Dst.hashCode());
		result = prime * result + ((ipv4Src == null) ? 0 : ipv4Src.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		FlowSpace other = (FlowSpace) obj;
		if (ipv4Dst == null) {
			if (other.ipv4Dst != null)
				return false;
		} else if (!ipv4Dst.equals(other.ipv4Dst))
			return false;
		if (ipv4Src == null) {
			if (other.ipv4Src != null)
				return false;
		} else if (!ipv4Src.equals(other.ipv4Src))
			return false;
		return true;
	}

	

}