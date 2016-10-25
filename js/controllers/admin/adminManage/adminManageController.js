App.controller('adminManageCtrl', ['$scope','$http', function($scope,$http){
	$scope.newAdminModal=function(){
		$('#newAdminModal').modal('show');
	}
	
	$scope.queryData = {
		"query":{
			"job_num":"",
			"userName":""
		}
	};

	$scope.job_num = "";
	//查询所有管理员人
	$scope.findAllAdmins=function(){
		$scope.queryData.query.job_num = $scope.job_num;
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/user/getAdmin",
			data:$scope.queryData
		}).then(function(resp) {
			console.log(resp.data);
			$scope.admins = [];
			if(resp.data.e.code == 0){
				$scope.admins = resp.data.data.sendData;
				for(var i in $scope.admins){
					$scope.admins[i].modify = 0;
				}
			}else{
				console.log('errdata'+resp.data);
			}
		});
	}
	$scope.findAllAdmins();

	//获取所有创建人
	$scope.$on('creators',function(event,data){
		$scope.creators = data;
	});
	
	//新建管理员表单自动补全
	//自动查询数据
	$scope.autoQueryData = {
		"page":0,
		"rows":0,
		"query":{
			"job_num":""
		}
	}
	//表单input绑定的数据
	$scope.new = {
		"username":"",
		"role_id":1,
		"job_num":"",
		"id":0
	}
	//监控input
	$scope.$watch('new.job_num',function(newValue,oldValue, scope){
		//console.log(newValue);
		$scope.new.username = "";
		$scope.new.id = 0;
		$scope.autoQueryData.query.job_num = newValue;
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/user/findUserInfo",
			data:$scope.autoQueryData
		}).then(function(resp) {
			console.log(resp.data);
			$scope.users = [];
			$scope.normalUsers = [];
			if(resp.data.e.code == 0){

				if(resp.data.data.sendData[0] != null){
					$scope.users = resp.data.data.sendData;
					for(var i in $scope.users){
						if($scope.users[i].userrole == 0){
							$scope.normalUsers.push($scope.users[i]);
						}
					}
					if($scope.normalUsers[0] != null && $scope.normalUsers[0].job_num == newValue){
						$scope.new.username = $scope.normalUsers[0].username;
						$scope.new.id = $scope.normalUsers[0].id;
						$scope.normalUsers = [];
					}
				}

			}else{
				console.log('errdata'+resp.data);
			}
		});
		
	});

	//新建管理员
	$scope.newAdmin=function(){
		if($scope.new.id == 0){
			alert("您输入的工号有误，用户不存在");
			return;
		}
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/user/updataUser",
			data:{"id":$scope.new.id,"userRole":$scope.new.role_id*1}
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				alert("新建成功");
				$('#newAdminModal').modal('hide');
				$scope.findAllAdmins();
			}else{
				console.log('errdata'+resp.data);
			}
		});
	}

	//修改管理员
	$scope.modifyAdmin=function(admin){
		if(!confirm("确认修改管理员？")){
			return;
		}
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/user/updataUser",
			data:{"id":admin.id,"userRole":admin.newuserrole*1}
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				alert("修改成功");
				admin.userrole = admin.newuserrole;
				admin.modify = 0;
			}else{
				alert(resp.data.e.desc);
				console.log('errdata'+resp.data);
			}
		});
	}

	//删除管理员
	$scope.deleteAdmin=function(admin){
		if(!confirm("确认删除管理员？")){
			return;
		}
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/user/updataUser",
			data:{"id":admin.id,"userRole":0}
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				alert("删除成功");
				for(var i in $scope.admins){
					if($scope.admins[i].id == admin.id){
						$scope.admins.splice(i,1);
					}
				}
			}else{
				alert(resp.data.e.desc);
				console.log('errdata'+resp.data);
			}
		});
	}
}]);

