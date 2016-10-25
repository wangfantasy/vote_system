App.controller('voteCtrl', ['$scope','$http','$stateParams', function($scope,$http,$stateParams){

	//当前频道id
	$scope.channelId="";
	//当前频道名
	$scope.channelName="";
	//当前投票活动id
	$scope.voteId=$stateParams.voteid*1;
	
	//投票参数
	$scope.voteParams={
		"channelId":"",
		"optionIds":"",
		"voteId":""
	};

	//投票
	$scope.doVote=function(id){
		$scope.voteParams.voteId = $scope.voteId;
		$scope.voteParams.optionIds = "";
		var optionIds = [];
		for(var i in $scope.voteObjs){
			if($scope.voteObjs[i].check == true){
				optionIds.push($scope.voteObjs[i].voteoptionid);
			}
		}
		if(optionIds.length > $scope.channelInfo.maxcount - $scope.channelInfo.hasvote){
			alert("投票数量超出");
			console.log("no");
			return;
		}
		$scope.voteParams.optionIds = optionIds.join(",");
		$scope.voteParams.channelId = $scope.channelId;
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/tbRecode/addRecode",
			data:$scope.voteParams
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				alert("投票成功");
				// for(i in $scope.voteObjs){
				// 	if($scope.voteObjs[i].voteoptionid == id){
				// 		$scope.voteObjs[i].recodeNum++;
				// 	}
				// }
				$scope.findVoteObj($scope.channelId);
				$scope.findActivityDetail();
			}else{
				alert(resp.data.e.desc);
				console.log('errdata'+resp.data);
			}
				
			
		});
	}

	//查询投票对象参数
	$scope.queryData={
		"query":{
			"voteId":$scope.voteId,
			"channelId":"",
			"voteOptionName":""
		}
	};
	//投票对象
	$scope.voteObj={
		"voteoptionname":"",
		"voteoptionid":"",
		"attr":[],
		// "attrmore":[],
		"channelid":"",
		"status":"",
		"photo":"",
	};
	//当前投票对象的数量
	$scope.voteObjCount=0;
	//查询投票对象
	$scope.findVoteObj=function(id,voteOptionName){
		$scope.queryData.query.voteOptionName = "";
		if(typeof(id)!='undefined' && id!=null){
			$scope.channelId = id;
			for(var i in $scope.channels){
				if($scope.channels[i].channelid == id){
					$scope.channelName = $scope.channels[i].channelname;
				}
			}
		}
		if(typeof(voteOptionName)!='undefined' && voteOptionName!=null){
			$scope.queryData.query.voteOptionName = voteOptionName;
		}
		$scope.queryData.query.channelId = $scope.channelId;
		$scope.findChannelInfo($scope.channelId);
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/tbVoteoption/findTbVoteoption",
			data:$scope.queryData
		}).then(function(resp) {
			console.log(resp.data);
			$scope.voteObjs=[];
			$scope.voteObjsDef=[];
			var data = [];
			var blob = {};
			if(resp.data.e.code == 0){
				data = resp.data.data.sendData;
				$scope.voteObjCount = data.length;
				for(var i in data ){
					$scope.voteObj={};
					$scope.voteObj.voteoptionname = data[i].voteoptionname;
					$scope.voteObj.recodeNum = data[i].recodeNum;
					$scope.voteObj.voteoptionid = data[i].voteoptionid;
					$scope.voteObj.channelid = data[i].channelid;
					$scope.voteObj.status = data[i].status;
					$scope.voteObj.attr = [];
					// $scope.voteObj.attrmore = [];
					$scope.voteObj.hasVote = data[i].hasVote;
					$scope.voteObj.photo = BACKSTAGESERVERADDRESS.ADDRESS+"/statistical/findTbVoteoptionByIdImage/"+data[i].voteoptionid;
					// blob = new Blob(data[i].photo,{"type":"image/jpeg"});
					// console.log(blob);
					// $scope.voteObj.photo = window.URL.createObjectURL(blob);

					//$scope.voteObj.selected = false;
					for(var j in data[i].attr){
						if(data[i].attr[j].attrname == "工号"){
							$scope.voteObj.job_num = data[i].attr[j].attrvalue;
						}else if(data[i].attr[j].attrname == "姓名"){
							continue;
							// $scope.voteObj.username = data[i].attr[j].attrvalue;
						}else{
							if(data[i].attr[j].attrname == "答辩平均分" || data[i].attr[j].attrname == "综合能力评分" || data[i].attr[j].attrname == "总分"){
								data[i].attr[j].attrvalue = (data[i].attr[j].attrvalue*1).toFixed(2);
							}
							$scope.voteObj.attr.push(data[i].attr[j]);
							// if(j<5){
							// 	$scope.voteObj.attr.push(data[i].attr[j]);
							// }else{
							// 	$scope.voteObj.attrmore.push(data[i].attr[j]);
							// }
						}
						
					}
					$scope.voteObjsDef.push($scope.voteObj);
					
				}
				$scope.voteObjs = $scope.voteObjsDef;
				$scope.voteObjs.sort(function(a,b){
					return a.voteoptionid - b.voteoptionid;
				});
			}else{
				console.log('errdata'+resp.data);
			}
				
			
		});
	}

	//排序
	$scope.sortVoteObj = function(type){
		if(type == 0){
			$scope.voteObjs = [];
			for(var i in $scope.voteObjsDef){
				$scope.voteObjs.push($scope.voteObjsDef[i]);
			}
		}else if(type == 1){
			$scope.voteObjs.sort(function(a,b){
				console.log(b.recodeNum*1 - a.recodeNum*1);
				return b.recodeNum*1 - a.recodeNum*1;
			});
		}else if(type == 2){
			var aNo = 0;
			var bNo = 0;
			$scope.voteObjs.sort(function(a,b){
				for(var i in a.attr){
					if(a.attr[i].attrname == "参评次数"){
						aNo = a.attr[i].attrvalue*1;
					}
				}
				for(var i in b.attr){
					if(b.attr[i].attrname == "参评次数"){
						bNo = b.attr[i].attrvalue*1;
					}
				}
				return bNo - aNo;
			});
		}
	}

	//查询投票频道列表
	$scope.findVoteChannel=function(){
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/tbChannel/findChannelByVoteId/"+$scope.voteId,
			data:{},
		}).then(function(resp) {
			//console.log("频道列表");
			//console.log(resp.data);
			$scope.channels = [];
			if(resp.data.e.code == 0){
				$scope.channels = resp.data.data.sendData;
				$scope.channelId = resp.data.data.sendData[0].channelid;
				$scope.channelName = resp.data.data.sendData[0].channelname;
			}else{
				console.log('errdata'+resp.data);
			}
				
			
		});
	}
	$scope.findVoteChannel();

	//查询投票频道信息
	$scope.findChannelInfo=function(channelId){
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/tbChannel/findChannelInfo/"+channelId
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				$scope.channelInfo = resp.data.data.sendData;
			}else{
				console.log('errdata'+resp.data);
			}
				
			
		});
	}

	// $scope.selectVoteItem=function(obj){
	// 	if(obj.status == 1){
	// 		obj.selected = !obj.selected;
	// 	}
	// }

	$scope.queryData_ = {
		"query":{
			"voteId":$stateParams.voteid*1
		}
	};
	//查询当前投票活动详情
	$scope.findActivityDetail=function(){
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/vote/findVoteByQuery",
			data:$scope.queryData_
		}).then(function(resp) {
			console.log(resp.data);
			$scope.activity = {};
			if(resp.data.e.code == 0){
				$scope.activity = resp.data.data.sendData[0];
			}else{
				console.log('errdata'+resp.data);
			}	
		});
	}

	$scope.findActivityDetail();
	
	//侧边栏加载完成后点击第一个选项
	$scope.checkLast = function($last){
		if($last){
			$scope.findVoteObj($scope.channelId);
		}
	}
		
}]);

