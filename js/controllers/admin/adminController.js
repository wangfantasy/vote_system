App.controller('adminCtrl', ['$scope','$http','$state', function($scope,$http,$state){
	$scope.queryData = {
		"query":{
			"job_num":0,
			"userName":""
		}
	};
	$scope.supadminNo = 0;
	$scope.adminNo = 0;
	$scope.userNo = 0;
	//查找所有用户
	$scope.findAllUsers=function(){
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/user/findUserInfo",
			data:{"page":0,"rows":0,"query":{}}
		}).then(function(resp) {
			console.log(resp.data);
			$scope.users = [];
			var supadminNo = 0;
			var adminNo = 0;
			var userNo = 0;
			if(resp.data.e.code == 0){
				$scope.users = resp.data.data.sendData;
				for(var i in $scope.users){
					if($scope.users[i].userrole == 0){
						userNo++;
					}else if($scope.users[i].userrole == 1){
						adminNo++;
					}else{
						supadminNo++;
					}
				}
				$scope.supadminNo = supadminNo;
				$scope.adminNo = adminNo;
				$scope.userNo = userNo;
			}else{
				console.log('errdata'+resp.data);
			}
		});
	}
	$scope.findAllUsers();

	
	//查询所有创建人
	$scope.findAllCreators=function(){
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/user/getAdmin",
			data:$scope.queryData
		}).then(function(resp) {
			console.log(resp.data);
			$scope.creators = [];
			if(resp.data.e.code == 0){
				$scope.creators = resp.data.data.sendData;
				$scope.$broadcast('creators',$scope.creators);
			}else{
				console.log('errdata'+resp.data);
			}
				
			
		});
	}
	$scope.findAllCreators();

	//查询投票活动
	$scope.findAllActivities=function(){
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/vote/findVoteByQuery",
			data:{query: {voteName: "", createMan: 0, voteId: 0}}
		}).then(function(resp) {
			console.log(resp.data);
			$scope.activities=[];
			if(resp.data.e.code == 0){
				$scope.activities = resp.data.data.sendData;
				for(var i in $scope.activities){
					$scope.activities[i].progress = $scope.activities[i].totalnum/$scope.activities[i].votepernum*100;
				}
				console.log($scope.activities);
			}else{
				console.log('errdata'+resp.data);
			}
				
			
		});
	}
	$scope.findAllActivities();

	$scope.viewVoteItem = function(id){
		if(id == 0){
			$state.go('admin.voteManage');
		}else{
			$state.go('admin.voteDetail.detailInfo',{voteid:id});
		}
		
	}

	


	// $scope.$on('$viewContentLoaded', function() {
	// 	//$scope.homeFindUserGroup();
		
	// });
	
}]);

