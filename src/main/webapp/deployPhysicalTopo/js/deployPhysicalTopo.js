$(document).ready(function() {
	var canvas = document.getElementById("canvas");
	var stage = new JTopo.Stage(canvas);
	var scene = new JTopo.Scene(stage);
	var widthOfCanvas = $(document).width()-325 -17;	
	var heightOfCanvas = $(window).height()-25;
	var widthOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*65;
	var heightOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*50;
	var maxNumOfNode = 30;
	var topoConfigListResult;//历史配置数据；
	var topoConfigListResultCopy;//原式配置副本；
	var timeStampOfOperate = 0;//记录被启动的配置的时间戳；
	var vnDeleteWhenSeleted = [];
	var showNodeConfig;
	var showLinkConfig;
	var dragId = -1;//记录被拖拽的节点；
	var showListInfor;//记录物理拓扑详细信息弹出框状态；
	var topoResult = new Object();//用于存储从服务器端请求到的当前topo情况；
	topoResult.node = [];
	var topoState;//用于存储当前部署状态；
	var topoStateNext;//用于获取当前部署状态；
	var clickList = false;
	var t; //用于开始和停止请求topo的循环；
	var url = {//服务器部署使用
		getTopoConfigList:"topoConfig.do",
		getState:"topoState.do",
		getVnConfigList:"vnConfig.do",
		getConfig:"config.do",
		getTopo:"topo.do",
		subDelete:"deleteVn.do",
		subDeploy:"deployVn.do",
		subVnList:"saveVn.do",
		subConfig:"saveConfig.do",
		subTopoList:"saveTopoConfig.do",
		subDeployTopo:"deployTopoConfig.do",
		subDeleteTopo:"deleteTopoConfig.do",
		hasTopo:"hasTopo.do"
	}
	function getTopoConfig(){//请求topoConfig数据
		var get = {
			type: "POST",
			url: url.getTopoConfigList,
			dataType: "json",
			success: function(suc) {
				topoConfigListResult = eval(suc);
				topoConfigListResultCopy = topoConfigListResult.slice(0);
				getState(); 
			},
			error: function() {
				alert("获取topoConfigList时遇到问题");
			}
		}
		$.ajax(get);
	}
	function getState(){//请求当前启动状态的数据;主要是获取当前部署的ts信息；
		var get = {
			type: "POST",
			url: url.getState,
			contentType: "application/json;charset=utf-8",
			dataType: "json",
			success: function(suc) {
				topoState = eval(suc);
				//右侧栏的显示与状态修改
				topoResultToShow();
				if(topoState.timeStamp == 0){//说明没有启动任何物理网交换机，没有任何方案被启动；
				}else{
					if(!clickList){//如果没有点击其他交换机方案
						//根据topolist和getstate中的ts显示红色未启动的topo
						showTopo(topoState.timeStamp);
						for(var i = 0; i < topoConfigListResult.length; i++){
							if(topoConfigListResult[i].timeStamp == topoState.timeStamp){
								$("#ts"+topoConfigListResult[i].timeStamp+"").css("backgroundColor","#00ff00");  
								break;//因为同时只能有一个启动；
							}
						}
						//请求启动情况，修改启动后交换机颜色
						getTopoForDeploy();
					}
				}
			},
			error: function() {
				alert("获取当前启动状态时遇到问题");
			}
		}
		$.ajax(get);
	}
	function getTopoForDeploy(){//请求数据库中的Topo数据，自带循环；
		var get = {
			type: "POST",
			url: url.getTopo,
			contentType: "application/json;charset=utf-8",
			dataType: "json",
			success: function(suc) {
				//数据处理
				topoResult = eval(suc);
				var getTopoAgain = false;//判断是否需要再次请求的标志；
				for(var i = 0; i < scene.getDisplayedNodes().length; i++){
					if(scene.getDisplayedNodes()[i].type != "host" && scene.getDisplayedNodes()[i].type != "router"){
						for(var j = 0; j < topoResult.node.length; j++){
							if(topoResult.node[j].nodeId == "openflow:" + parseInt(scene.getDisplayedNodes()[i].dpId,16)){
								scene.getDisplayedNodes()[i].setImage("images/green.png", false);
								scene.getDisplayedNodes()[i].alarm = null;
								break;
							} 
						}
					}
				}
				for(var i = 0; i < topoState.nodes.length; i++){//要求启动的节点
					var isStart = false;
					for(var j =0; j < topoResult.node.length; j++){//已启动的节点
						for(var k = 0; k < topoConfigListResult.length; k++){//查找id与dpid的对应
							if(topoState.timeStamp == topoConfigListResult[k].timeStamp){
								for(var s = 0; s < topoConfigListResult[k].node.length; s++){
									if(topoConfigListResult[k].node[s].nodeId == topoState.nodes[i]){
										if("openflow:"+parseInt(topoConfigListResult[k].node[s].datapathId,16) == topoResult.node[j].nodeId){
											isStart = true;
										}
									}
								}
							}
						}
					}
					if(!isStart){
						getTopoAgain = true;
						break;
					}
				}
				if(getTopoAgain){
					getTopoAgain = false;
					t = setTimeout(getTopoForDeploy,2000);
				}else{
					clearTimeout(t);
				}
			},
			error: function() {
				alert("获取真实topo时遇到问题");
			}
		}
		$.ajax(get);
	}
	function getStateForDeploy(operateTimeStamp){//请求当前启动状态的数据;主要是获取当前部署的ts信息；
		var get = {
			type: "POST",
			url: url.getState,
			contentType: "application/json;charset=utf-8",
			dataType: "json",
			success: function(suc) {
				topoStateNext = eval(suc);
				if(topoStateNext.timeStamp == 0 ||topoStateNext.timeStamp == operateTimeStamp){//说明没有启动任何物理网交换机，没有任何方案被启动,或者当前物理网方案被启动了部分或者全部；
					//向后台发送启动物理网命令；
					var tmp = new Object();
					tmp.timeStamp = operateTimeStamp;
					tmp.nodes = new Array();
					for(var i = 0; i < topoConfigListResult.length; i++){//遍历topo list记录信息；
						if(topoConfigListResult[i].timeStamp  == operateTimeStamp){
							for(var j = 0; j < topoConfigListResult[i].node.length; j++){//拼凑一个node
								if(topoConfigListResult[i].node[j].switchType == "ovs" || topoConfigListResult[i].node[j].switchType == "ofsoftswitch"){//过滤掉不需要启动的节点；
									tmp.nodes.push(topoConfigListResult[i].node[j].nodeId);
								}
							}
							break;
						}
					}
					submitDeploy(tmp);
				}else{
					alert("已经有其他物理网启动，请先关闭，被启动的方案保存时间是：" + unixToDate(topoStateNext.timeStamp,true,8));
				}
			},
			error: function() {
				alert("为判断是否可以启动获取当前启动状态时遇到问题");
			}
		}
		$.ajax(get);
	}
	function getStateForDelete(operateTimeStamp){//请求当前启动状态的数据;主要是获取当前部署的ts信息；判断是否关闭；
		var get = {
			type: "POST",
			url: url.getState,
			contentType: "application/json;charset=utf-8",
			dataType: "json",
			success: function(suc) {
				topoStateNext = eval(suc);
				if(topoStateNext.timeStamp == operateTimeStamp){
					//向后台发送关闭物理网命令；
					var tmp = new Object();
					tmp.timeStamp = operateTimeStamp;
					tmp.nodes = new Array();
					for(var i = 0; i < topoConfigListResult.length; i++){//遍历topo list记录信息；
						if(topoConfigListResult[i].timeStamp  == operateTimeStamp){
							for(var j = 0; j < topoConfigListResult[i].node.length; j++){//拼凑一个node
								if(topoConfigListResult[i].node[j].switchType == "ovs" || topoConfigListResult[i].node[j].switchType == "ofsoftswitch"){//过滤掉不需要启动的节点；
									tmp.nodes.push(topoConfigListResult[i].node[j].nodeId);
								}
							}
						}
					}
					submitDelete(tmp);
				}else if(topoStateNext.timeStamp == 0){//说明没有启动任何物理网交换机，没有任何方案被启动；
					alert("物理网还未启动，无法关闭");
				}else{
					alert("该物理网未被启动，被启动的方案是：" + unixToDate(topoStateNext.timeStamp,true,8));
				}
			},
            error: function() {
                alert("为判断是否可以关闭时，获取当前启动状态遇到问题");
			}
        }
		$.ajax(get);
	}
	function submitDeploy(data){
		var submit = {
			type: "POST",
			url: url.subDeployTopo,
			data: $.toJSON(data),
			contentType: "application/json;charset=utf-8",
			dataType: "json",
			success: function(suc) {
				//请求真实topo数据；
				alert("启动物理网交换机成功");
				clickList = false;
				getState();
			},
			error: function() {
				alert("启动物理交换机遇到问题");
			}
		}
		$.ajax(submit);
	}
	function submitDelete(data){
		var submit = {
			type: "POST",
			url: url.subDeleteTopo,
			data: $.toJSON(data),
			contentType: "application/json;charset=utf-8",
			dataType: "json",
			success: function(suc) {
				alert("关闭物理网交换机成功");
				getState();
			},
			error: function() {
				alert("关闭物理网时遇到问题");
			}
		}
		$.ajax(submit);
	}
	function addNode(nodeId,dpId,x,y,type,time){//添加节点
		var node = new JTopo.Node(nodeId);
		node.id = nodeId;
		node.dpId = dpId;
		node.type = type;
		node.setSize(widthOfImage, heightOfImage);
		node.setLocation(x, y);
		node.fontColor = "0,0,0";
		node.time = time;
		switch(type){
			case "switch":
				node.setImage("images/switch.png", false);
				break;
			case "router":
				node.setImage("images/router.png", false);
				break;
			case "host":
				node.setImage("images/host.png", false);
				break;
			case "green":
				node.setImage("images/green.png", false);
				break;
			case "red":
				node.setImage("images/red.png", false);
				node.alarm = "未启动";
				break;
			default:
		}
		node.dbclick(function() {
			if(node.alarm == "未启动"){//启动
				if(topoState.timeStamp == 0 || topoState.timeStamp == node.time){//未启动交换机或者启动了当前物理网的交换机；
					//拼凑需要提交的数据；
					var tmp = new Object();
					tmp.timeStamp = node.time;
					tmp.nodes = [node.id];
					submitDeploy(tmp);
				}
			}else if (node.alarm == null && (type == "red")){
				//拼凑需要提交的数据；
				var tmp = new Object();
				tmp.timeStamp = node.time;
				tmp.nodes = [node.id];
				showTopo(node.time);
				submitDelete(tmp);
			}	
		}) 
		scene.add(node);
        return node;		
	}
	function addLink(beginNode, endNode){//添加链路
		var link = new JTopo.Link(beginNode, endNode);
		scene.add(link);
		return link;
	}
	function fix(num, length) {//这三个函数用于显示时间与ts的转换；
		return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
	}
	function dateToUnix(string){
		var f = string.split(' ', 2);
		var d = (f[0] ? f[0] : '').split('-', 3);
		var t = (f[1] ? f[1] : '').split(':', 3);
		return (new Date(
			parseInt(d[0], 10) || null,
			(parseInt(d[1], 10) || 1) - 1,
			parseInt(d[2], 10) || null,
			parseInt(t[0], 10) || null,
			parseInt(t[1], 10) || null,
			parseInt(t[2], 10) || null
		)).getTime();
	}
	function unixToDate(unixTime, isFull, timeZone) {//unixTime毫秒，ifFull返回完整时间(Y-m-d 或者 Y-m-d H:i:s)   timeZone   时区 
		if (typeof (timeZone) == 'number'){
			unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60 * 1000;
		}
		var time = new Date(unixTime);
		var ymdhis = "";
		ymdhis += fix(time.getUTCFullYear(),4) + "-";
		ymdhis += fix((time.getUTCMonth()+1),2) + "-";
		ymdhis += fix(time.getUTCDate(),2);
		if (isFull === true){
			ymdhis += " " + fix(time.getUTCHours(),2) + ":";
			ymdhis += fix(time.getUTCMinutes(),2) + ":";
			ymdhis += fix(time.getUTCSeconds(),2);
		}
		return ymdhis;
	} 
	function showTopo(fullTime){//绘制topo
		scene.clear();
		for(var i = 0; i < topoConfigListResult.length; i++){
			if(topoConfigListResult[i].timeStamp == fullTime){
				//节点大小弹性系数的修改
				if(topoConfigListResult[i].node.length < 10){
					widthOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*65*1.1;
					heightOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*50*1.1; 
				}else if(topoConfigListResult[i].node.length < 20){
					widthOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*65*1;
					heightOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*50*1; 
				}else{
					widthOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*65*0.9;
					heightOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*50*0.9; 
				}
				for(var j = 0; j < topoConfigListResult[i].node.length; j++){//遍历添加节点
					switch (topoConfigListResult[i].node[j].switchType){
						case "router":
							addNode(topoConfigListResult[i].node[j].nodeId,parseInt(topoConfigListResult[i].node[j].datapathId),topoConfigListResult[i].node[j].xCoordinate * widthOfCanvas,topoConfigListResult[i].node[j].yCoordinate * heightOfCanvas,"router",topoConfigListResult[i].timeStamp);				
							break;
						case "host":
							addNode(topoConfigListResult[i].node[j].nodeId,parseInt(topoConfigListResult[i].node[j].datapathId),topoConfigListResult[i].node[j].xCoordinate * widthOfCanvas,topoConfigListResult[i].node[j].yCoordinate * heightOfCanvas,"host",topoConfigListResult[i].timeStamp);				
							break;
						default:
							addNode(topoConfigListResult[i].node[j].nodeId,parseInt(topoConfigListResult[i].node[j].datapathId),topoConfigListResult[i].node[j].xCoordinate * widthOfCanvas,topoConfigListResult[i].node[j].yCoordinate * heightOfCanvas,"red",topoConfigListResult[i].timeStamp);				
					}		
				}
				for(var j = 0; j < topoConfigListResult[i].link.length; j++){//遍历添加链路
					var startNode = -1;
					var endNode = -1;
					for(var k = 0; k < scene.getDisplayedNodes().length; k++){
						if (topoConfigListResult[i].link[j].source.sourceNode == scene.getDisplayedNodes()[k].id){
							startNode = scene.getDisplayedNodes()[k];
						}
						if (topoConfigListResult[i].link[j].destination.destNode == scene.getDisplayedNodes()[k].id){
							endNode = scene.getDisplayedNodes()[k];
						}
						if(startNode != -1 && endNode != -1){
							addLink(startNode,endNode);
							break;
						}
					}
				}
				break;
			}
		}
	}
	function popTopoInfor(time){//具体的物理网配置信息
		var operateTimeStamp;//记录真实时间戳；传入的时间戳低三位是000；
		var addNode = {
			content: [
				'<div class="popup">',
					'<div class="inner">',
						'<div class="login loginNode" id="addNodeInfor">', 
							'<h1>物理网详细信息</h1>',
							'<div class="content">',
							'</div>',
							'</br>',
						'</div>', 
					'</div>',
				'</div>'],
			height:'700',
			width:'400', 
			clickClose:false,
			open:function(){
				$("#cancel").click(function() {
					showListInfor.close();
				});
				$("#check").click(function() {
					//修改显示；避免单击双击不一致的问题；
					clearTimeout(t);
					scene.clear();
					showTopo(operateTimeStamp);
					//判断当前启动状态，如果允许则启动交换机；
					getStateForDeploy(operateTimeStamp);
					//关闭
					showListInfor.close();
				});
				$("#unCheck").click(function() {
					//修改显示；避免单击双击不一致的问题；
					clearTimeout(t);
					scene.clear();
					showTopo(operateTimeStamp);
					//判断当前启动状态，如果允许则启动交换机；
					getStateForDelete(operateTimeStamp);
					//关闭
					showListInfor.close();				
				});
			}
		};
		for(var i = 0; i < topoConfigListResult.length; i++){//遍历topo list记录信息；
			if(parseInt(topoConfigListResult[i].timeStamp / 1000) == time / 1000){
				operateTimeStamp = topoConfigListResult[i].timeStamp;
				timeStampOfOperate = topoConfigListResult[i].timeStamp;
				//计算表格node总共有几行；
				var totalNodeRowspan = 0;
				for(var j = 0; j < topoConfigListResult[i].node.length; j++){
					if(topoConfigListResult[i].node[j].switchType == "ovs" || topoConfigListResult[i].node[j].switchType == "ofsoftswitch"){
						totalNodeRowspan += 5 + topoConfigListResult[i].node[j].terminationPoint.length;
					}else{
						totalNodeRowspan += 6;
					}
				}
				//拼凑node表格；
				var inforToShow = "<table class='tableList popFcolor'><tr><td rowspan=" + totalNodeRowspan + ">交换机信息</td>";
				for(var j = 0; j < topoConfigListResult[i].node.length; j++){//拼凑一个node
					if(topoConfigListResult[i].node[j].terminationPoint.length == 0){
						var lengthOfNode = 6;
					}else{
						lengthOfNode = topoConfigListResult[i].node[j].terminationPoint.length + 5;
					}
					inforToShow += "<td rowspan=" + lengthOfNode + ">第"+ (j+1) 
						+"交换机</td><td>交换机id</td><td>"+ topoConfigListResult[i].node[j].nodeId 
						+"</td></tr><tr><td>datapathId</td><td>"+topoConfigListResult[i].node[j].datapathId
						+"</td></tr></tr><tr><td>switchIp</td><td>"+topoConfigListResult[i].node[j].switchIp
						+"</td></tr></tr><tr><td>switchType</td><td>"+topoConfigListResult[i].node[j].switchType
						+"</td></tr></tr><tr><td>controllerIp</td><td>"+topoConfigListResult[i].node[j].controllerIp
						+"</td></tr><tr><td rowspan=";
					if(topoConfigListResult[i].node[j].terminationPoint.length == 0){
						inforToShow += "1>包含的端口</td><td>";
					}else{
						inforToShow += topoConfigListResult[i].node[j].terminationPoint.length +">包含的端口</td><td>";
					}
					if(topoConfigListResult[i].node[j].terminationPoint.length == 0){
						inforToShow += "undefined</td></tr>";
					}else{
						inforToShow += topoConfigListResult[i].node[j].terminationPoint[0].tpId+"</td></tr>";
					}
					//拼凑端口信息
					for(var k = 1; k < topoConfigListResult[i].node[j].terminationPoint.length; k++){
						inforToShow += "<tr><td>"+topoConfigListResult[i].node[j].terminationPoint[k].tpId+"</td></tr>";
					}
				}
				//拼凑link表格
				inforToShow += "<tr><td rowspan=";
				if(topoConfigListResult[i].link.length == 0){
					inforToShow += "1>链路信息</td><td colspan=3></td></tr>";
				}else{
					inforToShow +=topoConfigListResult[i].link.length +">链路信息</td><td colspan=3>"+topoConfigListResult[i].link[0].source.sourceTp+"<---->"+topoConfigListResult[i].link[0].destination.destTp+"</td></tr>";
				}
				for(var j = 1; j < topoConfigListResult[i].link.length; j++){//拼凑一个link
					inforToShow += "<tr><td colspan=3>"+topoConfigListResult[i].link[j].source.sourceTp+"<---->"+topoConfigListResult[i].link[j].destination.destTp+"</td></tr>";
				}
				//添加表单按钮
				inforToShow += "</table><input type='button' value='启动' class='login-submit threeButton' id='check'><input type='button' value='取消启动' class='login-submit threeButton' id='unCheck'><input type='button' value='关闭' class='login-submit threeButton' id='cancel'>";
				addNode.content.splice(5,0,inforToShow);
				break;
			}
		}
		addNode.height = $(window).height() - 65;
		addNode.content = addNode.content.join("");
		return addNode;		
	}
	function topoResultToShow(){//展示历史配置列表
		//用于区分单双击事件；
		var timer = null;
		//字符串拼接；表头
		var topoConfigList = "<tr><th class='titleOfList' colspan = '3'>物理网历史配置</th></tr>><tr><th>保存时间</th><th>包含节点</th><th>包含链路</th></tr>";
		//大循环，整个list；
		for(var i = 0; i < topoConfigListResult.length; i++){
			//第一栏
			topoConfigList = topoConfigList + "<tr class='canPop' id='ts"+topoConfigListResult[i].timeStamp+"'><td>" + unixToDate(topoConfigListResult[i].timeStamp,true,8) + "</td><td>";
			//第二栏，展示节点；
			for(var j = 0; j < topoConfigListResult[i].node.length; j++){
				topoConfigList = topoConfigList + topoConfigListResult[i].node[j].nodeId + "</br>";
			}
			topoConfigList = topoConfigList + "</td><td>";
			//第三栏，展示链路；
			for(var j = 0; j < topoConfigListResult[i].link.length; j++){
				topoConfigList = topoConfigList + topoConfigListResult[i].link[j].destination.destTp +"-" + topoConfigListResult[i].link[j].source.sourceTp + "</br>";
			}
			topoConfigList = topoConfigList + "</td></tr>";
		}
		$("#sideTable2").html(topoConfigList);
		$("#sideTable2 tr").mouseover(function(){
			if(parseInt(topoState.timeStamp / 1000) != dateToUnix($(this).children().eq(0).text()) / 1000){
				$(this).css("backgroundColor","#ffff66");
			}
		})
		$("#sideTable2 tr").mouseout(function(){
			if(parseInt(topoState.timeStamp / 1000) != dateToUnix($(this).children().eq(0).text()) / 1000){
				$(this).css("backgroundColor","#d4e3e5");
			}
		})
		$(".canPop").bind("click", function() { //单击事件 
			for(var i = 0; i < topoConfigListResult.length; i++){//获取完整时间戳；
				if(parseInt(topoConfigListResult[i].timeStamp / 1000) == dateToUnix($(this).children().eq(0).text()) / 1000){
					var timeStamp = topoConfigListResult[i].timeStamp;
					break;
				}
			}
			clearTimeout(timer);
			timer = setTimeout(function(){ //在单击事件中添加一个setTimeout()函数，设置单击事件触发的时间间隔 
				clearTimeout(t);
				scene.clear();
				clickList = true;
				showTopo(timeStamp);
				if(timeStamp == topoState.timeStamp){//如果点击的是已经启动的物理网
					getTopoForDeploy();
				}
			}, 300);
		})
		$(".canPop").bind("dblclick", function() { //双击事件 
			clearTimeout(timer); //在双击事件中，先清除前面click事件的时间处理 
			if(showListInfor != undefined){
				showListInfor.close();
			}
			showListInfor = new Popup(popTopoInfor(dateToUnix($(this).children().eq(0).text())));
			showListInfor.render();
			showListInfor.show();
		}) 
	}
	$("#canvas").attr('width', widthOfCanvas);
	$("#canvas").attr('height', heightOfCanvas);
	getTopoConfig();
});



