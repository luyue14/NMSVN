
package com.spring.model.vnConfig;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;

import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;


public class SwitchMapping {

 
    private Integer node;

    private String ip;
    
    @Field("vnid")
    private Integer vnId;
   
    private List<Integer> ports = new ArrayList<Integer>();

    /**
     * 
     * @return
     *     The node
     */
    
    public Integer getNode() {
        return node;
    }

    /**
     * 
     * @param node
     *     The node
     */
  
    public void setNode(Integer node) {
        this.node = node;
    }

    /**
     * 
     * @return
     *     The ip
     */
  
    public String getIp() {
        return ip;
    }

    /**
     * 
     * @param ip
     *     The ip
     */
    
    public void setIp(String ip) {
        this.ip = ip;
    }

    /**
     * 
     * @return
     *     The vnid
     */
    
    public Integer getVnId() {
        return vnId;
    }

    /**
     * 
     * @param vnid
     *     The vnid
     */
 
    public void setVnId(Integer vnid) {
        this.vnId = vnid;
    }

    /**
     * 
     * @return
     *     The ports
     */
   
    public List<Integer> getPorts() {
        return ports;
    }

    /**
     * 
     * @param ports
     *     The ports
     */
  
    public void setPorts(List<Integer> ports) {
        this.ports = ports;
    }

	@Override
	public String toString() {
		return "SwitchMapping [node=" + node + ", ip=" + ip + ", vnid=" + vnId + ", ports=" + ports + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((ip == null) ? 0 : ip.hashCode());
		result = prime * result + ((node == null) ? 0 : node.hashCode());
		result = prime * result + ((ports == null) ? 0 : ports.hashCode());
		result = prime * result + ((vnId == null) ? 0 : vnId.hashCode());
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
		SwitchMapping other = (SwitchMapping) obj;
		if (ip == null) {
			if (other.ip != null)
				return false;
		} else if (!ip.equals(other.ip))
			return false;
		if (node == null) {
			if (other.node != null)
				return false;
		} else if (!node.equals(other.node))
			return false;
		if (ports == null) {
			if (other.ports != null)
				return false;
		} else if (!ports.equals(other.ports))
			return false;
		if (vnId == null) {
			if (other.vnId != null)
				return false;
		} else if (!vnId.equals(other.vnId))
			return false;
		return true;
	}

}
