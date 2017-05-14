
package com.spring.model.dpResource;

import java.util.List;

import org.springframework.data.annotation.Transient;

public class Node {

    private String nodeId;
    private int maxTables;
    private int currentTables;
    private String manufacturer;
    private String hardware;
    private String software;
    private String description;
    private String serialNumber;
    
    
    private List<TerminationPoint> terminationPoint = null;


	public String getNodeId() {
		return nodeId;
	}


	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}


	public int getMaxTables() {
		return maxTables;
	}


	public void setMaxTables(int maxTables) {
		this.maxTables = maxTables;
	}


	public int getCurrentTables() {
		return currentTables;
	}


	public void setCurrentTables(int currentTables) {
		this.currentTables = currentTables;
	}


	public String getManufacturer() {
		return manufacturer;
	}


	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}


	public String getHardware() {
		return hardware;
	}


	public void setHardware(String hardware) {
		this.hardware = hardware;
	}


	public String getSoftware() {
		return software;
	}


	public void setSoftware(String software) {
		this.software = software;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getSerialNumber() {
		return serialNumber;
	}


	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}


	public List<TerminationPoint> getTerminationPoint() {
		return terminationPoint;
	}


	public void setTerminationPoint(List<TerminationPoint> terminationPoint) {
		this.terminationPoint = terminationPoint;
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + currentTables;
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((hardware == null) ? 0 : hardware.hashCode());
		result = prime * result + ((manufacturer == null) ? 0 : manufacturer.hashCode());
		result = prime * result + maxTables;
		result = prime * result + ((nodeId == null) ? 0 : nodeId.hashCode());
		result = prime * result + ((serialNumber == null) ? 0 : serialNumber.hashCode());
		result = prime * result + ((software == null) ? 0 : software.hashCode());
		result = prime * result + ((terminationPoint == null) ? 0 : terminationPoint.hashCode());
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
		if (currentTables != other.currentTables)
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (hardware == null) {
			if (other.hardware != null)
				return false;
		} else if (!hardware.equals(other.hardware))
			return false;
		if (manufacturer == null) {
			if (other.manufacturer != null)
				return false;
		} else if (!manufacturer.equals(other.manufacturer))
			return false;
		if (maxTables != other.maxTables)
			return false;
		if (nodeId == null) {
			if (other.nodeId != null)
				return false;
		} else if (!nodeId.equals(other.nodeId))
			return false;
		if (serialNumber == null) {
			if (other.serialNumber != null)
				return false;
		} else if (!serialNumber.equals(other.serialNumber))
			return false;
		if (software == null) {
			if (other.software != null)
				return false;
		} else if (!software.equals(other.software))
			return false;
		if (terminationPoint == null) {
			if (other.terminationPoint != null)
				return false;
		} else if (!terminationPoint.equals(other.terminationPoint))
			return false;
		return true;
	}


	@Override
	public String toString() {
		return "Node [nodeId=" + nodeId + ", maxTables=" + maxTables + ", currentTables=" + currentTables
				+ ", manufacturer=" + manufacturer + ", hardware=" + hardware + ", software=" + software
				+ ", description=" + description + ", serialNumber=" + serialNumber + ", terminationPoint="
				+ terminationPoint + "]";
	}



	

}