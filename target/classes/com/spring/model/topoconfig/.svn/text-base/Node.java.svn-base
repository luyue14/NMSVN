
package com.spring.model.topoconfig;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;


public class Node {

    
    private Integer nodeId;
    
    private String datapathId;
   
    private String switchIp;
   
    private String switchType;
    
    private String controllerIp;
   
    private List<TerminationPoint> terminationPoint = new ArrayList<TerminationPoint>();
    @JsonProperty("xCoordinate")
    private Double xCoordinate;

    @JsonProperty("yCoordinate")
    private Double yCoordinate;

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
     *     The datapathId
     */
 
    public String getDatapathId() {
        return datapathId;
    }

    /**
     * 
     * @param datapathId
     *     The datapathId
     */
   
    public void setDatapathId(String datapathId) {
        this.datapathId = datapathId;
    }

    /**
     * 
     * @return
     *     The switchIp
     */
   
    public String getSwitchIp() {
        return switchIp;
    }

    /**
     * 
     * @param switchIp
     *     The switchIp
     */

    public void setSwitchIp(String switchIp) {
        this.switchIp = switchIp;
    }

    /**
     * 
     * @return
     *     The switchType
     */
    
    public String getSwitchType() {
        return switchType;
    }

    /**
     * 
     * @param switchType
     *     The switchType
     */

    public void setSwitchType(String switchType) {
        this.switchType = switchType;
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
     *     The terminationPoint
     */
  
    public List<TerminationPoint> getTerminationPoint() {
        return terminationPoint;
    }

    /**
     * 
     * @param terminationPoint
     *     The terminationPoint
     */

    public void setTerminationPoint(List<TerminationPoint> terminationPoint) {
        this.terminationPoint = terminationPoint;
    }

    /**
     * 
     * @return
     *     The xCoordinate
     */
   
    public Double getXCoordinate() {
        return xCoordinate;
    }

    /**
     * 
     * @param xCoordinate
     *     The xCoordinate
     */

    public void setXCoordinate(Double xCoordinate) {
        this.xCoordinate = xCoordinate;
    }

    /**
     * 
     * @return
     *     The yCoordinate
     */
   
    public Double getYCoordinate() {
        return yCoordinate;
    }

    /**
     * 
     * @param yCoordinate
     *     The yCoordinate
     */
    
    public void setYCoordinate(Double yCoordinate) {
        this.yCoordinate = yCoordinate;
    }

	@Override
	public String toString() {
		return "Node [nodeId=" + nodeId + ", datapathId=" + datapathId + ", switchIp=" + switchIp + ", switchType="
				+ switchType + ", controllerIp=" + controllerIp + ", terminationPoint=" + terminationPoint
				+ ", xCoordinate=" + xCoordinate + ", yCoordinate=" + yCoordinate + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((controllerIp == null) ? 0 : controllerIp.hashCode());
		result = prime * result + ((datapathId == null) ? 0 : datapathId.hashCode());
		result = prime * result + ((nodeId == null) ? 0 : nodeId.hashCode());
		result = prime * result + ((switchIp == null) ? 0 : switchIp.hashCode());
		result = prime * result + ((switchType == null) ? 0 : switchType.hashCode());
		result = prime * result + ((terminationPoint == null) ? 0 : terminationPoint.hashCode());
		result = prime * result + ((xCoordinate == null) ? 0 : xCoordinate.hashCode());
		result = prime * result + ((yCoordinate == null) ? 0 : yCoordinate.hashCode());
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
		Node other = (Node) obj;
		if (controllerIp == null) {
			if (other.controllerIp != null)
				return false;
		} else if (!controllerIp.equals(other.controllerIp))
			return false;
		if (datapathId == null) {
			if (other.datapathId != null)
				return false;
		} else if (!datapathId.equals(other.datapathId))
			return false;
		if (nodeId == null) {
			if (other.nodeId != null)
				return false;
		} else if (!nodeId.equals(other.nodeId))
			return false;
		if (switchIp == null) {
			if (other.switchIp != null)
				return false;
		} else if (!switchIp.equals(other.switchIp))
			return false;
		if (switchType == null) {
			if (other.switchType != null)
				return false;
		} else if (!switchType.equals(other.switchType))
			return false;
		if (terminationPoint == null) {
			if (other.terminationPoint != null)
				return false;
		} else if (!terminationPoint.equals(other.terminationPoint))
			return false;
		if (xCoordinate == null) {
			if (other.xCoordinate != null)
				return false;
		} else if (!xCoordinate.equals(other.xCoordinate))
			return false;
		if (yCoordinate == null) {
			if (other.yCoordinate != null)
				return false;
		} else if (!yCoordinate.equals(other.yCoordinate))
			return false;
		return true;
	}

}
