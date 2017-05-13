
package com.spring.model.vnConfig;

import javax.annotation.Generated;

import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;


public class TableMapping {

	@Field("vnid")
    private Integer vnId;
    
    private Integer nodeId;
   
    private Integer vnTableId;
  
    private Integer tableId;

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
     *     The nodeId
     */
   
    public Integer getNodeId() {
        return nodeId;
    }

    /**
     * 
     * @param nodeId
     *     The nodeId
     */
  
    public void setNodeId(Integer nodeId) {
        this.nodeId = nodeId;
    }

    /**
     * 
     * @return
     *     The vnTableId
     */

    public Integer getVnTableId() {
        return vnTableId;
    }

    /**
     * 
     * @param vnTableId
     *     The vnTableId
     */
   
    public void setVnTableId(Integer vnTableId) {
        this.vnTableId = vnTableId;
    }

    /**
     * 
     * @return
     *     The tableId
     */
  
    public Integer getTableId() {
        return tableId;
    }

    /**
     * 
     * @param tableId
     *     The tableId
     */
    
    public void setTableId(Integer tableId) {
        this.tableId = tableId;
    }

	@Override
	public String toString() {
		return "TableMapping [vnid=" + vnId + ", nodeId=" + nodeId + ", vnTableId=" + vnTableId + ", tableId=" + tableId
				+ "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((nodeId == null) ? 0 : nodeId.hashCode());
		result = prime * result + ((tableId == null) ? 0 : tableId.hashCode());
		result = prime * result + ((vnTableId == null) ? 0 : vnTableId.hashCode());
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
		TableMapping other = (TableMapping) obj;
		if (nodeId == null) {
			if (other.nodeId != null)
				return false;
		} else if (!nodeId.equals(other.nodeId))
			return false;
		if (tableId == null) {
			if (other.tableId != null)
				return false;
		} else if (!tableId.equals(other.tableId))
			return false;
		if (vnTableId == null) {
			if (other.vnTableId != null)
				return false;
		} else if (!vnTableId.equals(other.vnTableId))
			return false;
		if (vnId == null) {
			if (other.vnId != null)
				return false;
		} else if (!vnId.equals(other.vnId))
			return false;
		return true;
	}

}
