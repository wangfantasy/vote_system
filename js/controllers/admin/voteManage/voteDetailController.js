App.controller('voteDetailCtrl', ['$scope','$http', '$stateParams', '$location',function($scope,$http,$stateParams,$location){
	$scope.voteId = $stateParams.voteid*1;

	$scope.queryData = {
		"query":{
			"voteId":$scope.voteId
		}
	};

	var url = $location.url();
	$scope.detailUrl = url.substring(url.lastIndexOf("/"));

	//查询投票活动详情
	$scope.findActivityDetail=function(){
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/vote/findVoteByQuery",
			data:$scope.queryData
		}).then(function(resp) {
			console.log(resp.data);
			$scope.activity = {};
			if(resp.data.e.code == 0){
				$scope.activity = resp.data.data.sendData[0];
				if($scope.activity.state == 1){
					$scope.activity.type = "未开始";
				}else if($scope.activity.state == 2){
					$scope.activity.type = "进行中";
				}else if($scope.activity.state == 3){
					$scope.activity.type = "已结束";
				}
				var times = $scope.activity.endtime.time - $scope.activity.starttime.time;
				//console.log(times);
				$scope.activity.daysRound  = Math.floor(times / 1000 / 60 / 60 / 24);
				$scope.activity.hoursRound  = Math.floor(times/ 1000 / 60 / 60 - (24 * $scope.activity.daysRound));
				$scope.activity.minutesRound = Math.floor(times / 1000 /60 - (24 * 60 * $scope.activity.daysRound) - (60 * $scope.activity.hoursRound));
			}else{
				console.log('errdata'+resp.data);
			}	
		});
	}

	$scope.findActivityDetail();

	//重新投票
	$scope.againVote=function(){
		if(!confirm("是否重新投票？")){
			return;
		}

		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/vote/againVote",
			data:{"voteId":$stateParams.voteid*1}
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				$scope.findActivityDetail();
				alert("重新投票成功！");
			}else{
				alert(resp.data.desc);
				console.log('errdata'+resp.data);
			}	
		});
	}

	//结束投票
	$scope.endVote=function(){
		if(!confirm("是否结束投票？")){
			return;
		}
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/vote/endVote",
			data:{"voteID":$stateParams.voteid*1}
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				$scope.findActivityDetail();
				alert("结束投票成功！");
			}else{
				alert(resp.data.desc);
				console.log('errdata'+resp.data);
			}	
		});
	}

	//开始投票
	$scope.startVote=function(){
		if(!confirm("是否立即开始投票？")){
			return;
		}
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/vote/startVote",
			data:{"voteID":$stateParams.voteid*1}
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				$scope.findActivityDetail();
				alert("开始投票成功！");
			}else{
				alert(resp.data.desc);
				console.log('errdata'+resp.data);
			}	
		});
	}

	//再来一次
	$scope.copyVote=function(){
		if(!confirm("是否再来一次？")){
			return;
		}
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/vote/copyVote",
			data:{"voteID":$stateParams.voteid*1}
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				$scope.findActivityDetail();
				alert("再来一次成功！");
			}else{
				alert(resp.data.desc);
				console.log('errdata'+resp.data);
			}	
		});
	}


	//查询投票对象参数
	$scope.objQueryData={
		"query":{
			"voteId":$scope.voteId,
			"channelId":""
		}
	};
	//查询投票对象
	$scope.findVoteObj=function(id){
		$scope.channelId = id;
		$scope.exportURL = BACKSTAGESERVERADDRESS.ADDRESS+"/statistical/exportVoteOption/{channelId:"+$scope.channelId+",voteId:"+$scope.voteId+"}";	
		$scope.objQueryData.query.channelId = $scope.channelId;
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/tbVoteoption/findTbVoteoption",
			data:$scope.objQueryData
		}).then(function(resp) {
			console.log(resp.data);
			$scope.voteObjs=[];
			var data = [];
			if(resp.data.e.code == 0){
				data = resp.data.data.sendData;
				$scope.voteObjCount = data.length;
				for( i in data ){
					$scope.voteObj={};
					$scope.voteObj.recodeNum = data[i].recodeNum;
					for(j in data[i].attr){
						switch(data[i].attr[j].attrname){
							case "姓名":
							$scope.voteObj.attr1 = data[i].attr[j].attrvalue;
							break;
							case "工号":
							$scope.voteObj.attr2 = data[i].attr[j].attrvalue;
							break;
							case "最高学历":
							$scope.voteObj.attr3 = data[i].attr[j].attrvalue;
							break;
							case "职务":
							$scope.voteObj.attr4 = data[i].attr[j].attrvalue;
							break;
							case "现职称取得日期":
							$scope.voteObj.attr5 = data[i].attr[j].attrvalue;
							break;
							case "现职称取得年限":
							$scope.voteObj.attr6 = data[i].attr[j].attrvalue;
							break;
							case "参评次数":
							$scope.voteObj.attr7 = data[i].attr[j].attrvalue;
							break;
							case "答辩平均分":
							$scope.voteObj.attr8 = data[i].attr[j].attrvalue;
							break;
							case "综合能力评分":
							$scope.voteObj.attr9 = data[i].attr[j].attrvalue;
							break;
							case "总分":
							$scope.voteObj.attr10 = data[i].attr[j].attrvalue;
							break;
							case "组别":
							$scope.voteObj.attr11 = data[i].attr[j].attrvalue;
							break;
							case "小组排名":
							$scope.voteObj.attr12 = data[i].attr[j].attrvalue;
							break;
						}					
					}
					// $scope.voteObj.attr = data[i].attr;
					$scope.voteObjs.push($scope.voteObj);
				}
			}else{
				console.log('errdata'+resp.data);
			}
				
			
		});
	}

	//查询投票频道列表
	$scope.findVoteChannel=function(){
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/tbChannel/findChannelByVoteId/"+$scope.voteId,
			data:{},
		}).then(function(resp) {
			$scope.channels = [];
			if(resp.data.e.code == 0){
				$scope.channels = resp.data.data.sendData;
				$scope.channelId = resp.data.data.sendData[0].channelid;
				$scope.findVoteObj($scope.channelId);
			}else{
				console.log('errdata'+resp.data);
			}
				
			
		});
	}
	$scope.findVoteChannel();
	//导出路径
	//$scope.exportURL = BACKSTAGESERVERADDRESS.ADDRESS+"/statistical/exportVoteOption/{'channelId':"+$scope.channelId+",'voteId':"+$scope.voteId+"}";

		
}]);

