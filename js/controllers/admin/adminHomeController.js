App.controller('adminHomeCtrl', ['$scope','$http','$state', function($scope,$http,$state){
	var chartBar = null;
	//绘制柱状图
		

	$scope.barChart=function(){

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

		var bar = document.getElementById("barChart");
		var width = $scope.chartdata_.labels.length*100;
		if(bar != null){
			bar.setAttribute("width",width);
			var ctx = bar.getContext("2d");
			var chartBar = new Chart(ctx).Bar($scope.chartdata_);		
			initEvent(chartBar, clickCall);
		}

		var clickCall = function(evt){
			var activeBar = chartBar.getBarSingleAtEvent(evt);
			if ( activeBar !== null )
				alert(activeBar.label + ": " + activeBar.barItemName + " ____ " + activeBar.value);
		}

		
		
	}

	//查找所有用户组
	$scope.homeFindUserGroup=function(){
		$scope.chartdata_ = {
			labels : [],
			datasets : [
				{
					barItemName: "",
					fillColor : "#7fc241",
					data : []
				}
			]
		};
		$http({
			method:'POST',
			url:BACKSTAGESERVERADDRESS.ADDRESS+"/group/findGroup",
			data:{page: 0, rows: 0, query: {groupName: "", createMan: 0}}
		}).then(function(resp) {
			console.log(resp.data);
			var userGroups = [];
			if(resp.data.e.code == 0){
				userGroups = resp.data.data.sendData;
				for(var i in userGroups){
					$scope.chartdata_.labels.push(userGroups[i].groupname);
					$scope.chartdata_.datasets[0].data.push(userGroups[i].usernum);
				}
				console.log($scope.chartdata_);
				$scope.barChart();	
			}else{
				console.log('errdata'+resp.data);
			}
				
			
		});
	}
	$scope.homeFindUserGroup();

	// $scope.$on('$viewContentLoaded', function() {
	// 	//$scope.homeFindUserGroup();
		
	// });
	
}]);

