
package com.spring.model.topoconfig;

import javax.annotation.Generated;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;


public class Destination {

   
    private String destNode;
   
    private String destTp;

    /**
     * 
     * @return
     *     The destNode
     */
  
    public String getDestNode() {
        return destNode;
    }

    /**
     * 
     * @param destNode
     *     The destNode
     */
   
    public void setDestNode(String destNode) {
        this.destNode = destNode;
    }

    /**
     * 
     * @return
     *     The destTp
     */
  
    public String getDestTp() {
        return destTp;
    }

    /**
     * 
     * @param destTp
     *     The destTp
     */
   
    public void setDestTp(String destTp) {
        this.destTp = destTp;
    }

	@Override
	public String toString() {
		return "Destination [destNode=" + destNode + ", destTp=" + destTp + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((destNode == null) ? 0 : destNode.hashCode());
		result = prime * result + ((destTp == null) ? 0 : destTp.hashCode());
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
		Destination other = (Destination) obj;
		if (destNode == null) {
			if (other.destNode != null)
				return false;
		} else if (!destNode.equals(other.destNode))
			return false;
		if (destTp == null) {
			if (other.destTp != null)
				return false;
		} else if (!destTp.equals(other.destTp))
			return false;
		return true;
	}

}
