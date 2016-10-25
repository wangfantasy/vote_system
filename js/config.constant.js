/**
 * Created by 饶道坤 on 2016/1/25.
 */
/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/
App.constant('AUTH_EVENTS', {
	loginSuccess: 'auth-login-success',
	loginFailed: 'auth-login-failed',
	logoutSuccess: 'auth-logout-success',
	sessionTimeout: 'auth-session-timeout',
	notAuthenticated: 'auth-not-authenticated',
	waitAuthenticated: 'wait-authenticated'
});

App.constant('APP_MEDIAQUERY', {
	'desktopXL': 1200,
	'desktop': 992,
	'tablet': 768,
	'mobile': 480
});

App.constant('APP_COLORS', {
		'primary':                '#5d9cec',
		'success':                '#27c24c',
		'info':                   '#23b7e5',
		'warning':                '#ff902b',
		'danger':                 '#f05050',
		'inverse':                '#131e26',
		'green':                  '#37bc9b',
		'pink':                   '#f532e5',
		'purple':                 '#7266ba',
		'dark':                   '#3a3f51',
		'yellow':                 '#fad732',
		'gray-darker':            '#232735',
		'gray-dark':              '#3a3f51',
		'gray':                   '#dde6e9',
		'gray-light':             '#e4eaec',
		'gray-lighter':           '#edf1f2'
	})
	.constant('APP_MEDIAQUERY', {
		'desktopLG':             1200,
		'desktop':                992,
		'tablet':                 768,
		'mobile':                 480
	})
	.constant('APP_REQUIRES', {
		// jQuery based and standalone scripts
		scripts: {
			'whirl':['app/vendor/whirl/dist/whirl.css'],
			'classyloader':['app/vendor/jquery-classyloader/js/jquery.classyloader.min.js'],

			'animo':['app/vendor/animo.js/animo.js'],

			'fastclick':['app/vendor/fastclick/lib/fastclick.js'],

			'modernizr':['app/vendor/modernizr/modernizr.js'],

			'animate':['app/vendor/animate.css/animate.min.css'],

			'icons':['app/vendor/skycons/skycons.js',

								   'app/vendor/fontawesome/css/font-awesome.min.css',

								   'app/vendor/simple-line-icons/css/simple-line-icons.css',

								   'app/vendor/weather-icons/css/weather-icons.min.css'],

			'sparklines':['app/vendor/sparklines/jquery.sparkline.min.js'],

			'wysiwyg':['app/vendor/bootstrap-wysiwyg/bootstrap-wysiwyg.js',

								   'app/vendor/bootstrap-wysiwyg/external/jquery.hotkeys.js'],

			'slimscroll':['app/vendor/slimScroll/jquery.slimscroll.min.js'],

			'screenfull':['app/vendor/screenfull/dist/screenfull.js'],

			'vector-map':[
									'app/vendor/ika.jvectormap/jquery-jvectormap-1.2.2.min.js',
									'app/vendor/ika.jvectormap/jquery-jvectormap-1.2.2.css'],
			'vector-map-maps':[
								   'app/vendor/ika.jvectormap/jquery-jvectormap-world-mill-en.js',
								   'app/vendor/ika.jvectormap/jquery-jvectormap-us-mill-en.js'
								],

			'loadGoogleMapsJS':['app/vendor/gmap/load-google-maps.js'],

			'flot-chart':['app/vendor/Flot/jquery.flot.js'],

			'flot-chart-plugins': [
								'app/vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
								'app/vendor/Flot/jquery.flot.resize.js',
								'app/vendor/Flot/jquery.flot.pie.js',
								'app/vendor/Flot/jquery.flot.time.js',
								'app/vendor/Flot/jquery.flot.categories.js',
								'app/vendor/flot-spline/js/jquery.flot.spline.min.js'
			],
			// jquery core and widgets
			'jquery-ui':[
				'app/vendor/jquery-ui/ui/core.js',
				'app/vendor/jquery-ui/ui/widget.js'
			],

			// loads only jquery required modules and touch support
			'jquery-ui-widgets':  [
								'app/vendor/jquery-ui/ui/core.js',
								'app/vendor/jquery-ui/ui/widget.js',
								'app/vendor/jquery-ui/ui/mouse.js',
								'app/vendor/jquery-ui/ui/draggable.js',
								'app/vendor/jquery-ui/ui/droppable.js',
								'app/vendor/jquery-ui/ui/sortable.js',
								'app/vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js'
			],

			'moment' :['app/vendor/moment/min/moment-with-locales.min.js'],

			'inputmask':['app/vendor/jquery.inputmask/dist/jquery.inputmask.bundle.min.js'],

			'flatdoc':['app/vendor/flatdoc/flatdoc.js'],

			'codemirror':[
								'app/vendor/codemirror/lib/codemirror.js',
								'app/vendor/codemirror/lib/codemirror.css'
			],
			// modes for common web files
			'codemirror-modes-web':[
						'app/vendor/codemirror/mode/javascript/javascript.js',
						'app/vendor/codemirror/mode/xml/xml.js',
						'app/vendor/codemirror/mode/htmlmixed/htmlmixed.js',
						'app/vendor/codemirror/mode/css/css.js'
			],

			'taginput':[
						'app/vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
						'app/vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js'
			],

			'filestyle':['app/vendor/bootstrap-filestyle/src/bootstrap-filestyle.js'],

			'parsley':['app/vendor/parsleyjs/dist/parsley.min.js'],

			'fullcalendar': [
						'app/vendor/fullcalendar/dist/fullcalendar.min.js',
						'app/vendor/fullcalendar/dist/fullcalendar.css'
			],
			'gcal':['app/vendor/fullcalendar/dist/gcal.js'],

			'chartjs':['app/vendor/Chart.js/Chart.js'],

			'morris':[
					'app/vendor/raphael/raphael.js',
					'app/vendor/morris.js/morris.js',
					'app/vendor/morris.js/morris.css'
			],

			'loaders.css': ['app/vendor/loaders.css/loaders.css'],

			'spinkit':['app/vendor/spinkit/css/spinkit.css'],

			'appCtrl':['app/js/controllers/AppController.js'],

			'bootstrap_js':[
				'app/js/plugin/bootstrap/js/bootstrap.js',
				'app/js/plugin/bootstrap/js/bootstrap.min.js'
			],

			'bootstrap_css':[
				'app/js/plugin/bootstrap/css/bootstrap.css',
				'app/js/plugin/bootstrap/css/bootstrap.min.css',
				'app/js/plugin/bootstrap/css/bootstrap-theme.css',
				'app/js/plugin/bootstrap/css/bootstrap-theme.min.css'
			],
			'bootstrap_model':[
				//'app/js/plugin/bootstrap_model/bootstrap.min.css',
				'app/js/plugin/bootstrap_model/bootstrap.min.js',
				'app/js/plugin/bootstrap_model/jquery.min.js'
			],

			//登陆页
			'loginCtrl':[
				'js/controllers/login/loginController.js',
				'css/login/login.css'
			],
			//个人中心页
			'personalCtrl':[
				'js/controllers/personal/personalController.js',
				'css/user/user.css'
			],
			//用户页
			'userCtrl':[
				'js/controllers/user/userController.js',
				'css/user/user.css'
			],
			//用户首页
			'userhomeCtrl':[
				'js/controllers/user/userhomeController.js'
			],
			//用户投票页
			'voteCtrl':[
				'js/controllers/user/voteController.js'
			],
			//管理员页
			'adminCtrl':[
				'js/controllers/admin/adminController.js',
				'css/admin/admin.css'
			],
			//管理员首页
			'adminHomeCtrl':[
				'js/controllers/admin/adminHomeController.js'
			],
			//管理员管理页
			'adminManageCtrl':[
				'js/controllers/admin/adminManage/adminManageController.js'
			],
			//用户组管理页
			'userManageCtrl':[
				'js/controllers/admin/userManage/userManageController.js'
			],
			//用户组详情页
			'userDetailCtrl':[
				'js/controllers/admin/userManage/userDetailController.js'
			],
			//投票管理页
			'voteManageCtrl':[
				'js/controllers/admin/voteManage/voteManageController.js'
			],
			//投票详情页
			'voteDetailCtrl':[
				'js/controllers/admin/voteManage/voteDetailController.js'
			],
			//进度统计页
			'progressStatsCtrl':[
				'js/controllers/admin/voteManage/progressStatsController.js'
			]


		},









		// Angular based script (use the right module name)
		modules: [
				{
					name: 'toaster',
					files: [
						'app/vendor/angularjs-toaster/toaster.js',
						'app/vendor/angularjs-toaster/toaster.css'
					]},
				{
					name: 'localytics.directives',
					files: [
						'app/vendor/chosen_v1.2.0/chosen.jquery.min.js',
						'app/vendor/chosen_v1.2.0/chosen.min.css',
						'app/vendor/angular-chosen-localytics/chosen.js'
					]},
				{
					name: 'ngDialog',
					files: [
						'app/vendor/ngDialog/js/ngDialog.min.js',
						'app/vendor/ngDialog/css/ngDialog.min.css',
						'app/vendor/ngDialog/css/ngDialog-theme-default.min.css'
					]},
				{
					name: 'ngWig',
					files: ['app/vendor/ngWig/dist/ng-wig.min.js']},
				{
					name: 'ngTable',
					files: [
						'app/vendor/ng-table/dist/ng-table.min.js',
						'app/vendor/ng-table/dist/ng-table.min.css'
					]},
				{
					name: 'ngTableExport',
					files: ['app/vendor/ng-table-export/ng-table-export.js']},
				{
					name: 'angularBootstrapNavTree',
					files: [
						'app/vendor/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
						'app/vendor/angular-bootstrap-nav-tree/dist/abn_tree.css'
					]},
				{
					name: 'htmlSortable',
					files: [
						'app/vendor/html.sortable/dist/html.sortable.js',
						'app/vendor/html.sortable/dist/html.sortable.angular.js'
					]},
				{
					name: 'xeditable',
					files: [
						'app/vendor/angular-xeditable/dist/js/xeditable.js',
						'app/vendor/angular-xeditable/dist/css/xeditable.css'
					]},
				{
					name: 'angularFileUpload',
					files: ['app/vendor/angular-file-upload/angular-file-upload.js']},
				{
					name: 'ngImgCrop',
					files: [
						'app/vendor/ng-img-crop/compile/unminified/ng-img-crop.js',
						'app/vendor/ng-img-crop/compile/unminified/ng-img-crop.css'
					]},
				{
					name: 'ui.select',
					files: [
						'app/vendor/angular-ui-select/dist/select.js',
						'app/vendor/angular-ui-select/dist/select.css'
					]},
				{
					name: 'ui.codemirror',
					files: ['app/vendor/angular-ui-codemirror/ui-codemirror.js']},
				{
					name: 'angular-carousel',
					files: [
						'app/vendor/angular-carousel/dist/angular-carousel.css',
						'app/vendor/angular-carousel/dist/angular-carousel.js'
					]},
				{
					name: 'ngGrid',
					files: [
						'app/vendor/ng-grid/build/ng-grid.min.js',
						'app/vendor/ng-grid/ng-grid.css'
					]},
				{
					name: 'infinite-scroll',
					files: ['app/vendor/ngInfiniteScroll/build/ng-infinite-scroll.js']},
				{
					name: 'ui.bootstrap-slider',
					files: [
						'app/vendor/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
						'app/vendor/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css',
						'app/vendor/angular-bootstrap-slider/slider.js'
					]},
				{
					name: 'ui.grid',
					files: [
						'app/vendor/angular-ui-grid/ui-grid.min.css',
						'app/vendor/angular-ui-grid/ui-grid.min.js'
					]},
				{
					name: 'textAngularSetup',
					files: ['app/vendor/textAngular/src/textAngularSetup.js']},
				{
					name: 'textAngular',
					files: [
					'app/vendor/textAngular/dist/textAngular-rangy.min.js',
					'app/vendor/textAngular/src/textAngular.js',
					'app/vendor/textAngular/src/textAngularSetup.js',
					'app/vendor/textAngular/src/textAngular.css'], serie: true},
				{
					name: 'angular-rickshaw',
					files: [
						'app/vendor/d3/d3.min.js',
						'app/vendor/rickshaw/rickshaw.js',
						'app/vendor/rickshaw/rickshaw.min.css',
						'app/vendor/angular-rickshaw/rickshaw.js'], serie: true},
				{
					name: 'angular-chartist',
					files: [
						'app/vendor/chartist/dist/chartist.min.css',
						'app/vendor/chartist/dist/chartist.js',
						'app/vendor/angular-chartist.js/dist/angular-chartist.js'], serie: true},
				{
					name: 'ui.map',
					files: ['app/vendor/angular-ui-map/ui-map.js']},
				{
					name: 'datatables',
					files: [
						'app/vendor/datatables/media/css/jquery.dataTables.css',
						'app/vendor/datatables/media/js/jquery.dataTables.js',
						'app/vendor/angular-datatables/dist/angular-datatables.js'], serie: true},
				{
					name: 'angular-jqcloud',
					files: [
						'app/vendor/jqcloud2/dist/jqcloud.css',
						'app/vendor/jqcloud2/dist/jqcloud.js',
						'app/vendor/angular-jqcloud/angular-jqcloud.js']},
				{
					name: 'angularGrid',
					files: [
						'app/vendor/ag-grid/dist/angular-grid.css',
						'app/vendor/ag-grid/dist/angular-grid.js',
						'app/vendor/ag-grid/dist/theme-dark.css',
						'app/vendor/ag-grid/dist/theme-fresh.css'
					]},
				{
					name: 'ng-nestable',
					files: [
						'app/vendor/ng-nestable/src/angular-nestable.js',
						'app/vendor/nestable/jquery.nestable.js'
					]},
				{
					name: 'akoenig.deckgrid',
					files: ['app/vendor/angular-deckgrid/angular-deckgrid.js']}
		]
	})
;