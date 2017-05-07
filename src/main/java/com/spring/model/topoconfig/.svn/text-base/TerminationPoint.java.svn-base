
package com.spring.model.topoconfig;

import javax.annotation.Generated;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;


public class TerminationPoint {

    
    private String tpId;
    private boolean selected;
    

    public boolean isSelected() {
		return selected;
	}

	public void setSelected(boolean selected) {
		this.selected = selected;
	}

	/**
     * 
     * @return
     *     The tpId
     */

    public String getTpId() {
        return tpId;
    }

    /**
     * 
     * @param tpId
     *     The tpId
     */
    
    public void setTpId(String tpId) {
        this.tpId = tpId;
    }

	@Override
	public String toString() {
		return "TerminationPoint [tpId=" + tpId + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((tpId == null) ? 0 : tpId.hashCode());
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
		TerminationPoint other = (TerminationPoint) obj;
		if (tpId == null) {
			if (other.tpId != null)
				return false;
		} else if (!tpId.equals(other.tpId))
			return false;
		return true;
	}

}
