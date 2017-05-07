
package com.spring.model.topoconfig;

import javax.annotation.Generated;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;


public class Link {

    
    private Integer linkId;
   
    private Destination destination;
    
    private Source source;

    /**
     * 
     * @return
     *     The linkId
     */
   
    public Integer getLinkId() {
        return linkId;
    }

    /**
     * 
     * @param linkId
     *     The linkId
     */
  
    public void setLinkId(Integer linkId) {
        this.linkId = linkId;
    }

    /**
     * 
     * @return
     *     The destination
     */
    
    public Destination getDestination() {
        return destination;
    }

    /**
     * 
     * @param destination
     *     The destination
     */
  
    public void setDestination(Destination destination) {
        this.destination = destination;
    }

    /**
     * 
     * @return
     *     The source
     */

    public Source getSource() {
        return source;
    }

    /**
     * 
     * @param source
     *     The source
     */

    public void setSource(Source source) {
        this.source = source;
    }

	@Override
	public String toString() {
		return "Link [linkId=" + linkId + ", destination=" + destination + ", source=" + source + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((destination == null) ? 0 : destination.hashCode());
		result = prime * result + ((linkId == null) ? 0 : linkId.hashCode());
		result = prime * result + ((source == null) ? 0 : source.hashCode());
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
		Link other = (Link) obj;
		if (destination == null) {
			if (other.destination != null)
				return false;
		} else if (!destination.equals(other.destination))
			return false;
		if (linkId == null) {
			if (other.linkId != null)
				return false;
		} else if (!linkId.equals(other.linkId))
			return false;
		if (source == null) {
			if (other.source != null)
				return false;
		} else if (!source.equals(other.source))
			return false;
		return true;
	}

}
