App.controller('userManageCtrl', ['$scope','$http',"FileUploader","$rootScope",function($scope,$http,FileUploader,$rootScope){
	$scope.downlink = FILEADDRESS.FILEADDRESS+"人员导入表.xls";
	//打开新建用户组模态框
	$scope.newUserModal=function(){
		$('#userModalForm')[0].reset();
		$('#newUserModal').modal('show');
		uploader.clearQueue();
		$('#addUsers').selectpicker('val', []);
		$('#fileName').empty();
		$('#importBtn').hide();
	}
	//打开修改用户组模态框
	$scope.modifyUserModal=function(ug){
		$('#userModalForm')[0].reset();
		$('#modifyUserModal').modal('show');
		$scope.modifyGroupParams.groupName = ug.groupname;
		$scope.modifyGroupParams.groupDesc = ug.groupdesc;
		var users = ug.users.split(",");
		$('#modifyUsers').selectpicker('val', users);
		$scope.modifyId = ug.groupid;
		$scope.originUsers = users;
	}
	

	$scope.queryData={
		"page":0,
		"rows":0,
		"query":{
			"groupName":"",
			"createMan":0
		}
	};

	$scope.users = [];
	//获取所有创建人
	$scope.$on('creators',function(event,data){
		$scope.creators = data;
	});

	//查找所有用户组
	$scope.findUserGroup=function(){
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/group/findGroup",
			data:$scope.queryData
		}).then(function(resp) {
			console.log(resp.data);
			$scope.userGroups = [];
			$scope.allnum = 0;
			var usernames = [];
			if(resp.data.e.code == 0){
				$scope.userGroups = resp.data.data.sendData;
				for(i in $scope.userGroups){
					$scope.allnum+=$scope.userGroups[i].usernum;
					usernames = [];
					for(j in $scope.userGroups[i].userArr){
						usernames.push($scope.userGroups[i].userArr[j].username);
					}
					$scope.userGroups[i].usernames = usernames.join("、");
				}
				console.log($scope.userGroups);
			}else{
				console.log('errdata'+resp.data);
			}
				
			
		});
	}
	$scope.findUserGroup();


	//查找所有用户
	$scope.findAllUsers=function(){
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/user/findUserInfo",
			data:{"page":0,"rows":0,"query":{}}
		}).then(function(resp) {
			console.log(resp.data);
			$scope.users = [];
			if(resp.data.e.code == 0){
				$scope.users = resp.data.data.sendData;
				console.log($scope.users);
			}else{
				console.log('errdata'+resp.data);
			}
		});
	}
	$scope.findAllUsers();
	//打开导入文件窗口
	$scope.openImport = function(){
		$('#userGroupFile').bind('change', function() {
			console.log(this.value);
			var pos = this.value.lastIndexOf("\\");
			var fileName = this.value.substring(pos + 1)
			$('#fileName').html(fileName);
			if(fileName != ""){
				$('#importBtn').show();
			}
			
		});
		
		$('#userGroupFile').click();
	}

	//用户批量导入
	$scope.importUsers = function() {
		uploader.queue[0].upload();
	};
	var uploader = $scope.uploader = new FileUploader({
		method: 'POST',
		url:BACKSTAGESERVERADDRESS.ADDRESS+"/user/importUser",
		data: '',
		headers: {'sessionid': $rootScope.user.sid}
	});
	uploader.onWhenAddingFileFailed = function (item/*{File|FileLikeObject}*/, filter, options) {
		console.info('onWhenAddingFileFailed', item, filter, options);
		this.clearQueue();
	};
	uploader.onCompleteItem = function (fileItem, response, status, headers) {
		if(response.e.code == 0) {
			$scope.findAllUsers();
			if(response.data.sendData.length == 0){
				alert('导入成功');
			}else{
				alert(response.data.sendData.join("、")+'行导入失败，其余导入成功');
			}
			
			setTimeout(function(){
				$('.selectpicker').selectpicker('refresh');
			},1000);
			this.clearQueue();	
		} else {
			alert(response.e.desc);
			console.log(response.e.desc);
			this.clearQueue();
		}
		$('#importBtn').hide();
		$('#fileName').html("");
	}

	//刷新下拉控件
	$scope.refresh=function(){
		$('.selectpicker').selectpicker('refresh');
	}

	$scope.newGroupParams={
		"groupName":"",
		"groupDesc":"",
		"addUserIds":""
	};
	//新建用户组
	$scope.newUserGroup=function(){
		if(typeof($scope.addUsers)=='undefined' || $scope.addUsers==null || $scope.addUsers.length == 0){
			alert("请选择用户");
			return;
		}
		$scope.newGroupParams.addUserIds = $scope.addUsers.join(",");
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/group/AddOrUppdataGroup",
			data:$scope.newGroupParams
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				alert("新建成功");
				$('#newUserModal').modal('hide');
				$scope.findUserGroup();
			}else{
				console.log('errdata'+resp.data);
			}
		});
	}

	$scope.modifyGroupParams={
		"groupId":0,
		"groupName":"",
		"groupCode":"",
		"groupDesc":"",
		"addUserIds":"",
		"delUserIds":""
	};

	
	//数组处理
	$scope.arrHandle = function(oldArr, newArr){
        var a = oldArr.sort();
        var b = newArr.sort();
        var c = [];
		var i = 0;
		var j = 0;
		while (i < a.length && j < b.length) {
			if (a[i] < b[j]) {
				c.push(a[i]);
				i++;
			} else if (b[j] < a[i]) {
				c.push(b[j]);
				j++;
			} else {
				i++;
				j++;
			}
		}
		while (i < a.length) {
			c.push(a[i]);
			i++;
		}
		while (j < b.length) {
			c.push(b[j]);
			j++;
		}
		return c;
	}
	//得到增加数组
	$scope.getAddArr = function(oldArr, newArr){
		var e = newArr;
		var c = $scope.arrHandle(oldArr, newArr);
		var adds = [];
		for (var i = 0; i < c.length; i++) {
			for (var j = 0; j < e.length; j++) {
				if (e[j] == c[i]) {
					adds.push(e[j]);
				}
			}
		}
		return adds;
	}
	//得到删除数组
	$scope.getDelArr = function(oldArr, newArr){
		var d = oldArr;
		var c = $scope.arrHandle(oldArr, newArr);
		var dels = [];
		for (var i = 0; i < c.length; i++) {
			for (var j = 0; j < d.length; j++) {
				if (d[j] == c[i]) {
					dels.push(d[j]);
				}
			}
		}
		return dels;
	}
	

	//修改用户组
	$scope.modifyUserGroup=function(){
		if($scope.originUsers == undefined){
			$scope.originUsers = [];
		}
		if($scope.modifyUsers == undefined){
			$scope.modifyUsers = [];
		}
		var addUsers = $scope.getAddArr($scope.originUsers,$scope.modifyUsers);
		var delUsers = $scope.getDelArr($scope.originUsers,$scope.modifyUsers);
		$scope.modifyGroupParams.groupId = $scope.modifyId;
		$scope.modifyGroupParams.addUserIds = addUsers.join(",");
		$scope.modifyGroupParams.delUserIds = delUsers.join(",");
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/group/AddOrUppdataGroup",
			data:$scope.modifyGroupParams
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				alert("修改成功");
				$('#modifyUserModal').modal('hide');
				$scope.findUserGroup();
			}else{
				console.log('errdata'+resp.data);
			}
		});
	}

	//下拉多选框配置
	$scope.configSelectpicker=function(){
		setTimeout(function(){
			$('#addUsers').addClass('selectpicker');
			$('#modifyUsers').addClass('selectpicker');
			$('.selectpicker').selectpicker({
				'actionsBox': true,
				'deselectAllText':'全不选',
				'selectAllText':'全选',
				'noneSelectedText':'用户列表添加',
				'selectedTextFormat':'count',
				'countSelectedText':'{0}名成员已选择',
				'liveSearch':true,
				'liveSearchNormalize':true,
				'liveSearchPlaceholder':"搜索"
			});
			//$('.selectpicker').selectpicker('val', [1,8]);

		},500);
	}

	$scope.$on('$viewContentLoaded', function() {  
		$scope.configSelectpicker();
	});
}]);

