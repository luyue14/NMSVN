$(document).ready(function() {
	var canvas = document.getElementById("canvas");
	var stage = new JTopo.Stage(canvas);
	stage.mousedown(function(){isDrag = true;isChangeByUser = true;effect.stop();})
	var scene = new JTopo.Scene(stage);
	var widthOfCanvas = $(document).width()-325 -17;	
	var heightOfCanvas = $(window).height()-25;
	var widthOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*65;
	var heightOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*50;
	$("#canvas").attr('width', widthOfCanvas);
	$("#canvas").attr('height', heightOfCanvas);
	var colorStore = ["0, 0, 0","255, 48, 48","238, 201, 0","173, 255, 47"];
	var configResult;
	var vnConfigListResult;
	var vnConfigListResultCopy;
	var topoResult;
	var vnConfigResult = new Object();
	var clickNodeInConfig = -1;
	var isDrag = false;
	var nodes = [];
	var vnNodes = [];
	var pos = -1;
	var showVnConfig;
	var showNodesConfig;
	var showListInfor;
	var hasVnConfig = false;
	var timeStampOfChangeVn = 0;
	var vnDeleteWhenSeleted = [];
	var effect;
	var isChangeByUser = false;
	var isHaveConfig = false;
	var historyTopoResult = null;
	var oldTimeStamp = -1;
	var url = {//服务器部署使用
		getVnConfigList:"vnConfig.do",
		getConfig:"config.do",
		getTopo:"topo.do",
		subDelete:"deleteVn.do",
		subDeploy:"deployVn.do",
		subVnList:"saveVn.do",
		subConfig:"saveConfig.do"
	}	
	//正则表达式；
	var isNum = /^[0-9]*[1-9][0-9]*$/;
	var ipNomal = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	var ipHasNetNum =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\/([8-9]|1\d|2[0-9]|30)$/;//8-30位网络号CIDR规定；
	function springEffect(tmp){
		return JTopo.Effect.spring({
			minLength: Math.sqrt(widthOfCanvas*heightOfCanvas)/2.5,// 节点之间最短距离
			spring:tmp
		});
	}
	function add2Node(nodeName, nodeInfo, x, y, nodePositionInConfig) {
		var node = new JTopo.Node(nodeName);
		var yStartMove;
		node.id = nodeInfo.nodeId;
		node.setImage("images/switchNew.png", false);
		node.setSize(widthOfImage, heightOfImage);
		node.setLocation(x, y);
		node.fontColor = "0,0,0";
		if(configResult.node[nodePositionInConfig].check){
			node.alarm = "";
			node.alarmColor = "0,255,0";
		}
		node.mousedrag(function() {
			$("#name").val(nodeName);
			isDrag = true;
			if(nodePositionInConfig != -1){//change the datas in configResult(use to record the information of node config);
				configResult.node[nodePositionInConfig].xCoordinate = node.getLocation().x/widthOfCanvas;
				configResult.node[nodePositionInConfig].xCoordinate = configResult.node[nodePositionInConfig].xCoordinate.toFixed(3);
					//alert(configResult.node[nodePositionInConfig].xCoordinate);
				configResult.node[nodePositionInConfig].yCoordinate = node.getLocation().y/heightOfCanvas;
				configResult.node[nodePositionInConfig].yCoordinate = configResult.node[nodePositionInConfig].yCoordinate.toFixed(3);
			}
				//父类拖动对vn的作用效果；
			var yMove = node.getLocation().y - yStartMove;
			for(var i = 0; i < vnNodes.length; i++){
				if(vnNodes[i].id == node.id){
					vnNodes[i].entity.setLocation(node.getLocation().x,vnNodes[i].y + yMove );
				}
			}
		})
		node.click(function() {
			$("#name").val(nodeName);
			clickNodeInConfig = nodePositionInConfig;		
		}) 
		node.dbclick(function() {
				if(vnConfigResult.vnId != null){
					if(node.alarm == null){
						configResult.node[nodePositionInConfig].check = true;
						node.alarm = "";
						node.alarmColor = "0,255,0";
						node.alarmAlpha = 0.1;
						showNodesConfig = new Popup(popNodeInforToAdd(node,nodePositionInConfig));
						showNodesConfig.render();
						showNodesConfig.show();
					}else{
						configResult.node[nodePositionInConfig].check = false;
						node.alarm = null;
						for(var i = 0; i < vnConfigResult.dp.length; i++){
							if(vnConfigResult.dp[i].dpId == node.id){
								vnConfigResult.dp.splice(i,1);
								break;
							}
						}
					}
				}
		}) 
		node.mousedown(function() {
		    isDrag = true;
				
				yStartMove = node.getLocation().y;
		    clearTimeout(refresh);
		    wait();
		}) 
		node.mouseup(function() {
		    isDrag = false;
				for(var i = 0; i < vnNodes.length; i++){
					if(vnNodes[i].id == node.id){
						vnNodes[i].y = vnNodes[i].entity.getLocation().y;
					}
				}
		    clearTimeout(restart);
		    wait();
		}) 
		scene.add(node);
		return node;
    }
	function add3Node(nodeName, nodeInfo, x, y, nodePositionInConfig) {
		var node = new JTopo.Node(nodeName);
		var yStartMove;
		node.id = nodeInfo.nodeId;
		node.setImage("images/switchNew.png", false);
		node.setSize(widthOfImage, heightOfImage);
		node.setLocation(x, y);
		node.fontColor = "0,0,0";
		if(configResult.node[nodePositionInConfig].check){
			node.alarm = "";
			node.alarmColor = "0,255,0";
		}
		node.mousedrag(function() {
			$("#name").val(nodeName);
			isDrag = true;
			if(nodePositionInConfig != -1){//change the datas in configResult(use to record the information of node config);
					configResult.node[nodePositionInConfig].xCoordinate = node.getLocation().x/widthOfCanvas;
					configResult.node[nodePositionInConfig].yCoordinate = node.getLocation().y/heightOfCanvas;
					configResult.node[nodePositionInConfig].xCoordinate = configResult.node[nodePositionInConfig].xCoordinate.toFixed(3);
					configResult.node[nodePositionInConfig].yCoordinate = configResult.node[nodePositionInConfig].yCoordinate.toFixed(3);
			}
				//父类拖动对vn的作用效果；
			var yMove = node.getLocation().y - yStartMove;
			for(var i = 0; i < vnNodes.length; i++){
				if(vnNodes[i].id == node.id){
					vnNodes[i].entity.setLocation(node.getLocation().x,vnNodes[i].y + yMove );
				}
			}
			
		})
		node.click(function() {
			$("#name").val(nodeName);
			clickNodeInConfig = nodePositionInConfig;		
		}) 
		node.dbclick(function() {
			if(vnConfigResult.vnId != null){
				if(node.alarm == null){
					configResult.node[nodePositionInConfig].check = true;
					node.alarm = "";
					node.alarmColor = "0,255,0";
					node.alarmAlpha = 0.1;
					showNodesConfig = new Popup(popNodeInforToAdd(node,nodePositionInConfig));
					showNodesConfig.render();
					showNodesConfig.show();
				}else{
					configResult.node[nodePositionInConfig].check = false;
					node.alarm = null;
					for(var i = 0; i < vnConfigResult.dp.length; i++){
						if(vnConfigResult.dp[i].dpId == node.id){
							vnConfigResult.dp.splice(i,1);
							break;
						}
					}
				}
			}
		}) 
		node.mousedown(function() {
			isDrag = true;
			yStartMove = node.getLocation().y;
			clearTimeout(refresh);
			wait();
		}) 
		node.mouseup(function() {
			isDrag = false;
			for(var i = 0; i < vnNodes.length; i++){
				if(vnNodes[i].id == node.id){
					vnNodes[i].y = vnNodes[i].entity.getLocation().y;
				}
			}
			clearTimeout(restart);
			wait();
		}) 
		scene.add(node);
		return node;
    }
	function addLink(sourceNodeId, destNodeId, linkName, vnNum) {
		var link = new JTopo.Link(sourceNodeId, destNodeId); //连线对象  
		link.lineWidth = 3; //连线大小  
		link.text = linkName; //连线名称  
		link.fontColor = "0,0,0";
		if(vnNum != 0){
			link.strokeColor = colorStore[vnNum]; // 线条颜色随机
		}
		scene.add(link); //场景对象添加连线对象：link. 
		return link;
    }
	function isContains(str, substr) {
		return new RegExp(substr).test(str);
	}
	function start() {
		$.ajax(getTopo);
	}
	function wait() {
		if (isDrag == true) {
			restart = setTimeout(wait, 5000);
		} else {
			refresh = setTimeout(start, 5000);
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
	function submitInfor(submitResult,url,successMessage,errMessage,sucfun,errfun){
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
	function findLink(dpId){
		for(var i = 0; i < topoResult.link.length; i++){
			if(topoResult.link[i].destination.destTp == dpId){
				return "<--->&nbsp&nbsp" + topoResult.link[i].source.sourceTp;
			}
			if(topoResult.link[i].source.sourceTp == dpId){
				return "<--->&nbsp&nbsp" + topoResult.link[i].destination.destTp;
			}
		}
		return "";
	}
	function popVnInforToAdd(timeStamp){
		var numOfParameter = arguments.length;
		var vnConfigResultInList;
		var addVn = {
			content: [
				'<div class="popup">',
					'<div class="inner">',
						'<form method="post" class="login loginVn" id="addVnInfor">', 
							'<h1>填写VN配置信息</h1>',
							'<label>',
								'请输入虚拟网编号vnId',
								'<input type="text" id="vnId" class="login-input" placeholder="正整数，长度1-15位"  autofocus>',
							'</label>',
							'<label>',
								'请输入虚拟网名称vnName',
								'<input type="text" id="vnName" class="login-input" placeholder="任意字符，长度1-15位">',
							'</label>',
							'<label>',
								'请输入控制器Ip地址',
								'<input type="text" id="controllerIp" class="login-input" placeholder="例如10.108.106.1">',
							'</label>',
							'<label>',
								'请输入ipv4源地址',
								'<input type="text" id="ipv4Src" class="login-input" placeholder="例如172.17.17.0/24">',
							'</label>',
							'<label>',
								'请输入ipv4目的地址',
								'<input type="text" id="ipv4Dst" class="login-input" placeholder="例如172.17.17.0/24">',
							'</label>',
							'<input type="button" value="保存当前配置信息" class="login-submit loginVn-submit" id="submitVn">',
							'<input type="button" value="取消" class="login-submit loginVn-submit" id="cancelVn">',
						'</form>', 
					'</div>',
				'</div>'],
			height:'617',
			width:'300', 
			clickClose:false,
			open: function() {
				if(numOfParameter != 0){
					//自动填充vn信息；
					for(var i = 0; i < vnConfigListResult.length; i++){
						if(vnConfigListResult[i].timeStamp == timeStamp){
							vnConfigResultInList = vnConfigListResult[i];
							$("#vnId").val(vnConfigListResult[i].vnId);
							$("#vnName").val(vnConfigListResult[i].vnName);
							$("#controllerIp").val(vnConfigListResult[i].controllerIp);
							$("#ipv4Src").val(vnConfigListResult[i].flowSpace.ipv4Src);
							$("#ipv4Dst").val(vnConfigListResult[i].flowSpace.ipv4Dst);
						}
					}
					for(var i = 0; i < vnConfigResultInList.dp.length; i++){
						//修改node的配置信息；
						for(var j = 0; j < configResult.node.length; j++){
							if(vnConfigResultInList.dp[i].dpId == configResult.node[j].nodeId){
								configResult.node[j].check = true;
							}
						}
						//修改canvas展示信息；
						for(var j = 0; j < nodes.length; j++){
							if(vnConfigResultInList.dp[i].dpId == nodes[j].id){
								nodes[j].entity.alarm = "";
								nodes[j].entity.alarmColor = "0,255,0";
							}
						}
					}
				}
				$("#submitVn").click(function() {
					//验证；
					if(!isNum.test($("#vnId").val()) || $("#vnId").val().length > 15){//id err
						alert("请输入正确的虚拟网编号（vnId）：正整数，长度1-15位");
					}else if($("#vnName").val().length == 0 || $("#vnName").val().length > 15  ){//name err
						alert("请输入正确的虚拟网名称（vnName）：任意字符，长度1-15位");
					}else if(!ipNomal.test($("#controllerIp").val())){//cip err
						alert("请输入正确的控制器Ip地址 ：点分十进制，如10.108.106.1");
					}else if(!ipHasNetNum.test($("#ipv4Src").val())){//sip err
						alert("请输入正确的ipv4源地址 ：点分十进制,其中网络号8-30之间，如172.17.17.0/24");
					}else if(!ipHasNetNum.test($("#ipv4Dst").val())){//dip err
						alert("请输入正确的ipv4目的地址 ：点分十进制,其中网络号8-30之间，如172.17.17.0/24");
					}else{//all right
						hasVnConfig = true;
						vnConfigResult.vnId = $("#vnId").val();
						vnConfigResult.vnName = $("#vnName").val();
						vnConfigResult.controllerIp = $("#controllerIp").val();
						vnConfigResult.flowSpace = new Object();
						vnConfigResult.flowSpace.ipv4Src = $("#ipv4Src").val();
						vnConfigResult.flowSpace.ipv4Dst = $("#ipv4Dst").val();
						vnConfigResult.selected = false;
						
						if(numOfParameter == 0){
							vnConfigResult.dp = new Array();
							timeStampOfChangeVn = 0;
						}else{
							timeStampOfChangeVn = timeStamp;
						}
						showVnConfig.close();
					}
				});
				$("#cancelVn").click(function() {
					showVnConfig.close();
					timeStampOfChangeVn = 0;
					if(numOfParameter != 0){
						//处理历史配置；
						for(var i = 0; i < vnConfigResultInList.dp.length; i++){
							//修改node的配置信息；
							for(var j = 0; j < configResult.node.length; j++){
								if(vnConfigResultInList.dp[i].dpId == configResult.node[j].nodeId){
									configResult.node[j].check = false;
								}
							}
							//修改canvas展示信息；
							for(var j = 0; j < nodes.length; j++){
								if(vnConfigResultInList.dp[i].dpId == nodes[j].id){
									nodes[j].entity.alarm = null;
								}
							}
						}
						vnConfigResultInList = {};
					}
					vnConfigResult = {};
					
					
				});
			}
		}
		addVn.content = addVn.content.join('');
		return addVn;
	}
	function popNodeInforToAdd(node,nodePositionInConfig){
		var addNode = {
			content: [
				'<div class="popup">',
					'<div class="inner">',
						'<form method="post" class="login loginNode" id="addNodeInfor">', 
							'<h1>请选择需要的端口</h1>',
							'<label class="content">',
							'</label>',
							'</br>',
							'<h1>请输入给该节点分配的流表数量</h1>',
							'<input type="text" id="flowtableNumber" class="login-input" placeholder="正整数，长度1-15位">',
							'<input type="button" value="保存当前配置信息" class="login-submit loginNode-submit" id="submitNode">',
							'<input type="button" value="取消" class="login-submit loginNode-submit" id="cancelNode">',
						'</form>', 
					'</div>',
				'</div>'],
			height:'575',
			width:'300', 
			clickClose:false,
			open: function() {
				//设置默认的流表数量
				if(timeStampOfChangeVn != 0){
					out:for(var i = 0; i < vnConfigListResult.length; i++){
						if(vnConfigListResult[i].timeStamp == timeStampOfChangeVn){
							for(var j = 0; j < vnConfigListResult[i].dp.length; j++){
								if(node.id == vnConfigListResult[i].dp[j].dpId){
									$("#flowtableNumber").val(vnConfigListResult[i].dp[j].flowtableNumber);
									break out;							
								}
								
							}
						}	
					}
				}
				$("#submitNode").click(function() {					
					//构建dp信息；
					var nodeInfoForVn = new Object();
					nodeInfoForVn.dpId = node.id;
					nodeInfoForVn.ports = new Array();
					var obj = document.getElementsByName("nodeDp");
					for(var i = 0; i < obj.length; i++){
						if(obj[i].checked)
							nodeInfoForVn.ports.push(obj[i].value);
					}
					nodeInfoForVn.flowtableNumber = $("#flowtableNumber").val();
					//判断是否添加到vnconfig中；
					if(nodeInfoForVn.ports.length == 0){//如果没有选择端口
						alert("请选择需要添加的端口（单选或多选）");
					}else if(!isNum.test($("#flowtableNumber").val()) || $("#flowtableNumber").val().length > 15){//如果没有选择流表数量
						alert("请输入给该交换机分配的流表数量（条）：正整数，长度1-15位");
					}else{//如果全部按要求填写完毕
						vnConfigResult.dp.push(nodeInfoForVn);
						showNodesConfig.close();
						//修改颜色；
						configResult.node[nodePositionInConfig].check = true;
						node.alarm = "";
					}
				});
				$("#cancelNode").click(function() {
					showNodesConfig.close();
					configResult.node[nodePositionInConfig].check = false;
					node.alarm = null;
				});
			}
		};
		//设置默认端口；
		for(var i = 0; i < topoResult.node.length; i++){
			if(topoResult.node[i].nodeId == node.id){
				for(var j = 0; j < topoResult.node[i].terminationPoint.length; j++){
					if(!isContains(topoResult.node[i].terminationPoint[j].tpId,"LOCAL")){
						if(isdpShouldCheck(topoResult.node[i].nodeId,topoResult.node[i].terminationPoint[j].tpId)){
							addNode.content.splice(6,0,"<input type='checkbox' name='nodeDp' checked='checked' class='list' value=" + topoResult.node[i].terminationPoint[j].tpId + ">" + topoResult.node[i].terminationPoint[j].tpId + "</input>&nbsp&nbsp" + findLink(topoResult.node[i].terminationPoint[j].tpId) + "</br>");
						}else{
							addNode.content.splice(6,0,"<input type='checkbox' name='nodeDp' class='list' value=" + topoResult.node[i].terminationPoint[j].tpId + ">" + topoResult.node[i].terminationPoint[j].tpId + "</input>&nbsp&nbsp" + findLink(topoResult.node[i].terminationPoint[j].tpId) + "</br>");
						}
					}
				}
				break;
			}
		}
		
		addNode.content = addNode.content.join("");
		return addNode;
	}
/* 	判断修改状态下某端口是否默认选择； */
	function isdpShouldCheck(dpId,port){
		if(timeStampOfChangeVn == 0){
			return false;
		}else{
			for(var i = 0; i < vnConfigListResult.length; i++){/* 从vn列表中找 */
				if(vnConfigListResult[i].timeStamp == timeStampOfChangeVn){
					for(var j = 0; j < vnConfigListResult[i].dp.length; j++){/* 从vn列表中找节点 */
						if(vnConfigListResult[i].dp[j].dpId == dpId){
							for(var k = 0; k < vnConfigListResult[i].dp[j].ports.length; k++){/* 从vn列表中找端口 */
								if(vnConfigListResult[i].dp[j].ports[k] == port){
									return true;
								}
							}
						}
					}		
				}
			}
			return false;
		}
	}
	function popVnInforToShow(time){//展示list中的详细信息
		var operateTimeStamp;
		var addNode = {
			content: [
				'<div class="popup">',
					'<div class="inner">',
						'<div class="login loginNode" id="addNodeInfor">', 
							'<h1>虚拟网详细信息</h1>',
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
				$("#changeVnInfor").click(function() {
					showListInfor.close();
					//去除页面中的alarm
					for(var i = 0; i < scene.getDisplayedNodes().length; i++){
						if(scene.getDisplayedNodes()[i].alarm == ""){
							scene.getDisplayedNodes()[i].alarm = null;
						}
					}
					for(var i = 0; i < vnConfigListResult.length; i++){
						if(vnConfigListResult[i].timeStamp == operateTimeStamp){
							vnConfigResult.dp = vnConfigListResult[i].dp.slice(0);
							break;
						}
					}
					showVnConfig = new Popup(popVnInforToAdd(operateTimeStamp));
					showVnConfig.render();
					showVnConfig.show();
				});
				$("#deleteVnConfig").click(function() {
					for(var i = 0; i < vnConfigListResult.length; i++){
						if(vnConfigListResult[i].timeStamp == operateTimeStamp){
							//修改现网部署的vn，防止删除操作的影响；
							if(vnConfigListResult[i].selected == true){
								vnDeleteWhenSeleted.push(vnConfigListResult[i].vnId);
							}
							vnConfigListResult.splice(i,1);
							showListInfor.close();
							vnResultToList();
							timeStampOfChangeVn = -1;
							alert("删除成功,提交后生效");
							break;
						}
					}
				});
			}
		};
		for(var i = 0; i < vnConfigListResult.length; i++){//遍历vn记录信息；
			if(parseInt(vnConfigListResult[i].timeStamp / 1000) == time / 1000){
				operateTimeStamp = vnConfigListResult[i].timeStamp;
				var inforToShow = "<table class='tableList popFcolor'><tr><td>虚拟网Id</td><td colspan='3'>" +vnConfigListResult[i].vnId + "</td></tr><tr><td>虚拟网名称</td><td colspan='3'>" + vnConfigListResult[i].vnName + "</td></tr><tr><td>虚拟网控制器Ip</td><td colspan='3'>" + vnConfigListResult[i].controllerIp + "</td></tr><tr><td>Ipv4源地址</td><td colspan='3'>" + vnConfigListResult[i].flowSpace.ipv4Src + "</td></tr><tr><td>Ipv4目的地址</td><td colspan='3'>" + vnConfigListResult[i].flowSpace.ipv4Dst + "</td></tr><tr><td rowspan='" + (vnConfigListResult[i].dp.length + 1) + "'>内部节点配置</td><th>交换机id</th><th>端口号</th><th>流表数量</th></tr>";
				for(var j = 0; j < vnConfigListResult[i].dp.length; j++){//遍历节点信息；
					inforToShow += "<tr><td>" + vnConfigListResult[i].dp[j].dpId +"</td><td>";
					for(var k = 0; k < vnConfigListResult[i].dp[j].ports.length; k++){//端口信息；
						inforToShow += vnConfigListResult[i].dp[j].ports[k] + "</br>";
					}
					inforToShow += "</td><td>" + vnConfigListResult[i].dp[j].flowtableNumber + "</td></tr>";
				}
				inforToShow += "</table><input type='button' value='修改配置' class='login-submit threeButton' id='changeVnInfor'><input type='button' value='删除配置' class='login-submit threeButton' id='deleteVnConfig'><input type='button' value='关闭' class='login-submit threeButton' id='cancel'>";
				addNode.content.splice(5,0,inforToShow);
				break;
			}
		}
		addNode.height = $(window).height() - 65;
		addNode.content = addNode.content.join("");
		return addNode;
	}
	function vnResultToList(){
		var vnConfigList = "<tr><th class='titleOfList'  colspan = '3'>虚拟网历史配置</th></tr>><tr><th>虚拟网编号</th><th>虚拟网名称</th><th>保存时间</th></tr>";
		for(var i = 0; i < vnConfigListResult.length; i++){
			vnConfigList = vnConfigList + "<tr class='canPop'><td>" + vnConfigListResult[i].vnId + "</td><td>" + vnConfigListResult[i].vnName + "</td><td class='date'>" + UnixToDate(vnConfigListResult[i].timeStamp,true,8) + "</td></tr>";
		}
		$("#sideTable").html(vnConfigList);
		$("tr").mouseover(function(){
			$(this).css("backgroundColor","#ffff66");
		})
		$("tr").mouseout(function(){
			$(this).css("backgroundColor","#d4e3e5");
		})
		$(".canPop").click(function(){
			if(showListInfor != undefined){
				showListInfor.close();
			}
			showListInfor = new Popup(popVnInforToShow(DateToUnix($(this).children().eq(2).text())));
			showListInfor.render();
			showListInfor.show();
		})
		return vnConfigList;
	}
	function afterSuccessSubVn(){
		//提交现网部署的虚拟网删除情况；
		for(var i = 0; i < vnDeleteWhenSeleted.length; i++){
			$.ajax(submitInfor(vnDeleteWhenSeleted[i],url.subDelete,"对虚拟网Id为"+vnDeleteWhenSeleted[i]+"的虚拟网的删除操作已应用在现网中","对虚拟网Id为"+vnDeleteWhenSeleted[i]+"的虚拟网的删除操作失败"));
		}
		//提交现网部署的虚拟网修改情况；
		if(timeStampOfChangeVn != 0 && timeStampOfChangeVn != -1){
			for(var i = 0; i < vnConfigListResult.length; i++){
				if(parseInt(vnConfigListResult[i].timeStamp / 1000) == timeStampOfChangeVn / 1000){
					if(vnConfigListResult[i].selected == true && oldTimeStamp != -1){
						$.ajax(submitInfor(oldTimeStamp,url.subDelete,"对虚拟网Id为"+vnConfigListResult[i].vnId+"的虚拟网的更新操作：删除原配置成功","对虚拟网Id为"+vnConfigListResult[i].vnId+"的虚拟网的更新操作：删除原配置失败"));
						$.ajax(submitInfor(vnConfigListResult[i],url.subDeploy,"对虚拟网Id为"+vnConfigListResult[i].vnId+"的虚拟网的更新操作：部署新配置成功","对虚拟网Id为"+vnConfigListResult[i].vnId+"的虚拟网的更新操作：部署新配置失败"));
					}
					break;
				}
			}
		}
		//成功返回后修改备份信息；
		vnConfigListResultCopy = vnConfigListResult.slice(0);
		//成功返回后刷新右侧list；
		vnResultToList()
		//清除配置文件中的记录；
		for(var i = 0; i < configResult.node.length; i++){
			configResult.node[i].check = undefined;
		}
		//清除canvas中的颜色改变；
		for(var i = 0; i < nodes.length; i++){
			nodes[i].entity.alarm = null;
		}
		//清除vn配置标记开关；
		hasVnConfig = false;
		timeStampOfChangeVn = 0; 
		//清除vn配置记录；
		vnConfigResult = {};
		vnDeleteWhenSeleted = [];
	}
	function afterErrorSubVn(){
		vnConfigListResult = vnConfigListResultCopy.slice(0);
		//成功返回后刷新右侧list；
		vnResultToList();
		vnDeleteWhenSeleted = [];
	}
	function afterSuccessGetTopo(){
		if (isDrag == false && $.toJSON(topoResult) != $.toJSON(historyTopoResult)){
				historyTopoResult = topoResult;
                nodes = [];
				vnNodes = [];
                var links = [];
                var linkTags = [];
                scene.clear();
				//节点大小弹性系数的修改
				if(topoResult.node.length < 10){
					widthOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*65*1.1;
					heightOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*50*1.1; 
					effect = springEffect(0.03);
				}else if(topoResult.node.length < 20){
					widthOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*65*1;
					heightOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*50*1; 
					effect = springEffect(0.02);
				}else{
					widthOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*65*0.9;
					heightOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*50*0.9; 
					effect = springEffect(0.003);
				}
				//添加节点的遍历；
				for(var i = 0; i < topoResult.node.length; i++) { 
                    var node = new Object();
                    node.id = topoResult.node[i].nodeId;
                    var nodePositionInConfig = -1;
                    for (var j = 0; j < configResult.node.length; j++) {
                        if (topoResult.node[i].nodeId == configResult.node[j].nodeId) {
                            nodePositionInConfig = j;
                            break;
                        }
                    }
                    var x;
                    var y;
                    if (nodePositionInConfig == -1 || (nodePositionInConfig != -1 && configResult.node[nodePositionInConfig].nodeName == null)) {
                        node.name = topoResult.node[i].nodeId;
                    } else {
                        node.name = configResult.node[nodePositionInConfig].nodeName;
                    }
                    if (nodePositionInConfig == -1 || (nodePositionInConfig != -1 && configResult.node[nodePositionInConfig].xCoordinate == null)) {
                        x = Math.ceil(widthOfCanvas/4 + Math.random() * (widthOfCanvas/2));
						if (nodePositionInConfig != -1) {
							configResult.node[nodePositionInConfig].xCoordinate = x / widthOfCanvas;
							configResult.node[nodePositionInConfig].xCoordinate = configResult.node[nodePositionInConfig].xCoordinate.toFixed(3);
						}
                    } else {
                        x = configResult.node[nodePositionInConfig].xCoordinate * widthOfCanvas;
						isHaveConfig = true;
                    }
                    if (nodePositionInConfig == -1 || (nodePositionInConfig != -1 && configResult.node[nodePositionInConfig].yCoordinate == null)) {
                        y = Math.ceil(heightOfCanvas/4 + Math.random() * (heightOfCanvas/2));
						if (nodePositionInConfig != -1) {
							configResult.node[nodePositionInConfig].yCoordinate = y / heightOfCanvas;
							configResult.node[nodePositionInConfig].yCoordinate = configResult.node[nodePositionInConfig].yCoordinate.toFixed(3);
						}
                    } else {
                        y = configResult.node[nodePositionInConfig].yCoordinate * heightOfCanvas;
						isHaveConfig = true;
                    }
                    if (nodePositionInConfig == -1) {
                        var xx = x / widthOfCanvas;
						var yy = y / heightOfCanvas;
						xx = xx.toFixed(3);
						yy = yy.toFixed(3);
						var newNode = {
                            "nodeId": topoResult.node[i].nodeId,
                            "nodeName": null,
                            "xCoordinate": xx,
                            "yCoordinate": yy,
							"check": false
                        };
                        nodePositionInConfig = configResult.node.length;
                        configResult.node.push(newNode);
			}
                    if (isContains(topoResult.node[i].nodeId, "host")) {
                        node.entity = add3Node(node.name, topoResult.node[i], x, y, nodePositionInConfig);
                    } else {
                        node.entity = add2Node(node.name, topoResult.node[i], x, y, nodePositionInConfig);
					}
                    nodes.push(node);
                }
		//添加链路的遍历；
                for(var i = 0; i < topoResult.link.length; i++) { 
                    var sourceNode;
					var sourceTp;
                    var destNode;
					var destTp;
					var linkName = null;
                    var tag = 0;
                    for (var j = 0; j < linkTags.length; j++) { //判断该链路是否已经存在。
                        if (((linkTags[j].sourceNodeId == topoResult.link[i].source.sourceNode) && (linkTags[j].destNodeId == topoResult.link[i].destination.destNode)) || ((linkTags[j].destNodeId == topoResult.link[i].source.sourceNode) && (linkTags[j].sourceNodeId == topoResult.link[i].destination.destNode))) {
                            tag = 1;
                            continue;
                        }
                    }
                    if (tag == 1) { //根据标示位tag的值判断是否跳出本次循环；
                        continue;
                    }
                    var linkTag = new Object();
                    linkTag.sourceNodeId = topoResult.link[i].source.sourceNode;
                    linkTag.destNodeId = topoResult.link[i].destination.destNode;
                    linkTags.push(linkTag);
                    var tagSource = false;
                    var tagDestination = false;
                    for (var j = 0; j < nodes.length; j++) {
                        if (topoResult.link[i].source.sourceNode == nodes[j].id) {
                            sourceNode = nodes[j].entity;
							sourceTp = topoResult.link[i].source.sourceTp;
                            tagSource = true;
                            break;
                        }
                    }
                    for (var j = 0; j < nodes.length; j++) {
                        if (topoResult.link[i].destination.destNode == nodes[j].id) {
                            destNode = nodes[j].entity;
							destTp = topoResult.link[i].destination.destTp;
                            tagDestination = true;
                            break;
                        }
                    }
					linkName = sourceTp.substring(9) +"-"+destTp.substring(9);
                    if (tagSource && tagDestination) {
                        var link = new Object();
                        link.name = topoResult.link[i].linkId;
                        link.id = addLink(sourceNode, destNode, linkName, 0);
                        links.push(link);
                    }
                }
				
			}
			if(isChangeByUser == false && isHaveConfig == false){
				for(var i = 0; i < nodes.length; i++){
					for(var j = i + 1; j < nodes.length; j++){
						effect.addNode(nodes[i].entity, nodes[j].entity);
					}
				}
				effect.play();	
			}
            wait();
	}
	var getVnConfigList = {
		type: "POST",
		url: url.getVnConfigList,
		dataType: "json",
		success: function(vnConfigListData) {
		    vnConfigListResult = eval(vnConfigListData);
				vnConfigListResultCopy = vnConfigListResult.slice(0);
				vnResultToList();
		    $.ajax(getConfig);
		},
		error: function(err) {
		    alert("error vnlist");
		}
	}
	var getConfig = {
		type: "POST",
		url: url.getConfig,
		dataType: "json",
		success: function(configData) {
		    configResult = eval(configData);
		    $.ajax(getTopo);
		},
		error: function(err) {
		    alert("error");
		}
	}
	var getTopo = { //jQuery的AJAX执行的配置对象
        type: "POST",
        url: url.getTopo,
        dataType: "json",
        success: function(topoData) {
			topoResult = eval(topoData);
			afterSuccessGetTopo();
        },
        error: function(err) {
            alert("error");
        }
    }
    
	$("#name").bind("input propertychange",function() {
		if (clickNodeInConfig != -1) {
			configResult.node[clickNodeInConfig].nodeName = $(this).val();
			for (var i = 0; i < nodes.length; i++) {
				if (nodes[i].entity.id == configResult.node[clickNodeInConfig].nodeId) {
					nodes[i].entity.text = $(this).val();
					break;
				}
			}
		}
	});
	$("#addVn").click(function() {
		if(hasVnConfig){
			alert("请勿重复添加Vn信息，请先提交或者还原后再添加。");
		}else{
			showVnConfig = new Popup(popVnInforToAdd());
			showVnConfig.render();
			showVnConfig.show();
		}
    });
	$("#recovery").click(function() {
		//修改标志位
		oldTimeStamp = -1;
		//恢复数据
		vnConfigListResult = vnConfigListResultCopy.slice(0);
		//清楚修改标记；
		timeStampOfChangeVn = 0;
		//清除vn配置标记开关；
		hasVnConfig = false;
		//清除数据记录；
		vnConfigResult = {};
		//清除配置文件中的记录；
		for(var i = 0; i < configResult.node.length; i++){
			configResult.node[i].check = false;
		}
		//清除canvas中的颜色改变；
		for(var i = 0; i < nodes.length; i++){
			nodes[i].entity.alarm = null;
		}
		//刷新右侧list
		vnResultToList();
	});
	$("#submit").click(function() {
		//修改config信息；
		var maxx = 1; 
		var minx = 0;
		var maxy = 1;
		var miny = 0;
		for(var i = 0; i < configResult.node.length; i++){
			for(var j = 0; j < nodes.length; j++){
				if(configResult.node[i].nodeId == nodes[j].id){
					configResult.node[i].xCoordinate = nodes[j].entity.getLocation().x/widthOfCanvas;
					configResult.node[i].yCoordinate = nodes[j].entity.getLocation().y/heightOfCanvas;
					configResult.node[i].xCoordinate = configResult.node[i].xCoordinate.toFixed(3);
					configResult.node[i].yCoordinate = configResult.node[i].yCoordinate.toFixed(3);
					break;
				}
			}
			if(configResult.node[i].xCoordinate > maxx){
				maxx = configResult.node[i].xCoordinate;
			}
			if(configResult.node[i].xCoordinate < minx){
				minx = configResult.node[i].xCoordinate;
			}
			if(configResult.node[i].yCoordinate > maxy){
				maxy = configResult.node[i].yCoordinate;
			}
			if(configResult.node[i].yCoordinate < miny){
				miny = configResult.node[i].yCoordinate;
			} 
		}
		if(maxx > 1){
			for(var i = 0; i < configResult.node.length; i++){
				configResult.node[i].xCoordinate -= (maxx - 1); 
			}
		}
		if(minx < 0){
			for(var i = 0; i < configResult.node.length; i++){
				configResult.node[i].xCoordinate += (0 - minx); 
			}
		}
		if(maxy > 1){
			for(var i = 0; i < configResult.node.length; i++){
				configResult.node[i].yCoordinate -= (maxy - 1); 
			}
		}
		if(miny < 0){
			for(var i = 0; i < configResult.node.length; i++){
				configResult.node[i].yCoordinate += (0 - miny); 
			}
		}
		//如果提交的是完整的vn记录；
		if((vnConfigResult.vnId != null && vnConfigResult.dp.length != 0)||(timeStampOfChangeVn == -1)){//添加/修改/删除均正常提交；
			//修改数据时间戳；
			vnConfigResult.timeStamp = (new Date()).valueOf();
			//修改list数据；
			if(timeStampOfChangeVn == 0){//添加；
				vnConfigListResult.splice(0,0,vnConfigResult);
			}else if (timeStampOfChangeVn != -1){//修改
				var isCover = confirm("是否覆盖原纪录");
				if(isCover){
					for(var i = 0; i < vnConfigListResult.length; i++){
						if(vnConfigListResult[i].timeStamp == timeStampOfChangeVn){
							oldTimeStamp = timeStampOfChangeVn;
							if(vnConfigListResult[i].selected == true){
								vnConfigResult.selected = true;
							}
							vnConfigListResult.splice(i,1);
							vnConfigListResult.splice(0,0,vnConfigResult);
							//vnResultToList();
							break;
						}
					}
				}else{
					vnConfigListResult.splice(0,0,vnConfigResult);
					//vnResultToList();
				}
			}
			//提交
			$.ajax(submitInfor($.toJSON(vnConfigListResult),url.subVnList,"成功提交vn配置","提交vn配置（vnConfig）时遇到问题",afterSuccessSubVn,afterErrorSubVn));
			$.ajax(submitInfor($.toJSON(configResult),url.subConfig,"成功提交节点位置","提交节点位置（config）时遇到问题"));
			
		}else if(vnConfigResult.vnId != null && vnConfigResult.dp.length == 0){//如果提交的是不完整的vn记录；
			alert("请向vn中添加节点，完成配置后再提交");
		}else{//如果提交的是节点位置信息；
			$.ajax(submitInfor($.toJSON(configResult),url.subConfig,"成功提交节点位置","提交节点位置（config）时遇到问题"));
		}
	});
	$.ajax(getVnConfigList);
});



