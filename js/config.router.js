/**
 * Created by 锟侥碉拷锟斤拷 on 2016/1/25.
 */
App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
	function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
		'use strict';

		// Set the following to true to enable the HTML5 Mode
		$locationProvider.html5Mode(false);

		
		$urlRouterProvider.otherwise('/login');
		$urlRouterProvider
			.when("", "/login")
			.when("/user", "/user/home")
			.when("/admin", "/admin/home")
			;

		//
		// Application Routes
		// -----------------------------------
		$stateProvider
			// .state('app', {
			//     url: '/app',
			//     abstract: true,
			//     templateUrl: helper.basepath('partials/app.html'),
			//     resolve: helper.resolveFor('appCtrl','fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl')
			// })
			.state('login', {
				url: '/login',
				templateUrl: helper.basepath('login/login.html'),
				controller: 'loginCtrl',
				resolve: helper.resolveFor('loginCtrl')
			})
			.state('personal', {
				url: '/personal',
				templateUrl: helper.basepath('personal/personal.html'),
				controller: 'personalCtrl',
				resolve: helper.resolveFor('personalCtrl')
			})
			.state('personal.personInfo', {
				url: '/personInfo',
				templateUrl: helper.basepath('personal/personInfo.html')
			})
			.state('personal.password', {
				url: '/password',
				templateUrl: helper.basepath('personal/password.html')
			})
			.state('user', {
				url: '/user',
				//templateUrl: helper.basepath('user/user.html'),
				template: '<div ui-view></div>',
				controller: 'userCtrl',
				resolve: helper.resolveFor('userCtrl')

			})
			.state('user.home', {
				url: '/home',
				templateUrl: helper.basepath('user/home.html'),
				controller: 'userhomeCtrl',
				resolve: helper.resolveFor('userhomeCtrl')

			})
			.state('user.vote', {
				url: '/vote/:voteid',
				templateUrl: helper.basepath('user/vote.html'),
				controller: 'voteCtrl',
				resolve: helper.resolveFor('voteCtrl')

			})
			.state('admin', {
				url: '/admin',
				templateUrl: helper.basepath('admin/admin.html'),
				controller: 'adminCtrl',
				resolve: helper.resolveFor('adminCtrl')
			})
			.state('admin.home', {
				url: '/home',
				templateUrl: helper.basepath('admin/home.html'),
				controller: 'adminHomeCtrl',
				resolve: helper.resolveFor('adminHomeCtrl')
			})
			.state('admin.adminManage', {
				url: '/adminManage',
				templateUrl: helper.basepath('admin/adminManage/adminManage.html'),
				controller: 'adminManageCtrl',
				resolve: helper.resolveFor('adminManageCtrl')
			})
			// .state('admin.templateManage', {
			// 	url: '/templateManage',
			// 	templateUrl: helper.basepath('admin/templateManage/templateManage.html'),
			// 	controller: 'templateManageCtrl',
			// 	resolve: helper.resolveFor('templateManageCtrl')
			// })
			// .state('admin.templateDetail', {
			// 	url: '/templateDetail',
			// 	templateUrl: helper.basepath('admin/templateManage/templateDetail.html'),
			// 	controller: 'templateDetailCtrl',
			// 	resolve: helper.resolveFor('templateDetailCtrl')
			// })
			.state('admin.userManage', {
				url: '/userManage',
				templateUrl: helper.basepath('admin/userManage/userManage.html'),
				controller: 'userManageCtrl',
				resolve: helper.resolveFor('userManageCtrl')
			})
			.state('admin.userDetail', {
				url: '/userDetail/:groupid',
				templateUrl: helper.basepath('admin/userManage/userDetail.html'),
				controller: 'userDetailCtrl',
				resolve: helper.resolveFor('userDetailCtrl')
			})
			.state('admin.voteManage', {
				url: '/voteManage',
				templateUrl: helper.basepath('admin/voteManage/voteManage.html'),
				controller: 'voteManageCtrl',
				resolve: helper.resolveFor('voteManageCtrl')
			})
			.state('admin.voteDetail', {
				url: '/voteDetail/:voteid',
				templateUrl: helper.basepath('admin/voteManage/voteDetail.html'),
				controller: 'voteDetailCtrl',
				resolve: helper.resolveFor('voteDetailCtrl')
			})
			.state('admin.voteDetail.detailInfo', {
				url: '/detailInfo',
				templateUrl: helper.basepath('admin/voteManage/detailInfo.html')
			})
			.state('admin.voteDetail.progressStats', {
				url: '/progressStats',
				templateUrl: helper.basepath('admin/voteManage/progressStats.html'),
				controller: 'progressStatsCtrl',
				resolve: helper.resolveFor('progressStatsCtrl')
			})
			.state('admin.voteDetail.resultStats', {
				url: '/resultStats',
				templateUrl: helper.basepath('admin/voteManage/resultStats.html')
			})
			;


	}]).config(['$ocLazyLoadProvider', 'APP_REQUIRES', function ($ocLazyLoadProvider, APP_REQUIRES) {
	'use strict';

	// Lazy Load modules configuration
	$ocLazyLoadProvider.config({
		debug: false,
		events: true,
		modules: APP_REQUIRES.modules
	});

}]).config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
	function ( $controllerProvider, $compileProvider, $filterProvider, $provide) {
		'use strict';
		// registering components after bootstrap
		App.controller = $controllerProvider.register;
		App.directive  = $compileProvider.directive;
		App.filter     = $filterProvider.register;
		App.factory    = $provide.factory;
		App.service    = $provide.service;
		App.constant   = $provide.constant;
		App.value      = $provide.value;
}])
//     }]).config(['$translateProvider', function ($translateProvider) {

//     $translateProvider.useStaticFilesLoader({
//         prefix : 'app/i18n/',
//         suffix : '.json'
//     });
//     $translateProvider.preferredLanguage('en');
//     $translateProvider.useLocalStorage();
//     $translateProvider.usePostCompiling(true);

// }]).config(['tmhDynamicLocaleProvider', function (tmhDynamicLocaleProvider) {

//     tmhDynamicLocaleProvider.localeLocationPattern('vendor/angular-i18n/angular-locale_{{locale}}.js');

//     // tmhDynamicLocaleProvider.useStorage('$cookieStore');

// }]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {

//     cfpLoadingBarProvider.includeBar = true;
//     cfpLoadingBarProvider.includeSpinner = false;
//     cfpLoadingBarProvider.latencyThreshold = 500;
//     cfpLoadingBarProvider.parentSelector = '.wrapper > section';

// }]).config(['$tooltipProvider', function ($tooltipProvider) {

//     $tooltipProvider.options({appendToBody: true});

// }])