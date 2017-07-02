package com.spring.model.test;

import java.io.Serializable;


public class NameValuePair {

	    private static final long serialVersionUID = -6437800749411518984L;

	    private String name;
	    private String value;

	    /**
	     * Default Constructor taking a name and a value. The value may be null.
	     *
	     * @param name The name.
	     * @param value The value.
	     */
	    
	    public NameValuePair() {
	        //this.name = Args.notNull(name, "Name");
	        this.value = value;
	    }
	    public NameValuePair(String name, String value) {
	        //this.name = Args.notNull(name, "Name");
	        this.value = value;
	    }

	    public String getName() {
	        return this.name;
	    }

	    public String getValue() {
	        return this.value;
	    }

	    public String toString() {
	        // don't call complex default formatting for a simple toString

	        if (this.value == null) {
	            return name;
	        }
	        final int len = this.name.length() + 1 + this.value.length();
	        final StringBuilder buffer = new StringBuilder(len);
	        buffer.append(this.name);
	        buffer.append("=");
	        buffer.append(this.value);
	        return buffer.toString();
	    }

	}


