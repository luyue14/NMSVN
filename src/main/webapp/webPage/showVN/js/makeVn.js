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
	var url = {//����������ʹ��
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
			//�����϶���vn������Ч����
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
			//�����϶���vn������Ч����
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
		var link = new JTopo.Link(sourceNodeId, destNodeId); //���߶���  
		link.lineWidth = 3; //���ߴ�С  
		if(vnNum != 0){
			link.strokeColor = colorStore[vnNum]; // ������ɫ���
		}
		scene.add(link); //��������������߶���link. 
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
	function UnixToDate(unixTime, isFull, timeZone) {//unixTime���룬ifFull��������ʱ��(Y-m-d ���� Y-m-d H:i:s)timeZoneʱ�� 
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
	function successAfterDeployVn(time){//����ɹ����޸�list/�Ҳ���/canvas
		alert ("�ɹ������VN����");
		//�޸�vnlist�еļ�¼��
		changeSelected(time,"true");
		//�޸��Ҳ�ı���չʾЧ����
		vnResultToList();
		//д�������ǣ���ֹͬһid������
		selectedVnIdList.push(findVnIdByTime(time));
		//ǰ����Ӹ���������չʾ������޸�selected����
		$.ajax(getVn);
	}
	function errorAfterDeployVn(time){
		alert ("�����VN����ʧ��");
	}
	function successAfterDeletedVn(time){//�ɹ�ȡ��������޸�list/�Ҳ���/canvas
		alert ("�ɹ�ȡ�������VN����");
		//�޸�vnlist�еļ�¼��
		changeSelected(time,"false");
		//�޸��Ҳ�ı���չʾЧ����
		vnResultToList();
		vnPhotoToList();
		//ɾ�������ǣ�ͬһid����������
		for(var i = 0; i < selectedVnIdList.length; i++){
			if(selectedVnIdList[i] == findVnIdByTime(time)){
				selectedVnIdList.splice(i,1);
			}
		}
		//ǰ��ɾ������������չʾ������޸�selected����
		$.ajax(getVnConfigList);
	}
	function errorAfterDeletedVn(time){
		alert ("ȡ�������VN����ʧ��");
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
	function popVnInforToShow(time){//չʾlist�е���ϸ��Ϣ
		var operateTimeStamp;
		var addNode = {
			content: [
				'<div class="popup">',
					'<div class="inner">',
						'<div class="login loginNode" id="addNodeInfor">', 
							'<h1>��ϸ��Ϣ</h1>',
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
					//�������ͻ������
					if(findVnIdByTime(time) != null){//��ⷵ��ֵ��
						if(selectedVnIdList.indexOf(findVnIdByTime(time)) == -1){//���û�м�¼
							showListInfor.close();
							//���̨�����������
							sendDeployVn(time);
						}else{
							alert("���棺ͬһ��ţ�VnId��������������ͬʱ���С�");
						}
					}
				});
				$("#unCheck").click(function() {
					showListInfor.close();
					//��������ˣ������̨����ֹͣ���
					if(isSelected(time)){
						sendDeletedVn(time);
					}else{
						alert("������������δ�������޷�ȡ��������");
					}					
				});
			}
		};
		for(var i = 0; i < vnConfigListResult.length; i++){//����vn��¼��Ϣ��
			if(parseInt(vnConfigListResult[i].timeStamp / 1000) == time / 1000){
				operateTimeStamp = vnConfigListResult[i].timeStamp;
				var inforToShow = "<table class='tableList popFcolor'><tr><td>������Id</td><td colspan='3'>" +vnConfigListResult[i].vnId + "</td></tr><tr><td>����������</td><td colspan='3'>" + vnConfigListResult[i].vnName + "</td></tr><tr><td>������������Ip</td><td colspan='3'>" + vnConfigListResult[i].controllerIp + "</td></tr><tr><td>Ipv4Դ��ַ</td><td colspan='3'>" + vnConfigListResult[i].flowSpace.ipv4Src + "</td></tr><tr><td>Ipv4Ŀ�ĵ�ַ</td><td colspan='3'>" + vnConfigListResult[i].flowSpace.ipv4Dst + "</td></tr><tr><td rowspan='" + (vnConfigListResult[i].dp.length + 1) + "'>�ڲ��ڵ�����</td><th>������id</th><th>�˿ں�</th><th>��������</th></tr>";
				for(var j = 0; j < vnConfigListResult[i].dp.length; j++){//�����ڵ���Ϣ��
					inforToShow += "<tr><td>" + vnConfigListResult[i].dp[j].dpId +"</td><td>";
					for(var k = 0; k < vnConfigListResult[i].dp[j].ports.length; k++){//�˿���Ϣ��
						inforToShow += vnConfigListResult[i].dp[j].ports[k] + "</br>";
					}
					inforToShow += "</td><td>" + vnConfigListResult[i].dp[j].flowtableNumber + "</td></tr>";
				}
				inforToShow += "</table><input type='button' value='����' class='login-submit threeButton' id='check'><input type='button' value='ȡ������' class='login-submit threeButton' id='unCheck'><input type='button' value='�ر�' class='login-submit threeButton' id='cancel'>";
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
						console.log("�ı�״̬��������");
				}
				break;
			}
		}
	}
	function vnResultToList(){
		var vnConfigList = "<tr><th  class='titleOfList' colspan = '3'>��������ʷ����</th></tr><tr class='thOfList'><th>���������</th><th>����������</th><th>����ʱ��</th></tr>";
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
		var vnPhoteList = "<tr><th class='titleOfList' colspan = '2'>������ͼ���Ӧ��</th></tr><tr class='thOfList'><th>���������</th><th>ʾ��ͼ</th></tr>";
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
	var getTopo = { //jQuery��AJAXִ�е����ö���
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
				//�ڵ��С���޸�
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
                //����link���ȡvn��������
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
				//��ӽڵ�ı�����
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
				//�����·�ı�����
                for(var i = 0; i < topoResult.link.length; i++) { 
                    var sourceNode;
                    var destNode;
                    var tag = 0;
                    for (var j = 0; j < linkTags.length; j++) { //�жϸ���·�Ƿ��Ѿ����ڡ�
                        if (((linkTags[j].sourceNodeId == topoResult.link[i].source.sourceNode) && (linkTags[j].destNodeId == topoResult.link[i].destination.destNode)) || ((linkTags[j].destNodeId == topoResult.link[i].source.sourceNode) && (linkTags[j].sourceNodeId == topoResult.link[i].destination.destNode))) {
                            tag = 1;
                            continue;
                        }
                    }
                    if (tag == 1) { //���ݱ�ʾλtag��ֵ�ж��Ƿ���������ѭ����
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
				//����vn�����ֱ����vnͼ��
				vn:for(var i = 0; i < vnResult.length; i++){
					//�ֱ��ȡ�����ڵ�id����������ڵ�nodes���ҵ���Ӧ�ڵ�
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
					//���������vnNodes,���ڷ�ֹ�ظ���ӣ�
						for(var j = 0; j < vnNodes.length; j++){
							if(vnNodes[j].vn == vnResult[i].vnid && vnNodes[j].id == headNodeId){
								isHeadNodeOnCanvas = true;
							}
							if(vnNodes[j].vn == vnResult[i].vnid && vnNodes[j].id == tailNodeId){
								isTailNodeOnCanvas = true;
							}
						}
						//����ǰһ����ȡ�����ݺ�vnid����node�������������
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
						//���ͼ��
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



