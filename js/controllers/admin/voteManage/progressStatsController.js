App.controller('progressStatsCtrl', ['$scope','$http', '$stateParams', '$location',function($scope,$http,$stateParams,$location){
	
	$scope.chartdata = [
		{
			label: "已完成投票",
			value: 0,
			color:"#7fc241"
		},
		{
			label: "未完成投票",
			value : 0,
			color : "#5bc0de"
		},
		{
			label: "未投票",
			value : 0,
			color : "#116ed6"
		}			
	];

	//查询投票人信息
	$scope.findVotePeople = function(type){
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/statistical/statisticalReport",
			data:{"page":1,"rows":0,"query":{"voteId":$scope.voteId,"index":type}}
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				$scope.reportUsers = resp.data.data.sendData;
			}else{
				console.log('errdata'+resp.data);
			}
				
			
		});
	}

	//查询投票进度统计
	$scope.findVoteProgress=function(){
		$scope.findVotePeople(0);
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/statistical/statisticalReportTitel",
			data:{"page":1,"rows":0,"query":{"voteId":$scope.voteId}}
		}).then(function(resp) {
			console.log(resp.data);
			if(resp.data.e.code == 0){
				$scope.reportTitle = resp.data.data.sendData;
				$scope.chartdata[0].value = $scope.reportTitle.all_vote_num;
				$scope.chartdata[1].value = $scope.reportTitle.has_vote_num;
				$scope.chartdata[2].value = $scope.reportTitle.not_vote_num;

				$scope.pieChart();
			}else{
				console.log('errdata'+resp.data);
			}
				
			
		});
	}
	$scope.findVoteProgress();



	//绘制饼图
	$scope.pieChart=function(){
		var initEvent = function(chart, handler) {
			var method = handler;
			var eventType = "click";
			var node = chart.chart.canvas;
							
			if (node.addEventListener) {
				node.addEventListener(eventType, method);
			} else if (node.attachEvent) {
				node.attachEvent("on" + eventType, method);
			} else {
				node["on" + eventType] = method;
			}
		}

		var ctx = document.getElementById("pieChart").getContext("2d");
		var chartPie = new Chart(ctx).Pie($scope.chartdata , {segmentShowStroke : false, showTooltips : 1});
		initEvent(chartPie, clickCall);

		var clickCall = function(evt){
		var segments = chartPie.getSegmentsAtEvent(evt);	
			if ( segments.length > 0 ) {
				var segment = segments[0];
				alert( segment.label + ": " + segment.value);
			}
		}
	}
	
	
		
}]);

