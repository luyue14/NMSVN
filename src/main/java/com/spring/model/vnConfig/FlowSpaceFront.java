package com.spring.model.vnConfig;

import javax.annotation.Generated;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;


public class FlowSpaceFront {

	private String ipv4Src;
  
    private String ipv4Dst;

   
    /**
     * 
     * @return
     *     The ipv4Src
     */

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
		return "FlowSpace [ipv4Src=" + ipv4Src + ", ipv4Dst=" + ipv4Dst + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((ipv4Dst == null) ? 0 : ipv4Dst.hashCode());
		result = prime * result + ((ipv4Src == null) ? 0 : ipv4Src.hashCode());
		return result;
	}

	

}