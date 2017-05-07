
package com.spring.model.topoconfig;

import javax.annotation.Generated;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;


public class Source {

   
    private String sourceTp;
  
    private String sourceNode;

    /**
     * 
     * @return
     *     The sourceTp
     */
    
    public String getSourceTp() {
        return sourceTp;
    }

    /**
     * 
     * @param sourceTp
     *     The sourceTp
     */

    public void setSourceTp(String sourceTp) {
        this.sourceTp = sourceTp;
    }

    /**
     * 
     * @return
     *     The sourceNode
     */
   
    public String getSourceNode() {
        return sourceNode;
    }

    /**
     * 
     * @param sourceNode
     *     The sourceNode
     */
   
    public void setSourceNode(String sourceNode) {
        this.sourceNode = sourceNode;
    }

	@Override
	public String toString() {
		return "Source [sourceTp=" + sourceTp + ", sourceNode=" + sourceNode + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((sourceNode == null) ? 0 : sourceNode.hashCode());
		result = prime * result + ((sourceTp == null) ? 0 : sourceTp.hashCode());
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
		Source other = (Source) obj;
		if (sourceNode == null) {
			if (other.sourceNode != null)
				return false;
		} else if (!sourceNode.equals(other.sourceNode))
			return false;
		if (sourceTp == null) {
			if (other.sourceTp != null)
				return false;
		} else if (!sourceTp.equals(other.sourceTp))
			return false;
		return true;
	}

}
