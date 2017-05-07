package com.spring.util;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.ChannelShell;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;



public class ShellExecuter{
	 
	 private  String username; // username for remote host
	 private  String password; // password of the remote host
	 private  String host; // remote host address
	 private  int port;
	    
	 Logger logger = Logger.getLogger(ShellExecuter.class.getName());
	 public ShellExecuter(String username,String password,String host,int port ){
		 this.username = username;
		 this.password = password;
		 this.host = host;
		 this.port = port;
	 }
	 /**
	  * This method will execute the script file on the server.
	  * This takes file name to be executed as an argument
	  * The result will be returned in the form of the list
	  * @param shellCmd
	  * @return
	  */
	 public void executeFile(String shellCmd)
	 {
	     List<String> result = new ArrayList<String>();
	     logger.info("entering executefile");
	    

         /**
         * Create a new Jsch object
         * This object will execute shell commands or scripts on server
         */
	     JSch jsch=null;
		try {
			jsch = new JSch();
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	     logger.info("jsch object created");
	     
	     try
	     {
	    	 logger.info("entering executefile try");

	        

	         /*
	         * Open a new session, with your username, host and port
	         * Set the password and call connect.
	         * session.connect() opens a new connection to remote SSH server.
	         * Once the connection is established, you can initiate a new channel.
	         * this channel is needed to connect to remotely execution program
	         */
	         Session session = jsch.getSession(username, host, port);
	         session.setConfig("StrictHostKeyChecking", "no");
	         session.setPassword(password);
	         session.connect();
	         logger.info("ssh session connected to "+host);

	     
	         //create the excution channel over the session
	         ChannelExec channelShell = (ChannelExec) session.openChannel("exec");

	        
	         // Gets an InputStream for this channel. All data arriving in as messages from the remote side can be read from this stream.
	         //InputStream in = new ByteArrayInputStream(shellCmd.getBytes(StandardCharsets.UTF_8));

	         InputStream in = channelShell.getInputStream();
	         // Set the command that you want to execute
	         // In our case its the remote shell script
	        // channelShell.setInputStream(in);
	         channelShell.setCommand(shellCmd);
	      
	       

	         // Execute the command
	         channelShell.connect();
	       
	         // Read the output from the input stream we set above
	         BufferedReader reader = new BufferedReader(new InputStreamReader(in));
	         String line;
	         
	         //Read each line from the buffered reader and add it to result list
	         // You can also simple print the result here 
	         while ((line = reader.readLine()) != null)
	         {
	             result.add(line);
	             logger.info(line);
	         }

	         //retrieve the exit status of the remote command corresponding to this channel
	         int exitStatus = channelShell.getExitStatus();

	         //Safely disconnect channel and disconnect session. If not done then it may cause resource leak
	         channelShell.disconnect();
	         session.disconnect();

	         if(exitStatus < 0){
	            // System.out.println("Done, but exit status not set!");
	         }
	         else if(exitStatus > 0){
	            // System.out.println("Done, but with error!");
	         }
	         else{
	            // System.out.println("Done!");
	         }

	     }
	     catch(Exception e)
	     {
	         System.err.println("Error: " + e);
	     }
	     logger.info("operation complete");
	   //  return result;
	 }
	 
	}
