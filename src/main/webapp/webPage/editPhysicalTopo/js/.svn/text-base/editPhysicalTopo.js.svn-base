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
	var topoConfigResult = new Object();//当前添加修改的数据；
	var timeStampOfOperate = 0;
	var vnDeleteWhenSeleted = [];
	var showNodeConfig;
	var showLinkConfig;
	var showListInfor;//详细历史配置弹出框；
	var dragId = -1;//记录被拖拽的节点；
	var url = {//服务器部署使用
		getTopoConfigList:"topoConfig.do",
		getVnConfigList:"vnConfig.do",
		getConfig:"config.do",
		getTopo:"topo.do",
		subDelete:"deleteVn.do",
		subDeploy:"deployVn.do",
		subVnList:"saveVn.do",
		subConfig:"saveConfig.do",
		subTopoList:"saveTopoConfig.do"
	}
	var getVnConfigList = {
		type: "POST",
		url: url.getTopoConfigList,
		dataType: "json",
		success: function(topoConfigListData) {
			topoConfigListResult = eval(topoConfigListData);
			topoConfigListResultCopy = topoConfigListResult.slice(0);
			topoPhotoToShow();
			topoResultToShow();
		},
		error: function(err) {
		    alert("error vnlist");
		}
	}
	function fix(num, length) {
		return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
	}
	function DateToUnix(string){
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
	function UnixToDate(unixTime, isFull, timeZone) {//unixTime毫秒，ifFull返回完整时间(Y-m-d 或者 Y-m-d H:i:s)   timeZone   时区 
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
	function submitInfor(submitResult,url,successMessage,errMessage,sucfun,errfun){//提交数据
		var numOfPara = arguments.length
		var submit = {
			type: "POST",
			url: url,
			contentType: "application/json;charset=utf-8",
			data: submitResult,
			dataType: "json",
			success: function(submitData) {
				alert(successMessage);
				if(numOfPara > 4){
					sucfun();
				}
			},
			error: function(err) {
				alert(errMessage);
				if(numOfPara > 5){
					errfun();
				}
			}
		}
		return submit;
	}	
	function drawCanvas(){//绘图之前的准备工作；
		//其他工作
		$("#canvas").attr('width', widthOfCanvas);
		$("#canvas").attr('height', heightOfCanvas);
		topoConfigResult.node = new Array();
		topoConfigResult.link = new Array();
		stage.mouseout(function(){//实现拖拽删除节点功能；
			if(dragId != -1){
				//删除本地result中的数据；
				for(var i = 0; i < topoConfigResult.node.length; i++){
					if(topoConfigResult.node[i].nodeId == dragId){
						topoConfigResult.node.splice(i,1);
						//删除相关链路
						for(var j = 0; j < topoConfigResult.link.length; j++){
							if(topoConfigResult.link[j].source.sourceNode == dragId || topoConfigResult.link[j].destination.destNode == dragId){
								topoConfigResult.link.splice(j,1);
								j--;
							}
						}
						break;
					}
				}
				//移除出画布
				for(var i = 0; i < scene.getDisplayedNodes().length; i++){
					if(scene.getDisplayedNodes()[i].id == dragId){
						scene.remove(scene.getDisplayedNodes()[i]);
						break;
					}
				}
				dragId = -1;
			}
		})
		var beginNode = null;
		var tempNodeA = new JTopo.Node('tempA');
		tempNodeA.setSize(1, 1);		
		var tempNodeZ = new JTopo.Node('tempZ');
		tempNodeZ.setSize(1, 1);		
		var link = new JTopo.Link(tempNodeA, tempNodeZ);
		link.id = "test";
		var isNeedLink = false;
		scene.mouseup(function(e){//连线效果：动态实时显示link，随着鼠标位置变化；
			for(var i = 0; i < scene.getDisplayedElements().length; i++){
				if(scene.getDisplayedElements()[i].id == "test"){
					isNeedLink = true;
					break;
				}
			}
			if(e.button == 2){
				beginNode = null;
				scene.remove(link);
				return;
			}
			if(e.target != null && e.target instanceof JTopo.Node){//如果点击的节点是不是空；
				if(beginNode == null){
					beginNode = e.target;
					scene.add(link);
					tempNodeA.setLocation(e.x, e.y);
					tempNodeZ.setLocation(e.x, e.y);
				}else if(beginNode !== e.target && isNeedLink){
					var endNode = e.target;
					
					showLinkConfig = new Popup(popLinkInfor(beginNode,endNode,"add"));
					showLinkConfig.render();
					showLinkConfig.show();
					
					beginNode = null;
					scene.remove(link);
				}else{
					beginNode = null;
				}
			}else{
				beginNode = null;
				scene.remove(link);
			}
			isNeedLink = false;
		});		
		scene.mousedown(function(e){
			if(e.target == null || e.target === beginNode || e.target === link){
				scene.remove(link);
			}
		});
		scene.mousemove(function(e){
			tempNodeZ.setLocation(e.x, e.y);
		});
	}
	function addNode(nodeId,x,y,type){//添加节点的通用方法
		var node = new JTopo.Node(nodeId);
		node.id = nodeId;
		node.type = type;
		node.setSize(widthOfImage, heightOfImage);
		node.setLocation(x, y);
		node.fontColor = "0,0,0";
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
			default:
		}
		node.mousedrag(function() {
			dragId = nodeId;
		});
		node.mouseup(function() {
		    dragId = -1;
		});
		node.dbclick(function() {
			if(type == "switch"){
				showNodeConfig = new Popup(popNodeInfor(nodeId,0,0,type,"change"));
				showNodeConfig.render();
				showNodeConfig.show();
			}
		});
		scene.add(node);
		return node;		
	}
	function addLink(beginNode,endNode,beginPort,endPort){
		var link = new JTopo.Link(beginNode, endNode);
		link.text =beginPort + "---" + endPort;
		if(beginPort!=undefined ){
			link.beginPort = beginPort.substring(beginNode.id.toString().length + 1);
		}else{
			link.beginPort = null;
		}
		if(endPort!=undefined ){
			link.endPort = endPort.substring(endNode.id.toString().length + 1);
		}else{
			link.endPort = null;
		}
		link.fontColor = "0,0,0";
		link.click(function() {
			if(showLinkConfig != undefined){
				showLinkConfig.close();
			}
			showLinkConfig = new Popup(popLinkInfor(beginNode,endNode,"change",link.beginPort,link.endPort,link));
			showLinkConfig.render();
			showLinkConfig.show();
		}) 
		scene.add(link);
		return link;
	}
	function showTopo(){//根据topoConfigResult绘制topo
		for(var i = 0; i < topoConfigResult.node.length; i++){//遍历添加节点
			switch (topoConfigResult.node[i].switchType){
				case "ofsoftswitch":
				case "ovs":
					addNode(topoConfigResult.node[i].nodeId,topoConfigResult.node[i].xCoordinate * widthOfCanvas,topoConfigResult.node[i].yCoordinate * heightOfCanvas,"switch");				
					break;
				case "router":
					addNode(topoConfigResult.node[i].nodeId,topoConfigResult.node[i].xCoordinate * widthOfCanvas,topoConfigResult.node[i].yCoordinate * heightOfCanvas,"router");				
					break;
				case "host":
					addNode(topoConfigResult.node[i].nodeId,topoConfigResult.node[i].xCoordinate * widthOfCanvas,topoConfigResult.node[i].yCoordinate * heightOfCanvas,"host");				
					break;
				default:
					addNode(topoConfigResult.node[i].nodeId,topoConfigResult.node[i].xCoordinate * widthOfCanvas,topoConfigResult.node[i].yCoordinate * heightOfCanvas,"switch");				
			}		
		}
		for(var i = 0; i < topoConfigResult.link.length; i++){//遍历添加链路
			var startNode = -1;
			var endNode = -1;
			for(var j = 0; j < scene.getDisplayedNodes().length; j++){
				if (topoConfigResult.link[i].source.sourceNode == scene.getDisplayedNodes()[j].id){
					startNode = scene.getDisplayedNodes()[j];
				}
				if (topoConfigResult.link[i].destination.destNode == scene.getDisplayedNodes()[j].id){
					endNode = scene.getDisplayedNodes()[j];
				}
				if(startNode != -1 && endNode != -1){
					addLink(startNode,endNode,topoConfigResult.link[i].source.sourceTp,topoConfigResult.link[i].destination.destTp);
					break;
				}
			}
		}
	}
	function popTopoInfor(time){//展示物理网历史配置的详细信息；
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
				$("#change").click(function() {
					//清理屏幕；
					scene.clear();
					//数据修改；
					for(var i = 0; i < topoConfigListResult.length; i++){
						if(parseInt(topoConfigListResult[i].timeStamp / 1000) == time / 1000){
							topoConfigResult = topoConfigListResult[i];
							break;
						}
					}
					//绘图；
					showTopo();
					//关闭弹窗；
					showListInfor.close();
				});
				$("#delete").click(function() {
					for(var i = 0; i < topoConfigListResult.length; i++){
						if(parseInt(topoConfigListResult[i].timeStamp / 1000) == time / 1000){
							topoConfigListResult.splice(i,1);
							break;
						}
					}
					alert("删除成功，提交后生效");
					topoResultToShow();
					showListInfor.close();					
				});
			}
		};
		for(var i = 0; i < topoConfigListResult.length; i++){//遍历topo list记录信息；
			if(parseInt(topoConfigListResult[i].timeStamp / 1000) == time / 1000){
				operateTimeStamp = topoConfigListResult[i].timeStamp;
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
					inforToShow += "<td rowspan=" + lengthOfNode + ">第"+ (j+1) +"交换机</td><td>交换机id</td><td>"
					+ topoConfigListResult[i].node[j].nodeId +"</td></tr><tr><td>datapathId</td><td>"
					+topoConfigListResult[i].node[j].datapathId+"</td></tr></tr><tr><td>switchIp</td><td>"
					+topoConfigListResult[i].node[j].switchIp+"</td></tr></tr><tr><td>switchType</td><td>"
					+topoConfigListResult[i].node[j].switchType+"</td></tr></tr><tr><td>controllerIp</td><td>"
					+topoConfigListResult[i].node[j].controllerIp+"</td></tr><tr><td rowspan=";
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
				inforToShow += "<tr><td rowspan=" + topoConfigListResult[i].link.length +">链路信息</td><td colspan=3>"
				+topoConfigListResult[i].link[0].source.sourceTp+"<---->"+topoConfigListResult[i].link[0].destination.destTp+"</td></tr>"
				for(var j = 1; j < topoConfigListResult[i].link.length; j++){//拼凑一个link
					inforToShow += "<tr><td colspan=3>"+topoConfigListResult[i].link[j].source.sourceTp+"<---->"
					+topoConfigListResult[i].link[j].destination.destTp+"</td></tr>";
				}
				//添加表单按钮
				inforToShow += "</table><input type='button' value='修改' class='login-submit threeButton' id='change'><input type='button' value='删除' class='login-submit threeButton' id='delete'><input type='button' value='关闭' class='login-submit threeButton' id='cancel'>";
				addNode.content.splice(5,0,inforToShow);
				break;
			}
		}
		addNode.height = $(window).height() - 65;
		addNode.content = addNode.content.join("");
		return addNode;		
	}
	function popLinkInfor(beginNode,endNode,oprateType,beginPortChange,endPortChange,link){//弹出框，填写link相关信息
		var popLink = {
			content: [
				'<div class="popup">',
					'<div class="inner">',
						'<form method="post" class="login loginNode" id="addNodeInfor">', 
							'<h1>请选择链路端口信息</h1>',
							'<input type="button" value="保存链路" class="login-submit loginNode-submit" id="submitLink">',
							'<input type="button" value="取消" class="login-submit loginNode-submit" id="cancelLink">',
						'</form>', 
					'</div>',
				'</div>'],
			height:'575',
			width:'300', 
			clickClose:false,
			open: function() {
				if(oprateType == "change"){//如果是修改链路，则预填写；
					$("input[type=radio][name=beginNode][value="+beginPortChange+"]").attr("checked",true);
					$("input[type=radio][name=endNode][value="+endPortChange+"]").attr("checked",true);
					
				}
				$("#submitLink").click(function() {
					if(oprateType == "change"){//如果是修改 则删除原配置中的selected；
						for(var i = 0; i < topoConfigResult.node.length; i++){
							if(beginNode.id == topoConfigResult.node[i].nodeId){
								for(var j = 0; j < topoConfigResult.node[i].terminationPoint.length; j++){
									if(topoConfigResult.node[i].terminationPoint[j].tpId == beginPortChange){
										topoConfigResult.node[i].terminationPoint[j].selected = false;
									}
								}
							}
						}
						for(var i = 0; i < topoConfigResult.node.length; i++){
							if(endNode.id == topoConfigResult.node[i].nodeId){
								for(var j = 0; j < topoConfigResult.node[i].terminationPoint.length; j++){
									if(topoConfigResult.node[i].terminationPoint[j].tpId == endPortChange){
										topoConfigResult.node[i].terminationPoint[j].selected = false;									
									}
								}
							}
						}
						scene.remove(link);
					}
					//整理配置信息；
					var linkInf = new Object();
					var beginPort = $("input[name='beginNode']:checked").val();
					var endPort = $("input[name='endNode']:checked").val();
					linkInf.linkId = topoConfigResult.link.length + 1;
					linkInf.source = new Object();
					linkInf.source.sourceNode = beginNode.id;
					linkInf.source.sourceTp = beginNode.id + ":" + beginPort;
					linkInf.destination = new Object();
					linkInf.destination.destNode = endNode.id;
					linkInf.destination.destTp = endNode.id + ":" + endPort;

					//修改node的selected字段
					for(var i = 0; i < topoConfigResult.node.length; i++){
						if(beginNode.id == topoConfigResult.node[i].nodeId){
							for(var j = 0; j < topoConfigResult.node[i].terminationPoint.length; j++){
								if(topoConfigResult.node[i].terminationPoint[j].tpId == $("input[name='beginNode']:checked").val()){
									topoConfigResult.node[i].terminationPoint[j].selected = true;
								}
							}
						}
					}
					for(var i = 0; i < topoConfigResult.node.length; i++){
						if(endNode.id == topoConfigResult.node[i].nodeId){
							for(var j = 0; j < topoConfigResult.node[i].terminationPoint.length; j++){
								if(topoConfigResult.node[i].terminationPoint[j].tpId == $("input[name='endNode']:checked").val()){
									topoConfigResult.node[i].terminationPoint[j].selected = true;
								}
							}
						}
					}
					topoConfigResult.link.push(linkInf);				
					//关闭表;
					showLinkConfig.close();
					//添加链路；
					addLink(beginNode,endNode,linkInf.source.sourceTp,linkInf.destination.destTp);
				});
				$("#cancelLink").click(function() {
					showLinkConfig.close();
				});
				$("#deleteLink").click(function() {
					if(oprateType == "change"){//如果是修改 则删除原配置中的selected；
						for(var i = 0; i < topoConfigResult.node.length; i++){
							if(beginNode.id == topoConfigResult.node[i].nodeId){
								for(var j = 0; j < topoConfigResult.node[i].terminationPoint.length; j++){
									if(topoConfigResult.node[i].terminationPoint[j].tpId == beginPortChange){
										topoConfigResult.node[i].terminationPoint[j].selected = false;
									}
								}
							}
						}
						for(var i = 0; i < topoConfigResult.node.length; i++){
							if(endNode.id == topoConfigResult.node[i].nodeId){
								for(var j = 0; j < topoConfigResult.node[i].terminationPoint.length; j++){
									if(topoConfigResult.node[i].terminationPoint[j].tpId == endPortChange){
										topoConfigResult.node[i].terminationPoint[j].selected = false;									
									}
								}
							}
						}
						scene.remove(link);
						showLinkConfig.close();
					}
				})
			}	
		};
		if(oprateType == "change"){
			var deleteLink = '<input type="button" value="删除链路" class="login-submit loginNode-submit" id="deleteLink">';
			popLink.content.splice(5,0,deleteLink);
		}
		//添加头结点节点链路信息；
		var inforToShow = "<div id='beginNode'><label>交换机Id：" + beginNode.id + "</label></br>";
		for(var i = 0; i < topoConfigResult.node.length; i++){
			if(topoConfigResult.node[i].nodeId == beginNode.id){//遍历topoConfigResult，查找节点
				for(var j = 0; j < topoConfigResult.node[i].terminationPoint.length; j++){//遍历节点的端口信息添加;应对change link的修改
					if(topoConfigResult.node[i].terminationPoint[j].selected == false ||oprateType == "change"){//端口未被使用
						inforToShow = inforToShow + topoConfigResult.node[i].terminationPoint[j].tpId + "<input name='beginNode' type='radio' value='" + topoConfigResult.node[i].terminationPoint[j].tpId +"'></input></br>"
					}
				}
				break;
			}
		}
		//添加尾节点链路信息；
		inforToShow = inforToShow + "</div><div id='endNode'><label>交换机Id：" + endNode.id + "</label></br>";
		for(var i = 0; i < topoConfigResult.node.length; i++){
			if(topoConfigResult.node[i].nodeId == endNode.id){//遍历topoConfigResult，查找节点
				for(var j = 0; j < topoConfigResult.node[i].terminationPoint.length; j++){//遍历节点的端口信息添加
					if(topoConfigResult.node[i].terminationPoint[j].selected == false ||oprateType == "change"){//端口未被使用
						inforToShow = inforToShow + topoConfigResult.node[i].terminationPoint[j].tpId + "<input name='endNode' type='radio' value='" + topoConfigResult.node[i].terminationPoint[j].tpId +"'/></label></br>"
					}
				}
				break;
			}
		}
		inforToShow = inforToShow + "</div>"
		popLink.content.splice(4,0,inforToShow);
		popLink.content = popLink.content.join("");
		return popLink;
	}
	function popNodeInfor(nodeId,x,y,nodeType,oprateType){//弹出框，填写节点相关信息；
		var popNode = {
			content: [
				'<div class="popup">',
					'<div class="inner">',
						'<form method="post" class="login loginNode" id="addNodeInfor">', 
							'<h1>请填写节点配置</h1>',
							'<label>',
								'请输入datapathId',
								'<input type="text" id="dpId" class="login-input" placeholder="十六进制数，长度12位"  autofocus>',
							'</label>',
							'<label>',
								'请输入switchIp',
								'<input type="text" id="switchIp" class="login-input" placeholder="点分十进制，例如10.108.106.1">',
							'</label>',
							'<label>',
								'请输入controllerIp',
								'<input type="text" id="controllerIp" class="login-input" placeholder="点分十进制，例如10.108.106.1">',
							'</label>',
							'<label>请选择交换机类型</label></br>',
							'<select id="switchType">',
								'<option id="ofsoftswitch" value="ofsoftswitch">ofsoftswitch</option>',
								'<option id="ovs" value="ovs">ovs</option>',
							'</select></br></br>',
							'<label>请输入需要启动的交换机端口',
								'<textarea id="terminationPoint" placeholder="输入端口名称，以空格间隔"></textarea>',
							'</label></br></br>',
							'<input type="button" value="保存节点" class="login-submit loginNode-submit" id="submitNode">',
							'<input type="button" value="取消" class="login-submit loginNode-submit" id="cancelNode">',
						'</form>', 
					'</div>',
				'</div>'],
			height:'575',
			width:'300', 
			clickClose:false,
			open: function() {
				if(oprateType == "change"){//如果是修改节点，则预填写；
					for(var i = 0; i < topoConfigResult.node.length; i++){
						if(topoConfigResult.node[i].nodeId == nodeId){
							$("#dpId").val(topoConfigResult.node[i].datapathId);
							$("#switchIp").val(topoConfigResult.node[i].switchIp);
							$("#controllerIp").val(topoConfigResult.node[i].controllerIp);
							if(topoConfigResult.node[i].switchType == "ofsoftswitch"){
								$("#ofsoftswitch").selected = true;
								$("#ovs").selected = false;
							}else{
								$("#ofsoftswitch").selected = false;
								$("#ovs").selected = true;
							}
							var textArea = "";
							for(var j = 0; j < topoConfigResult.node[i].terminationPoint.length; j++){
								textArea = textArea + topoConfigResult.node[i].terminationPoint[j].tpId + " "
							}
							$("#terminationPoint").val(textArea);
							break;
						}
					}
				}
				$("#submitNode").click(function() {
					//整理配置信息；
					var nodeInf = new Object();
					nodeInf.nodeId = nodeId;
					nodeInf.datapathId = $("#dpId").val();
					nodeInf.switchIp = $("#switchIp").val();
					nodeInf.controllerIp = $("#controllerIp").val();
					nodeInf.switchType = $("#switchType").val();
					//保存端口信息；
					nodeInf.terminationPoint = new Array();
					var portList = $("#terminationPoint").val().split(" ");
					for(var i = 0; i < portList.length; i++){
						if(portList[i] != ""){
							var tmp = {};
							tmp.tpId = portList[i];
							tmp.selected = false;
							nodeInf.terminationPoint.push(tmp);
						}
					}
					//如果是修改操作，删除原数据；
					for(var i = 0; i < topoConfigResult.node.length; i++){
						if(topoConfigResult.node[i].nodeId == nodeId){
							topoConfigResult.node.splice(i,1);
						}
					}
					//不管是add还是change都向数据表中添加node信息；
					topoConfigResult.node.push(nodeInf);
					//如果是add，则添加节点画布显示，添加nodes数组；
					if(oprateType != "change"){
						addNode(nodeId,x,y,nodeType);
					}
					//关闭表;
					showNodeConfig.close();
				});
				$("#cancelNode").click(function() {
					showNodeConfig.close();
				});
			}
			
		};
		popNode.content = popNode.content.join("");
		return popNode;
	}
	function preAddNode(type){//添加节点前的预处理；
		var nodeId = -1;
		var hasSame = false;
		var nodesOnCanvas = scene.getDisplayedNodes();
		//确定nodeId，要与之前添加的节点id不同；
		for(var i = 1; i < maxNumOfNode+1; i++){
			hasSame = false;
			for(var j = 0; j < nodesOnCanvas.length; j++){
				if(i == nodesOnCanvas[j].id){
					hasSame = true;
					break;
				}
			}
			if(!hasSame){
				nodeId = i;
				break;
			}
		}
		//坐标随机生成
		var x = Math.ceil(widthOfCanvas/4 + Math.random() * (widthOfCanvas/2)); 
		var y = Math.ceil(heightOfCanvas/4 + Math.random() * (heightOfCanvas/2));
		if(nodeId != -1){//正常添加
			if(type == "switch"){
				if(showNodeConfig != undefined){
					showNodeConfig.close();
				}
				showNodeConfig = new Popup(popNodeInfor(nodeId,x,y,type,"add"));
				showNodeConfig.render();
				showNodeConfig.show();
			}
			else{
				addNode(nodeId,x,y,type);
				var nodeInf = {};
				nodeInf.nodeId = nodeId;
				nodeInf.switchType = type;
				nodeInf.terminationPoint = [];
				topoConfigResult.node.push(nodeInf);
			}
		}else{//节点超过数量
			alert("添加失败，节点超上限。");
		} 
	}
	function topoPhotoToShow(){//展示交换机图示列表
		var topoPhoteList = "<tr><th class='titleOfList' colspan = '2'>节点类型对照表</th></tr><tr class='thOfList'><th>节点类型</th><th>示例图标</th></tr><tr id='switch'><td>交换机</td><td><img height='" + heightOfImage + "' width='" + widthOfImage + "' src='images/switch.png'/></td></tr><tr id='router'><td>路由器</td><td><img height='" + heightOfImage + "' width='" + widthOfImage + "' src='images/router.png'/></td></tr><tr id='host'><td>主机</td><td><img height='" + heightOfImage + "' width='" + widthOfImage + "' src='images/host.png'/></td></tr>";
		$("#sideTable").html(topoPhoteList);
		$("#sideTable tr").mouseover(function(){
			$(this).css("backgroundColor","#ffff66");
		})
		$("#sideTable tr").mouseout(function(){
			$(this).css("backgroundColor","#d4e3e5");
		})
		$("#switch").click(function(){
			preAddNode("switch");
		})
		$("#router").click(function(){
			preAddNode("router");
		})
		$("#host").click(function(){
			preAddNode("host");
		})
	}
	function topoResultToShow(){//展示历史配置列表
		//字符串拼接；表头
		var topoConfigList = "<tr><th class='titleOfList' colspan = '3'>物理网历史配置</th></tr>><tr><th>保存时间</th><th>包含节点</th><th>包含链路</th></tr>";
		//大循环，整个list；
		for(var i = 0; i < topoConfigListResult.length; i++){
			//第一栏
			topoConfigList = topoConfigList + "<tr class='canPop'><td>" + UnixToDate(topoConfigListResult[i].timeStamp,true,8) + "</td><td>";
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
			$(this).css("backgroundColor","#ffff66");
		})
		$("#sideTable2 tr").mouseout(function(){
			$(this).css("backgroundColor","#d4e3e5");
		})
		$(".canPop").click(function(){
			if(showListInfor != undefined){
				showListInfor.close();
			}
			showListInfor = new Popup(popTopoInfor(DateToUnix($(this).children().eq(0).text())));
			showListInfor.render();
			showListInfor.show(); 
		})
	}
	$("#recovery").click(function() {
		//清理桌布；
		scene.clear();
		//清理数据；
		topoConfigListResult = topoConfigListResultCopy;
		topoConfigResult = {};
		topoConfigResult.node = new Array();
		topoConfigResult.link = new Array();
		timeStampOfOperate = 0;
		vnDeleteWhenSeleted = [];
		dragId = -1;//记录被拖拽的节点；
		//刷新画面右侧栏；
		topoResultToShow();
	});
	$("#submitPhysicalConfig").click(function() {
		//添加节点位置信息和时间戳信息；
		for(var i = 0; i < topoConfigResult.node.length; i++){
			for(var j = 0; j < scene.getDisplayedElements().length; j++){
				if(topoConfigResult.node[i].nodeId == scene.getDisplayedElements()[j].id && scene.getDisplayedElements()[j].elementType == "node"){
					topoConfigResult.node[i].xCoordinate = scene.getDisplayedElements()[j].x / widthOfCanvas;
					topoConfigResult.node[i].xCoordinate = topoConfigResult.node[i].xCoordinate.toFixed(3)-0;
					topoConfigResult.node[i].yCoordinate = scene.getDisplayedElements()[j].y /heightOfCanvas;
					topoConfigResult.node[i].yCoordinate = topoConfigResult.node[i].yCoordinate.toFixed(3)-0;
				}
			}
		}
		topoConfigResult.timeStamp = (new Date()).valueOf();
		if(topoConfigResult.node.length != 0){
			topoConfigListResult.push(topoConfigResult);
		}
		//提交信息；
		$.ajax(submitInfor($.toJSON(topoConfigListResult),url.subTopoList,"成功提交拓扑配置","提交拓扑配置时遇到问题",topoResultToShow,topoResultToShow));
	});
	drawCanvas();
	$.ajax(getVnConfigList);
});
