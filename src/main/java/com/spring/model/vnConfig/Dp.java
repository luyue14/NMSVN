
package com.spring.model.vnConfig;

import java.util.ArrayList;
import java.util.List;


public class Dp {

   
    private String dpId;

    private List<String> ports = new ArrayList<String>();
   
    private Integer flowtableNumber;

    /**
     * 
     * @return
     *     The dpId
     */
   
    public String getDpId() {
        return dpId;
    }

    /**
     * 
     * @param dpId
     *     The dpId
     */
   
    public void setDpId(String dpId) {
        this.dpId = dpId;
    }

    /**
     * 
     * @return
     *     The ports
     */
  
    public List<String> getPorts() {
        return ports;
    }

    /**
     * 
     * @param ports
     *     The ports
     */
  
    public void setPorts(List<String> ports) {
        this.ports = ports;
    }

    /**
     * 
     * @return
     *     The flowtableNumber
     */
 
    public Integer getFlowtableNumber() {
        return flowtableNumber;
    }

    /**
     * 
     * @param flowtableNumber
     *     The flowtableNumber
     */
   
    public void setFlowtableNumber(Integer flowtableNumber) {
        this.flowtableNumber = flowtableNumber;
    }

	@Override
	public String toString() {
		return "Dp [dpId=" + dpId + ", ports=" + ports + ", flowtableNumber=" + flowtableNumber + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((dpId == null) ? 0 : dpId.hashCode());
		result = prime * result + ((flowtableNumber == null) ? 0 : flowtableNumber.hashCode());
		result = prime * result + ((ports == null) ? 0 : ports.hashCode());
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
		Dp other = (Dp) obj;
		if (dpId == null) {
			if (other.dpId != null)
				return false;
		} else if (!dpId.equals(other.dpId))
			return false;
		if (flowtableNumber == null) {
			if (other.flowtableNumber != null)
				return false;
		} else if (!flowtableNumber.equals(other.flowtableNumber))
			return false;
		if (ports == null) {
			if (other.ports != null)
				return false;
		} else if (!ports.equals(other.ports))
			return false;
		return true;
	}

}
