
package com.spring.model.topoconfig;

import java.util.ArrayList;
import java.util.List;

public class TopoConfig {

  

    private Double timeStamp;
  
    private List<Node> node = new ArrayList<Node>();

    private List<Link> link = new ArrayList<Link>();

    /**
     * 
     * @return
     *     The timeStamp
     */

    public Double getTimeStamp() {
        return timeStamp;
    }

    /**
     * 
     * @param timeStamp
     *     The timeStamp
     */
   
    public void setTimeStamp(Double timeStamp) {
        this.timeStamp = timeStamp;
    }

    /**
     * 
     * @return
     *     The node
     */
  
    public List<Node> getNode() {
        return node;
    }

    /**
     * 
     * @param node
     *     The node
     */
  
    public void setNode(List<Node> node) {
        this.node = node;
    }

    public Node getNodeByNodeId(Integer nodeID){
    	
    	for(Node i : this.node){
			if(i.getNodeId().equals(nodeID)){
				return i;
			}
		}
    	
    	return null;
    }
    
    /**
     * 
     * @return
     *     The link
     */
   
    public List<Link> getLink() {
        return link;
    }

    /**
     * 
     * @param link
     *     The link
     */

    public void setLink(List<Link> link) {
        this.link = link;
    }
    

	@Override
	public String toString() {
		return "TopoConfig [timeStamp=" + timeStamp + ", node=" + node + ", link=" + link + "]";
	}
	
	  @Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + ((link == null) ? 0 : link.hashCode());
			result = prime * result + ((node == null) ? 0 : node.hashCode());
			result = prime * result + ((timeStamp == null) ? 0 : timeStamp.hashCode());
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
			TopoConfig other = (TopoConfig) obj;
			if (link == null) {
				if (other.link != null)
					return false;
			} else if (!link.equals(other.link))
				return false;
			if (node == null) {
				if (other.node != null)
					return false;
			} else if (!node.equals(other.node))
				return false;
			if (timeStamp == null) {
				if (other.timeStamp != null)
					return false;
			} else if (!timeStamp.equals(other.timeStamp))
				return false;
			return true;
		}

}
