App.controller('personalCtrl', ['$rootScope','$scope','$http','$state', function($rootScope,$scope,$http,$state){
	$scope.goHome = function(){
		if($rootScope.user.userrole == 0) {
			$state.go('user.home');
		} else {
			$state.go('admin.home');
		}
	}

	$scope.userInfo = $rootScope.user;


	//修改用户信息
	$scope.modifyInfo = function(){
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/user/updataUser",
			data:{"id":$scope.userInfo.id,"userName":$scope.userInfo.username,"userEmail":$scope.userInfo.useremail,"phone":$scope.userInfo.phone}
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				alert("修改成功");
			}else{
				console.log('errdata'+resp.data);
				alert(resp.data.e.desc);
			}
				
			
		});
	}
	$scope.newPass = {
		"oriPass":"",
		"newPassOne":"",
		"newPassTwo":""
	}
	//修改用户密码
	$scope.modifyPass = function(){
		console.log($scope.newPass);
		if($scope.newPass.oriPass == "" || $scope.newPass.newPassOne == "" || $scope.newPass.newPassTwo == ""){
			alert("密码不能未空");
			$("#resetBtn").click();
			$scope.newPass = {
				"oriPass":"",
				"newPassOne":"",
				"newPassTwo":""
			}
			return;
		}
		if($scope.newPass.newPassOne != $scope.newPass.newPassTwo){
			alert("两次输入密码不相同");
			$("#resetBtn").click();
			$scope.newPass = {
				"oriPass":"",
				"newPassOne":"",
				"newPassTwo":""
			}
			return;
		}
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/user/changePassWord",
			data:{"id":$scope.userInfo.id,"oldPassWord":$scope.newPass.oriPass,"newPassWord":$scope.newPass.newPassOne}
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				alert("修改成功");
				$("#resetBtn").click();
				$scope.newPass = {
					"oriPass":"",
					"newPassOne":"",
					"newPassTwo":""
				}
			}else{
				console.log('errdata'+resp.data);
				alert(resp.data.e.desc);
				$("#resetBtn").click();
				$scope.newPass = {
					"oriPass":"",
					"newPassOne":"",
					"newPassTwo":""
				}
			}
				
			
		});
	}
}]);

