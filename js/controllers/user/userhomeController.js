App.controller('userhomeCtrl', ['$scope','$http', function($scope,$http){

	$scope.queryData={
		"query":{
			"voteName":""
		}
	}

	// $scope.activity={
	// 	"votename":"",
	// 	"type":"",
	// 	"voteid":""
	// }

	//活动类型
	$scope.type = 0;
	
	//查询投票活动
	$scope.findActivity=function(type,voteName){
		$scope.queryData.query.voteName = "";
		if(typeof(type)!='undefined' && type!=null){
			$scope.type = type;		
		}
		if(typeof(voteName)!='undefined' && voteName!=null){
			$scope.queryData.query.voteName = voteName;
		}
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/vote/findVoteByQuery",
			data:$scope.queryData
		}).then(function(resp) {
			console.log(resp.data);
			$scope.activities=[];
			$scope.goingActivities=[];
			$scope.endedActivities=[];
			var data = [];
			if(resp.data.e.code == 0){
				data = resp.data.data.sendData;
				for( i in data ){
					$scope.activity = {};
					$scope.activity.votename = data[i].votename;
					$scope.activity.voteid = data[i].voteid;
					$scope.activity.perstate = data[i].perstate;
					if(data[i].state == 2){
						$scope.activity.type = "进行中";
						$scope.goingActivities.push($scope.activity);
					}else if(data[i].state == 3){
						$scope.activity.type = "已结束";
						$scope.endedActivities.push($scope.activity);
					}
				}
				if($scope.type == 0){
					$scope.activities = $scope.goingActivities;
				}else{
					$scope.activities = $scope.endedActivities;
				}
				$scope.activities.sort(function(a,b){
					return a.voteid - b.voteid;
				});
			}else{
				console.log('errdata'+resp.data);
			}
				
			
		});
	}

	$scope.findActivity(0);
}]);

