App.controller('loginCtrl', ['$rootScope','$scope','$http','$state','authService',function($rootScope,$scope,$http,$state,authService){

	$scope.mykeyup = function(e){
		var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.login();
        }
	}
	document.onkeydown = $scope.mykeyup;
	$scope.account={
		"job_num":"",
		"login_pwd":"",
		"role_id":0
	}
	//载入登陆状态
	$rootScope.app.layout.login_status = true;
	//登录
	$scope.login=function(){
		if($scope.account.job_num == "" || $scope.account.login_pwd == ""){
			alert("工号或密码不能为空");
			return;
		}

		//点击登录后禁用登录按钮
		$('.loginBtn').attr('disabled', true);
		setTimeout(function() {
			$('.loginBtn').attr('disabled', false);
		}, 1000);

		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/login/doLogin",
			data:$scope.account
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){

				$scope.login_status = true;
				
				if(typeof(resp.data.data.sendData.sid)!='undefined' && resp.data.data.sendData.sid!=null){
					authService.addsid(resp.data.data.sendData.sendData,resp.data.data.sendData.sid);
				}

				if($scope.account.role_id == 0) {
					$state.go('user.home');
				} else {
					$state.go('admin.home');
				}
				$rootScope.app.layout.login_status = false;
			}else{
				$scope.login_status = false;
				console.log('data',resp.data);
				$scope.authMsg = resp.data.e.desc;
				console.log($scope.authMsg );
				alert($scope.authMsg);
			}
				
			
		});
	}
}]);

