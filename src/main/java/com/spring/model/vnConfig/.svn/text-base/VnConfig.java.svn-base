
package com.spring.model.vnConfig;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Field;

public class VnConfig {

 
	@Field("vnid")
    private Integer vnId;
  
    private String vnName;
 
    private String controllerIp;
   
    private Long timeStamp;
   
    private Boolean selected;
   
    private FlowSpaceFront flowSpace;
  
    private List<Dp> dp = new ArrayList<Dp>();

    /**
     * 
     * @return
     *     The vnId
     */
   
    public Integer getVnId() {
        return vnId;
    }

    /**
     * 
     * @param vnId
     *     The vnId
     */
  
    public void setVnId(Integer vnId) {
        this.vnId = vnId;
    }

    /**
     * 
     * @return
     *     The vnName
     */
    
    public String getVnName() {
        return vnName;
    }

    /**
     * 
     * @param vnName
     *     The vnName
     */
  
    public void setVnName(String vnName) {
        this.vnName = vnName;
    }

    /**
     * 
     * @return
     *     The controllerIp
     */
    
    public String getControllerIp() {
        return controllerIp;
    }

    /**
     * 
     * @param controllerIp
     *     The controllerIp
     */
    
    public void setControllerIp(String controllerIp) {
        this.controllerIp = controllerIp;
    }

    /**
     * 
     * @return
     *     The timeStamp
     */
   
    public Long getTimeStamp() {
        return timeStamp;
    }

    /**
     * 
     * @param timeStamp
     *     The timeStamp
     */
    
    public void setTimeStamp(Long timeStamp) {
        this.timeStamp = timeStamp;
    }

    /**
     * 
     * @return
     *     The selected
     */
    
    public Boolean getSelected() {
        return selected;
    }

    /**
     * 
     * @param selected
     *     The selected
     */
    
    public void setSelected(Boolean selected) {
        this.selected = selected;
    }

    /**
     * 
     * @return
     *     The flowSpace
     */
    
    public FlowSpaceFront getFlowSpace() {
        return flowSpace;
    }

    /**
     * 
     * @param flowSpace
     *     The flowSpace
     */
    
    public void setFlowSpace(FlowSpaceFront flowSpace) {
        this.flowSpace = flowSpace;
    }

    /**
     * 
     * @return
     *     The dp
     */
   
    public List<Dp> getDp() {
        return dp;
    }

    /**
     * 
     * @param dp
     *     The dp
     */
   
    public void setDp(List<Dp> dp) {
        this.dp = dp;
    }

	@Override
	public String toString() {
		return "VnConfig [vnId=" + vnId + ", vnName=" + vnName + ", controllerIp=" + controllerIp + ", timeStamp="
				+ timeStamp + ", selected=" + selected + ", flowSpace=" + flowSpace + ", dp=" + dp + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((controllerIp == null) ? 0 : controllerIp.hashCode());
		result = prime * result + ((dp == null) ? 0 : dp.hashCode());
		result = prime * result + ((flowSpace == null) ? 0 : flowSpace.hashCode());
		result = prime * result + ((selected == null) ? 0 : selected.hashCode());
		result = prime * result + ((timeStamp == null) ? 0 : timeStamp.hashCode());
		result = prime * result + ((vnId == null) ? 0 : vnId.hashCode());
		result = prime * result + ((vnName == null) ? 0 : vnName.hashCode());
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
		VnConfig other = (VnConfig) obj;
		if (controllerIp == null) {
			if (other.controllerIp != null)
				return false;
		} else if (!controllerIp.equals(other.controllerIp))
			return false;
		if (dp == null) {
			if (other.dp != null)
				return false;
		} else if (!dp.equals(other.dp))
			return false;
		if (flowSpace == null) {
			if (other.flowSpace != null)
				return false;
		} else if (!flowSpace.equals(other.flowSpace))
			return false;
		if (selected == null) {
			if (other.selected != null)
				return false;
		} else if (!selected.equals(other.selected))
			return false;
		if (timeStamp == null) {
			if (other.timeStamp != null)
				return false;
		} else if (!timeStamp.equals(other.timeStamp))
			return false;
		if (vnId == null) {
			if (other.vnId != null)
				return false;
		} else if (!vnId.equals(other.vnId))
			return false;
		if (vnName == null) {
			if (other.vnName != null)
				return false;
		} else if (!vnName.equals(other.vnName))
			return false;
		return true;
	}

}
