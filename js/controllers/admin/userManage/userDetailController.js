App.controller('userDetailCtrl', ['$scope','$http','$stateParams',function($scope,$http,$stateParams){
	$scope.groupId = $stateParams.groupid*1;
	$scope.userName = "";

	//删除用户
	$scope.deleteUser = function(id){
		if(!confirm("确认删除该用户？")){
			return;
		}
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/user/delUser",
			data:{id:id,groupId:$scope.groupId}
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				alert("删除成功");
				//refresh
				$scope.findUsersInUserGroup();
			}else{
				console.log('errdata'+resp.data);
				alert(resp.data.e.desc);
			}	
		});
	}

	//重置用户密码
	$scope.resetUserPass = function(id){
		if(!confirm("确认重置该用户密码？")){
			return;
		}
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/user/changePassWord",
			data:{id:id}
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				alert("重置成功");
				//refresh
				$scope.findUsersInUserGroup();
			}else{
				console.log('errdata'+resp.data);
				alert(resp.data.e.desc);
			}	
		});
	}

	//查找用户组下的用户
	$scope.findUsersInUserGroup = function(userName){
		var params = {
			query:{
				id:$scope.groupId,
				groupName:userName
			}
		};
		if(typeof(userName)=='undefined' && userName==null){
			params.query.groupName = "";
		}
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/group/findAllByGroupId",
			data:params
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				$scope.groupUsers = resp.data.data.sendData;

			}else{
				console.log('errdata'+resp.data);
				alert(resp.data.e.desc);
			}	
		});
	}
	$scope.findUsersInUserGroup();
}]);

