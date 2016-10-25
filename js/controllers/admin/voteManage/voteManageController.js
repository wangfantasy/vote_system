App.controller('voteManageCtrl', ['$scope','$http', "FileUploader","$rootScope",function($scope,$http,FileUploader,$rootScope){
	
	$scope.downlink = FILEADDRESS.FILEADDRESS+"投票信息导入模板.xlsx";
	//当前投票活动类型
	$scope.type = 1;


	$('#newVoteModal').on('hidden.bs.modal', function (e) {
	  $scope.findAllActivities(1);
	});

	$('#modifyVoteModal').on('hidden.bs.modal', function (e) {
	  $scope.findAllActivities(1);
	});


	//新建投票模态框
	$scope.newVoteModal=function(){
		
		$scope.filenames = "";
		$scope.isSelectImg = 0;
		img_uploader.clearQueue();
		$('#voteInfoForm')[0].reset();

		$('#newStartTimeWidget').datetimepicker('remove');
		$('#newEndTimeWidget').datetimepicker('remove');
		$('#newStartTimeWidget').datetimepicker({
			language:  'zh-CN',
			weekStart: 1,
			todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			minView: 0,
			maxView: 2,
			forceParse: 0,
			startDate:new Date()
		}).on('changeDate',function(event) {
			var startTime = $('#newStartTime').val();
			$("#newEndTimeWidget").datetimepicker('setStartDate',startTime);
			$('#newStartTimeWidget').datetimepicker('hide');
		});

		$('#newEndTimeWidget').datetimepicker({
			language:  'zh-CN',
			weekStart: 1,
			todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			minView: 0,
			maxView: 2,
			forceParse: 0,
			startDate:new Date()
		}).on('changeDate', function(event) {
			var endTime = $('#newEndTime').val();
			$("#newStartTimeWidget").datetimepicker('setEndDate',endTime);
			$('#newStartTimeWidget').datetimepicker('hide');
		});



		//新建投票参数
		$scope.newVoteParams = {
			"vote":{
				"voteName":"",
				"sendCount":0,
				"logo_path":"",
				"exp":"",
				"startTime":"",
				"endTime":""
			},
			"channels":[{
				"channelName":"",
				"channelDesc":"",
				"channelRatio":""
			}]
		}
		$('#newVoteModal').modal('show');
		$scope.saveFlag = 0;
		setTimeout(function(){
			$('#voteGroup').selectpicker('refresh');
		},500);
		
	}

	function dateFormat(time){
		var date = new Date(time);
		var yyyy = date.getFullYear();
		var MM = date.getMonth()+1>9?date.getMonth()+1:"0"+(date.getMonth()+1);
		var dd = date.getDate()>9?date.getDate():"0"+date.getDate();
		var hh = date.getHours()>9?date.getHours():"0"+date.getHours();
		var mm = date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes();
		var str = yyyy+"-"+MM+"-"+dd+" "+hh+":"+mm;
		return str;
	}


	
	//修改投票模态框
	$scope.modifyVoteModal=function(id){

		$scope.filenames = "";
		$scope.isSelectImg = 0;
		img_uploader.clearQueue();
		$('#modifyInfoForm')[0].reset();

		$('#mdfStartTimeWidget').datetimepicker('remove');
		$('#mdfEndTimeWidget').datetimepicker('remove');

		$('#mdfStartTimeWidget').datetimepicker({
			language:  'zh-CN',
			weekStart: 1,
			todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			minView: 0,
			maxView: 2,
			forceParse: 0,
			startDate:new Date()
		}).on('changeDate',function(event) {
			var startTime = $('#mdfStartTime').val();
			$("#mdfEndTimeWidget").datetimepicker('setStartDate',startTime);
			$('#mdfStartTimeWidget').datetimepicker('hide');
		});

		$('#mdfEndTimeWidget').datetimepicker({
			language:  'zh-CN',
			weekStart: 1,
			todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			minView: 0,
			maxView: 2,
			forceParse: 0,
			startDate:new Date()
		}).on('changeDate', function(event) {
			var endTime = $('#mdfEndTime').val();
			$("#mdfStartTimeWidget").datetimepicker('setEndDate',endTime);
			$('#mdfStartTimeWidget').datetimepicker('hide');
		});



		$scope.modifyVoteParams = {
			"vote":{
				"voteID":0,
				"voteName":"",
				"sendCount":0,
				"logo_path":"",
				"exp":"",
				"startTime":"",
				"endTime":""
			},
			"channels":[]
		}
		var voteItem = {};
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/vote/findVoteByQuery",
			data:{query: {voteName: "", createMan: 0, voteId: id}}
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				var voteItem = resp.data.data.sendData[0];
				$scope.modifyVoteParams.vote.voteID = id;
				$scope.modifyVoteParams.vote.voteName = voteItem.votename;
				$scope.modifyVoteParams.vote.exp = voteItem.exp;
				$scope.modifyVoteParams.vote.startTime = dateFormat(voteItem.starttime.time);
				$scope.modifyVoteParams.vote.endTime = dateFormat(voteItem.endtime.time);
				for(var i in voteItem.channelArr){
					$scope.modifyVoteParams.channels.push({
						"channelName":voteItem.channelArr[i].channelname,
						"channelDesc":voteItem.channelArr[i].channeldesc,
						"channelRatio":voteItem.channelArr[i].channelratio,
						"channelID":voteItem.channelArr[i].channelid
					});
				}
				for(var j in $scope.modifyVoteParams.channels){
					$scope.modifyVoteParams.channels[j].uploader = $scope.newUploader($scope.modifyVoteParams.vote.voteID,$scope.modifyVoteParams.channels[j].channelID);
				}
				$("#mdfEndTimeWidget").datetimepicker('setStartDate',$scope.modifyVoteParams.vote.startTime);
				$("#mdfStartTimeWidget").datetimepicker('setEndDate', $scope.modifyVoteParams.vote.endTime);
			}else{
				console.log('errdata'+resp.data);
			}
				
			
		});

		$('#modifyVoteModal').modal('show');
		setTimeout(function(){
			$('#voteGroup').selectpicker('refresh');
		},500);
	}


	//查询投票活动参数
	$scope.queryData = {
		"query":{
			"voteName":"",
			"createMan":0,
			"voteId":0
		}
	};
	//查询投票活动
	$scope.findAllActivities=function(type,voteName,creator){
		$scope.queryData.query.voteName = "";
		$scope.queryData.query.createMan = 0;
		$scope.queryData.query.voteId = 0;
		if(typeof(type)!='undefined' && type!=null){
			$scope.type = type;		
		}
		if(typeof(voteName)!='undefined' && voteName!=null){
			$scope.queryData.query.voteName = voteName;
		}
		if(typeof(creator)!='undefined' && creator!=null && creator!=""){
			$scope.queryData.query.createMan = creator;
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
			$scope.notStartActivities=[];
			if(resp.data.e.code == 0){
				$scope.activities = resp.data.data.sendData;
				for( var i in $scope.activities ){
					if($scope.activities[i].state == 1){
						$scope.notStartActivities.push($scope.activities[i]);
					}else if($scope.activities[i].state == 2){
						$scope.goingActivities.push($scope.activities[i]);
					}else if($scope.activities[i].state == 3){
						$scope.endedActivities.push($scope.activities[i]);
					}
				}
				if($scope.type == 1){
					$scope.activities = $scope.goingActivities;
				}else if($scope.type == 2){
					$scope.activities = $scope.notStartActivities;
				}else if($scope.type == 3){
					$scope.activities = $scope.endedActivities;
				}
				console.log($scope.activities);
			}else{
				console.log('errdata'+resp.data);
			}
				
			
		});
	}
	$scope.findAllActivities(1);

	//删除投票
	$scope.deleteVote=function(voteId){
		if(!confirm("确认删除投票？")){
			return;
		}
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/vote/delVote/"+voteId
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				alert("删除成功");
				$scope.findAllActivities(0);
			}else{
				console.log('errdata'+resp.data);
				alert(resp.data.e.desc);
			}	
		});
	}

	//修改投票
	$scope.modifyVote=function(){
		var modifyParams = {vote: {}, channels: []};
		modifyParams.vote = $scope.modifyVoteParams.vote;
		for(var i in $scope.modifyVoteParams.channels){
			var channel = {};
			channel.channelDesc = $scope.modifyVoteParams.channels[i].channelDesc;
			channel.channelID = $scope.modifyVoteParams.channels[i].channelID;
			channel.channelName = $scope.modifyVoteParams.channels[i].channelName;
			channel.channelRatio = $scope.modifyVoteParams.channels[i].channelRatio;
			modifyParams.channels.push(channel);
		}
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/vote/addOrUpdataVote",
			data:modifyParams
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				alert("修改成功");
				$scope.findAllActivities(0);
				$('#modifyVoteModal').modal('hide');
			}else{
				console.log('errdata'+resp.data);
				alert("修改失败");
			}	
		});
	}
	
	//获取所有创建人
	$scope.$on('creators',function(event,data){
		$scope.creators = data;
	});

	//新建投票参数
	// $scope.newVoteParams = {
	// 	"vote":{
	// 		"voteName":"",
	// 		"sendCount":0,
	// 		"logo_path":"",
	// 		"exp":"",
	// 		"startTime":"",
	// 		"endTime":""
	// 	},
	// 	"channels":[{
	// 		"channelName":"",
	// 		"channelDesc":"",
	// 		"channelRatio":""
	// 	}]
	// }
	//保存新投票信息
	$scope.saveNewVote=function(){
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/vote/addOrUpdataVote",
			data:$scope.newVoteParams
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				alert("保存成功");
				$scope.saveFlag = 1;
				$scope.newVote = resp.data.data.sendData;
				for(var i in $scope.newVote.channelArr){
					$scope.newVote.channelArr[i].uploader = $scope.newUploader($scope.newVote.voteObj.voteId,$scope.newVote.channelArr[i].channelID);
				}
				console.log($scope.newVote);
			}else{
				console.log('errdata'+resp.data);
				alert(response.e.desc);
			}	
		});
	}
	//添加新频道
	$scope.addChannel = function(){
		var channel = {
			"channelName":"",
			"channelDesc":"",
			"channelRatio":""
		}
		$scope.newVoteParams.channels.push(channel);
	}
	//删除新频道
	$scope.delChannel = function(){
		$scope.newVoteParams.channels.pop();
	}

	//发布投票参数
	$scope.releaseVoteParams = {
		"voteid": 0,
		"voteName":"",
		"channels":[],
		"arr": []
	}

	/*****************************图片批量导入（开始）************************/
	$scope.filenames = "";
	$scope.isSelectImg = 0;
	//打开图片导入文件窗口
	$scope.openImgImport = function(){
		$('#userPhotoFile').click();
		$scope.filenames = "";
		$scope.isSelectImg = 0;
		img_uploader.clearQueue();
	}


	//图片批量导入
	$scope.importImgs = function() {
		$scope.imgUploadSuccess = 0;
		for(var i = 0 ;i < img_uploader.queue.length;i++){
			img_uploader.queue[i].url = BACKSTAGESERVERADDRESS.ADDRESS+"/statistical/importVoteoptionPhoto/"+img_uploader.queue[i].file.name;
			img_uploader.queue[i].upload();
		}
		console.log($scope.img_uploader);
	};
	
	//检查文件名是否符合要求
	function compareName(filename){
		var suffixnames = ['jpg','jpeg','gif','png','bmp'];
		var suffixname = filename.substring(filename.lastIndexOf(".")+1);
		var flag = 0;
		for(var j=0;j<suffixnames.length;j++){
			if(suffixname != suffixnames[j]){
				flag++;
			}
		}
		return flag == suffixnames.length ? false : true;
	}
	//初始化图片上传对象
	var img_uploader = $scope.img_uploader = new FileUploader({
		method: 'POST',
		//url:BACKSTAGESERVERADDRESS.ADDRESS+"/statistical/importVoteoptionPhoto/"+photoName,
		data: '',
		headers: {'sessionid': $rootScope.user.sid}
	});
	img_uploader.onWhenAddingFileFailed = function (item/*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item);
    };
    img_uploader.onAfterAddingFile = function (fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    //选择附件时操作
    img_uploader.onAfterAddingAll = function (addedFileItems) {
    	var filename = "";
    	var filenames = [];
    	for(var i=0;i<img_uploader.queue.length;i++){
    		filename = img_uploader.queue[i].file.name;
    		if(!compareName(filename)){
    			alert("文件不符合要求");
    			img_uploader.clearQueue();
    		}else{
				filenames.push(filename);
    		}
        }
        $scope.filenames = filenames.join("、");
        $scope.isSelectImg = 1;
        console.info('onAfterAddingAll', addedFileItems);
    };
    img_uploader.onBeforeUploadItem = function (item) {
        console.info('onBeforeUploadItem', item);
    };
    img_uploader.onProgressItem = function (fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);

    };
    img_uploader.onProgressAll = function (progress) {
        console.info('onProgressAll', progress);
    };
	img_uploader.onCompleteItem = function (fileItem, response, status, headers) {
		if(response.e.code == 0) {
			$scope.imgUploadSuccess++;
			if($scope.imgUploadSuccess == img_uploader.queue.length){
				$http({
					method:'POST',
					url:BACKSTAGESERVERADDRESS.ADDRESS+"/statistical/importPhotot"
				}).then(function(resp) {
					console.log(resp.data);
					if(resp.data.e.code == 0){
						alert("导入图片成功");
						img_uploader.clearQueue();
					}else{
						alert("导入失败");
						console.log('errdata'+resp.data);
						img_uploader.clearQueue();
					}
				});		
			}
		} else {
			alert(response.e.desc);
			this.clearQueue();
			console.log(response.e.desc);
		}
	}

	/*****************************图片批量导入（结束）************************/	

	//发布新投票信息
	$scope.releaseNewVote=function(){
		$scope.releaseVoteParams = {
			"voteid": 0,
			"voteName":"",
			"channels":[],
			"arr": []
		}
		$scope.releaseVoteParams.voteid = $scope.newVote.voteObj.voteId;
		for(var i in $scope.voteGroups){
			if($scope.voteGroups[i].groupId == 0){
				$scope.releaseVoteParams.voteName = $scope.newVote.voteObj.voteName;
				$scope.releaseVoteParams.channels = $scope.voteGroups[i].channels;
			}else{
				$scope.releaseVoteParams.arr.push($scope.voteGroups[i]);
			}

		}

		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/groupVoteRela/addOrUpdataGroupVoteRela",
			data:$scope.releaseVoteParams
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				$('#newVoteModal').modal('hide');
				alert("投票发布成功");
				$scope.findAllActivities(0);
			}else{
				console.log('errdata'+resp.data);
				alert(response.e.desc);
			}	
		});
	}

	//新建uploader
	$scope.newUploader = function(voteId,channelId){
		var uploader = new FileUploader({
			method: 'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/statistical/importVoteoption/"+voteId+"/"+channelId,
			data: '',
			headers: {'sessionid': $rootScope.user.sid}
		});
		uploader.onWhenAddingFileFailed = function (item/*{File|FileLikeObject}*/, filter, options) {
			console.info('onWhenAddingFileFailed', item, filter, options);
		};
		uploader.onCompleteItem = function (fileItem, response, status, headers) {
			if(response.e.code == 0) {
				alert('导入成功');
				$('#importBtn'+channelId).attr('disabled',"true");
				this.clearQueue();
			} else {
				console.log(response.e.desc);
				alert(response.e.desc);
				this.clearQueue();
			}
		}
		return uploader;
	}
	//打开导入文件窗口
	$scope.openImport = function(channelId){

		$('#objFile'+channelId).bind('change', function() {
			var pos = this.value.lastIndexOf("\\");
			var fileName = this.value.substring(pos + 1)
			$('#fileName'+channelId).html(fileName);
			if(fileName != ""){
				$('#importBtn'+channelId).show();
			}
		});
		
		$('#objFile'+channelId).click();
	}

	//投票对象批量导入
	$scope.importObjs = function(uploader) {
		uploader.queue[0].upload();
	};

	//查找所有用户组
	$scope.findUserGroup=function(){
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/group/findGroup",
			data:{"page":0,"rows":0,"query":{"groupName":"","createMan":0}}
		}).then(function(resp) {
			console.log(resp.data);
			$scope.userGroups = [];
			if(resp.data.e.code == 0){
				$scope.userGroups = resp.data.data.sendData;
			}else{
				console.log('errdata'+resp.data);
			}
				
			
		});
	}
	$scope.findUserGroup();
	//{"groupId":1,"maxCount":1,"channelId":1,2,3}
	//当选择组多选框改变
	$scope.voteGroups = [];
	//$scope.groupArr = [];
	$scope.selectGroup = function(){
		var selectGroups = [];
		//var groupArr = [];
		//var group = {};
		var groupObj = {};
		for(var i in $scope.voteGroup){

			groupObj = {
				"groupId":0,
				"groupName":"",
				"channels":[],
				"channelIds":[]
			};

			if($scope.voteGroup[i] == 0){
				groupObj.groupName = "全部用户";
				groupObj.groupId = 0;
				selectGroups.push(groupObj);
				continue;
			}

			for(var j in $scope.userGroups){
				if($scope.userGroups[j].groupid == $scope.voteGroup[i]){
					//group.groupname = $scope.userGroups[j].groupname;
					//group.groupid = $scope.userGroups[j].groupid;
					//selectGroups.push(group);
					groupObj.groupId = $scope.userGroups[j].groupid;
					groupObj.groupName = $scope.userGroups[j].groupname;
					//groupArr.push(groupObj);
					selectGroups.push(groupObj);
				}
			}
		}
		$scope.voteGroups = selectGroups;
		//$scope.groupArr = groupArr;
		$scope.configChannelSelectpicker();
	}

	//当选择频道多选框改变

	$scope.selectChannel = function(){
		var channel = {};
		var channels = [];
		for(var i in $scope.voteGroups){
			channels = [];
			for(var j in $scope.voteGroups[i].channelIds){
				channel = {
					"channelName":"",
					"channelId":0,
					"maxCount":1
				};
				channel.channelId = $scope.voteGroups[i].channelIds[j];
				for(var k in $scope.newVote.channelArr){
					if(channel.channelId == $scope.newVote.channelArr[k].channelID){
						channel.channelName = $scope.newVote.channelArr[k].channelName;
					}
				}
				
				channels.push(channel);
			}
			$scope.voteGroups[i].channels = channels;
		}
	}

	//组下拉多选框配置
	$scope.configGroupSelectpicker=function(){
		setTimeout(function(){
			$('#voteGroup').selectpicker({
				'actionsBox': true,
				'deselectAllText':'全不选',
				'selectAllText':'全选',
				'noneSelectedText':'投票人添加',
				'selectedTextFormat':'count',
				'countSelectedText':'{0}组投票人已选择',
				'liveSearch':true,
				'liveSearchNormalize':true,
				'liveSearchPlaceholder':"搜索"
			});
			//$('.selectpicker').selectpicker('val', [1,8]);

		},1000);
	}

	//频道下拉多选框配置
	$scope.configChannelSelectpicker=function(){
		setTimeout(function(){
			$('.voteChannel').selectpicker({
				'actionsBox': true,
				'deselectAllText':'全不选',
				'selectAllText':'全选',
				'noneSelectedText':'投票人添加',
				'selectedTextFormat':'count',
				'countSelectedText':'{0}组投票人已选择',
				'liveSearch':true,
				'liveSearchNormalize':true,
				'liveSearchPlaceholder':"搜索"
			});
			//$('.selectpicker').selectpicker('val', [1,8]);

		},500);
	}

	$scope.$on('$viewContentLoaded', function() {  
		$scope.configGroupSelectpicker();
	});
}]);

