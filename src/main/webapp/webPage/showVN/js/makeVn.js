$(document).ready(function() {
	var canvas = document.getElementById("canvas");
	var stage = new JTopo.Stage(canvas);
	var scene = new JTopo.Scene(stage);
	var widthOfCanvas = $(document).width()-325 -17;	
	var heightOfCanvas = $(window).height()-25;
	var widthOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*65;
	var heightOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*50;
	$("#canvas").attr('width', widthOfCanvas);
	$("#canvas").attr('height', heightOfCanvas);
	var colorStore = ["0, 0, 0","255, 48, 48","238, 201, 0","173, 255, 47"];
	var vnResult;
	var configResult;
	var topoResult;
	var configBack;
	var clickNodeInConfig = -1;
	var isDrag = false;
	var nodes = [];
	var vnNodes = [];
	var colorOfVn = ["green.png","orange.png","pink.png","red.png","yellow.png"];
	var idOfVn = [];
	var vnConfigListResult;
	var showListInfor;
	var selectedVnIdList = [];
	var refresh;
	var restart;
	var url = {//服务器部署使用
		getVnConfigList:"vnConfig.do",
		getConfig:"config.do",
		getVn:"link.do",
		getTopo:"topo.do",
		subDelete:"deleteVn.do",
		subDeploy:"deployVn.do",
		subVnList:"saveVn.do",
		subConfig:"saveConfig.do"
	}	
	function add2Node(nodeName, nodeInfo, x, y, nodePositionInConfig) {
        var node = new JTopo.Node(nodeName);
		var yStartMove;
        node.id = nodeInfo.nodeId;
        node.setImage("images/switchNew.png", false);
        node.setSize(widthOfImage, heightOfImage);
        node.setLocation(x, y);
        node.fontColor = "0,0,0";
        node.mousedrag(function() {
            $("#name").val(nodeName);
            $("#x_coordinate").val(node.getLocation().x);
            $("#y_coordinate").val(node.getLocation().y);
            $("#mac").val("null");
            $("#ip").val("null");
            isDrag = true;
            configResult.node[nodePositionInConfig].xCoordinate = node.getLocation().x / widthOfCanvas;
            configResult.node[nodePositionInConfig].yCoordinate = node.getLocation().y / heightOfCanvas;
			configResult.node[nodePositionInConfig].xCoordinate = configResult.node[nodePositionInConfig].xCoordinate.toFixed(3);
			configResult.node[nodePositionInConfig].yCoordinate = configResult.node[nodePositionInConfig].yCoordinate.toFixed(3);
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
            $("#x_coordinate").val(node.getLocation().x);
            $("#y_coordinate").val(node.getLocation().y);
            $("#mac").val("null");
            $("#ip").val("null");
            clickNodeInConfig = nodePositionInConfig;
        }) 
		node.dbclick(function() {
			window.open("flowtable.html?vn=not&id="+node.id);
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
	function addVnNode(nodeName, nodeId, x, y, vnid, color) {
        var node = new JTopo.Node();
        node.id = nodeId;
        node.setImage("images/"+color, false);
        node.setSize(widthOfImage, heightOfImage);
        node.setLocation(x, y);
	node.dragable = "false";
	/* node.dbclick(function() {
		var newpage = window.open("flowtable.html?vn="+vnid+"&id="+node.id);
        })  */
	scene.add(node);
        return node;
    }
	function add3Node(nodeName, nodeInfo, x, y, nodePositionInConfig) {
		var node = new JTopo.Node(nodeName);
		var yStartMove;
        node.id = nodeInfo.nodeId;
        node.setImage("images/host.png", false);
        node.setSize(widthOfImage, heightOfImage);
        node.setLocation(x, y);
        node.fontColor = "0,0,0";
        node.mousedrag(function() {
            $("#name").val(nodeName);
            $("#x_coordinate").val(node.getLocation().x);
            $("#y_coordinate").val(node.getLocation().y);
            $("#mac").val("null");
            $("#ip").val("null");
            isDrag = true;
            configResult.node[nodePositionInConfig].xCoordinate = node.getLocation().x / widthOfCanvas;
            configResult.node[nodePositionInConfig].yCoordinate = node.getLocation().y / heightOfCanvas;
			configResult.node[nodePositionInConfig].xCoordinate = configResult.node[nodePositionInConfig].xCoordinate.toFixed(3);
			configResult.node[nodePositionInConfig].yCoordinate = configResult.node[nodePositionInConfig].yCoordinate.toFixed(3);
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
            $("#x_coordinate").val(node.getLocation().x);
            $("#y_coordinate").val(node.getLocation().y);
            $("#mac").val("null");
            $("#ip").val("null");
            clickNodeInConfig = nodePositionInConfig;
        }) 
		node.dbclick(function() {
			window.open("flowtable.html?vn=not&id="+node.id);
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
	function addLink(sourceNodeId, destNodeId, vnNum) {
		var link = new JTopo.Link(sourceNodeId, destNodeId); //连线对象  
		link.lineWidth = 3; //连线大小  
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
            restart = setTimeout(wait, 10000);
        } else {
            refresh = setTimeout(start, 10000);
        }
    }
	function submitInfor(data,url,successAfter,errorAfter,time) {
        var submit = {
            type: "POST",
            url: url,
            contentType: "application/json;charset=utf-8",
            data: data,
            dataType: "json",
            success: function(suc) {
				successAfter(time);
            },
            error: function(err) {
				errorAfter(time);
            }
        }
        return submit;
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
	function UnixToDate(unixTime, isFull, timeZone) {//unixTime毫秒，ifFull返回完整时间(Y-m-d 或者 Y-m-d H:i:s)timeZone时区 
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
	function successAfterDeployVn(time){//部署成功后修改list/右侧栏/canvas
		alert ("成功部署该VN配置");
		//修改vnlist中的记录；
		changeSelected(time,"true");
		//修改右侧的背景展示效果；
		vnResultToList();
		//写入数组标记，防止同一id启动；
		selectedVnIdList.push(findVnIdByTime(time));
		//前端添加该虚拟网的展示；后端修改selected属性
		$.ajax(getVn);
	}
	function errorAfterDeployVn(time){
		alert ("部署该VN配置失败");
	}
	function successAfterDeletedVn(time){//成功取消部署后修改list/右侧栏/canvas
		alert ("成功取消部署该VN配置");
		//修改vnlist中的记录；
		changeSelected(time,"false");
		//修改右侧的背景展示效果；
		vnResultToList();
		vnPhotoToList();
		//删除数组标记，同一id可以启动；
		for(var i = 0; i < selectedVnIdList.length; i++){
			if(selectedVnIdList[i] == findVnIdByTime(time)){
				selectedVnIdList.splice(i,1);
			}
		}
		//前端删除该虚拟网的展示；后端修改selected属性
		$.ajax(getVnConfigList);
	}
	function errorAfterDeletedVn(time){
		alert ("取消部署该VN配置失败");
	}
	function sendDeployVn(time){
		for(var i = 0; i < vnConfigListResult.length; i++){
			if(parseInt(vnConfigListResult[i].timeStamp / 1000) == time / 1000){
				$.ajax(submitInfor($.toJSON(vnConfigListResult[i]),url.subDeploy,successAfterDeployVn,errorAfterDeployVn,time));
				break;
			}
		}
	}
	function sendDeletedVn(time){
		for(var i = 0; i < vnConfigListResult.length; i++){
			if(parseInt(vnConfigListResult[i].timeStamp / 1000) == time / 1000){
				$.ajax(submitInfor($.toJSON(vnConfigListResult[i].vnId),url.subDelete,successAfterDeletedVn,errorAfterDeletedVn,time));
				break;
			}
		}
	}
	function popVnInforToShow(time){//展示list中的详细信息
		var operateTimeStamp;
		var addNode = {
			content: [
				'<div class="popup">',
					'<div class="inner">',
						'<div class="login loginNode" id="addNodeInfor">', 
							'<h1>详细信息</h1>',
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
					//如果不冲突则启动
					if(findVnIdByTime(time) != null){//检测返回值；
						if(selectedVnIdList.indexOf(findVnIdByTime(time)) == -1){//如果没有记录
							showListInfor.close();
							//向后台发送启动命令；
							sendDeployVn(time);
						}else{
							alert("警告：同一编号（VnId）的虚拟网不能同时运行。");
						}
					}
				});
				$("#unCheck").click(function() {
					showListInfor.close();
					//如果启动了，则向后台发送停止命令；
					if(isSelected(time)){
						sendDeletedVn(time);
					}else{
						alert("该虚拟网配置未启动，无法取消启动。");
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
				inforToShow += "</table><input type='button' value='部署' class='login-submit threeButton' id='check'><input type='button' value='取消部署' class='login-submit threeButton' id='unCheck'><input type='button' value='关闭' class='login-submit threeButton' id='cancel'>";
				addNode.content.splice(5,0,inforToShow);
				break;
			}
		}
		addNode.height = $(window).height() - 65;
		addNode.content = addNode.content.join("");
		return addNode;
	}
	function findVnIdByTime(timeStamp){
		for(var i = 0; i < vnConfigListResult.length; i++){
			if(parseInt(vnConfigListResult[i].timeStamp / 1000) == timeStamp / 1000){
				return vnConfigListResult[i].vnId;
			}
		}
		return null;
	}
	function isSelected(timeStamp){
		for(var i = 0; i < vnConfigListResult.length; i++){
			if(parseInt(vnConfigListResult[i].timeStamp / 1000) == timeStamp / 1000){
				return vnConfigListResult[i].selected;
			}
		}
		return false;
	}
	function changeSelected(timeStamp,state){
		for(var i = 0; i < vnConfigListResult.length; i++){
			if(parseInt(vnConfigListResult[i].timeStamp / 1000) == timeStamp / 1000){
				switch(state){
					case "true":
						vnConfigListResult[i].selected = true;
						break;
					case "false":
						vnConfigListResult[i].selected = false;
						break;
					case "change":
						if(vnConfigListResult[i].selected == true){
							vnConfigListResult[i].selected = false;
						}else{
							vnConfigListResult[i].selected = true;
						}
						break;
					default:
						console.log("改变状态参数错误");
				}
				break;
			}
		}
	}
	function vnResultToList(){
		var vnConfigList = "<tr><th  class='titleOfList' colspan = '3'>虚拟网历史配置</th></tr><tr class='thOfList'><th>虚拟网编号</th><th>虚拟网名称</th><th>保存时间</th></tr>";
		for(var i = 0; i < vnConfigListResult.length; i++){
			vnConfigList = vnConfigList + "<tr class='canPop select" + vnConfigListResult[i].selected +"'><td>" + vnConfigListResult[i].vnId + "</td><td>" + vnConfigListResult[i].vnName + "</td><td class='date'>" + UnixToDate(vnConfigListResult[i].timeStamp,true,8) + "</td></tr>";
		}
		$("#sideTable").html(vnConfigList);
		$(".selecttrue").css("backgroundColor","#00ff00");
		$("#sideTable tr").mouseover(function(){
			if(!isSelected(DateToUnix($(this).children().eq(2).text()))){
				$(this).css("backgroundColor","#ffff66");
			}
		})
		$("#sideTable tr").mouseout(function(){
			if(!isSelected(DateToUnix($(this).children().eq(2).text()))){
				$(this).css("backgroundColor","#d4e3e5");
			}
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
	function vnPhotoToList(){
		var vnPhoteList = "<tr><th class='titleOfList' colspan = '2'>虚拟网图标对应表</th></tr><tr class='thOfList'><th>虚拟网编号</th><th>示例图</th></tr>";
		for(var i = 0; i < idOfVn.length; i++){
			vnPhoteList = vnPhoteList + "<tr><td>" + idOfVn[i] + "</td><td><img height='" + heightOfImage + "' width='" + widthOfImage + "' src='images/" + colorOfVn[i] + "'/></td></tr>";
		}
		$("#sideTable2").html(vnPhoteList);
		$("#sideTable2 tr").mouseover(function(){
			$(this).css("backgroundColor","#ffff66");
		})
		$("#sideTable2 tr").mouseout(function(){
			$(this).css("backgroundColor","#d4e3e5");
		})
	}
	var getVnConfigList = {
        type: "POST",
        url: url.getVnConfigList,
        dataType: "json",
        success: function(vnConfigListData) {
            vnConfigListResult = eval(vnConfigListData);
			for(var i = 0; i < vnConfigListResult.length; i++){
				if(vnConfigListResult[i].selected == true){
					selectedVnIdList.push(vnConfigListResult[i].vnId);
				}
			}
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
            $.ajax(getVn);
        },
        error: function(err) {
            alert("error");
        }
    }
	var getVn = {
		type: "POST",
        url: url.getVn,
        dataType: "json",
        success: function(vnData) {
            vnResult = eval(vnData);
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
            if (isDrag == false) {
                topoResult = eval(topoData);
                nodes = [];
				vnNodes = [];
                var links = [];
                var linkTags = [];
				var vnTags = [];
				var vnLinkTags = [];
				var vnNumOfNode = [];
				var numOfVn = 0;
                scene.clear();
				//节点大小的修改
				if(topoResult.node.length < 10){
					widthOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*65;
					heightOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*50; 
				}else if(topoResult.node.length < 20){
					widthOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*65*0.9;
					heightOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*50*0.9; 
				}else{
					widthOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*65*0.8;
					heightOfImage = Math.sqrt(widthOfCanvas*heightOfCanvas/840000)*50*0.8; 
				}
                //遍历link表获取vn的数量；
				vnTagLable:for(var i = 0; i < vnResult.length; i++){
					for(var j = 0; j < vnTags.length; j++){
						if(vnResult[i].vnid == vnTags[j]){
							continue vnTagLable;
						}
					}
					vnTags.push(vnResult[i].vnid);	
				}
				vnTags.sort();
				numOfVn = vnTags.length; 
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
                        x = Math.ceil(Math.random() * (widthOfCanvas - widthOfImage));
						if (nodePositionInConfig != -1) {
							configResult.node[nodePositionInConfig].xCoordinate = x / widthOfCanvas;
							configResult.node[nodePositionInConfig].xCoordinate = configResult.node[nodePositionInConfig].xCoordinate.toFixed(3);
						}
                    } else {
                        x = configResult.node[nodePositionInConfig].xCoordinate * widthOfCanvas;
                    }
                    if (nodePositionInConfig == -1 || (nodePositionInConfig != -1 && configResult.node[nodePositionInConfig].yCoordinate == null)) {
                        y = Math.ceil(Math.random() * (heightOfCanvas - 3 * heightOfImage));
						if (nodePositionInConfig != -1) {
							configResult.node[nodePositionInConfig].yCoordinate = y / heightOfCanvas;
							configResult.node[nodePositionInConfig].yCoordinate = configResult.node[nodePositionInConfig].yCoordinate.toFixed(3);
						}
                    } else {
                        y = configResult.node[nodePositionInConfig].yCoordinate * heightOfCanvas;
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
                    var destNode;
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
                            tagSource = true;
                            break;
                        }
                    }
                    for (var j = 0; j < nodes.length; j++) {
                        if (topoResult.link[i].destination.destNode == nodes[j].id) {
                            destNode = nodes[j].entity;
                            tagDestination = true;
                            break;
                        }
                    }
                    if (tagSource && tagDestination) {
                        var link = new Object();
                        link.name = topoResult.link[i].linkId;
                        link.id = addLink(sourceNode, destNode, 0);
                        links.push(link);
                    }
                }
				//遍历vn数量分别绘制vn图；
				vn:for(var i = 0; i < vnResult.length; i++){
					//分别读取两个节点id，并在物理节点nodes中找到对应节点
						var heaIdAndPort = vnResult[i].headNodeConnector.split(":");
						var tailIdAndPort = vnResult[i].tailNodeConnector.split(":");
						var headNodeId = heaIdAndPort[0] + ":" + heaIdAndPort[1];
						var tailNodeId = tailIdAndPort[0] + ":" + tailIdAndPort[1];
						var headNodeFatherPosInNodes = -1;
						var tailNodeFatherPosInNodes = -1;
						var vnNode1 = new Object();
						var vnNode2 = new Object();
						var isHeadNodeOnCanvas = false;
						var isTailNodeOnCanvas = false;
						for(var j = 0; j < nodes.length; j++){
							if(nodes[j].id == headNodeId){
								headNodeFatherPosInNodes = j;
								break;
							}
						}
						for(var j = 0; j < nodes.length; j++){
							if(nodes[j].id == tailNodeId){
								tailNodeFatherPosInNodes = j;
								break;
							}
						}
					//添加数据至vnNodes,用于防止重复添加；
						for(var j = 0; j < vnNodes.length; j++){
							if(vnNodes[j].vn == vnResult[i].vnid && vnNodes[j].id == headNodeId){
								isHeadNodeOnCanvas = true;
							}
							if(vnNodes[j].vn == vnResult[i].vnid && vnNodes[j].id == tailNodeId){
								isTailNodeOnCanvas = true;
							}
						}
						//根据前一步获取的数据和vnid绘制node并添加至画布；
						var headNodeFather = nodes[headNodeFatherPosInNodes];
						if(isHeadNodeOnCanvas == false){
							if(vnNumOfNode[headNodeId] == undefined){
								vnNumOfNode[headNodeId] = 1;
							}else{
								vnNumOfNode[headNodeId] ++;
							}
							var x = headNodeFather.entity.getLocation().x;
							var y = headNodeFather.entity.getLocation().y - (vnNumOfNode[headNodeId]*0.7*heightOfImage);
							var color;
							var headFlag = false;
							if(idOfVn.length != 0){
								outHead:for (var j = 0; j < idOfVn.length; j++){
									if(vnResult[i].vnid == idOfVn[j]){
										headFlag = true;
										color = colorOfVn[j];
										break outHead;
									}
								}
								if(!headFlag){
									idOfVn.push(vnResult[i].vnid);
									color = colorOfVn[idOfVn.length - 1];
								}
							}else{
								idOfVn.push(vnResult[i].vnid);
								color = colorOfVn[idOfVn.length - 1];
							}
							vnNode1.vn = vnResult[i].vnid;
							vnNode1.id = headNodeId;
							vnNode1.y = y;
							vnNode1.entity = addVnNode(headNodeFather.name,headNodeId,x,y,vnNode1.vn,color);
							vnNodes.push(vnNode1);
						}
						if(isTailNodeOnCanvas == false){
							if(vnNumOfNode[tailNodeId] == undefined){
								vnNumOfNode[tailNodeId] = 1;
							}else{
								vnNumOfNode[tailNodeId] ++;
							}
							var tailNodeFather = nodes[tailNodeFatherPosInNodes];
							var x = tailNodeFather.entity.getLocation().x;
							var y = tailNodeFather.entity.getLocation().y - (vnNumOfNode[tailNodeId])*0.7*heightOfImage;
							var color;
							var tailFlag = false;
							if(idOfVn.length != 0){
								outTail:for (var j = 0; j < idOfVn.length; j++){
									if(vnResult[i].vnid == idOfVn[j]){
										tailFlag = true;
										color = colorOfVn[j];
										break outTail;
									}
								}
								if(!tailFlag){
									idOfVn.push(vnResult[i].vnid);
									color = colorOfVn[idOfVn.length - 1];
								}
							}else{
								idOfVn.push(vnResult[i].vnid);
								color = colorOfVn[idOfVn.length - 1];
							}
							vnNode2.vn = vnResult[i].vnid;
							vnNode2.id = tailNodeId;
							vnNode2.y = y;
							vnNode2.entity = addVnNode(tailNodeFather.name,tailNodeId,x,y,vnNode2.vn,color);
							vnNodes.push(vnNode2);
						}
						//添加图例
						vnPhotoToList();
				} 
			}
            wait();
        },
        error: function(err) {
            alert("error");
        }
    }
	$.ajax(getVnConfigList);
	$("#submit").click(function() {
        configBack = $.toJSON(configResult);
        $.ajax(submitConfig(configBack));
    });
});



