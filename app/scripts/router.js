(function() {
    angular.module("app").config(RouterConfig);


    function RouterConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider

            .state('main', {
                abstract: true,
                templateUrl: 'app/templates/main/main.tpl.html',
                controller: "MainController",
                controllerAs: "main"
            })
            .state('main.site', {
                abstract: true,
                templateUrl: 'app/templates/site/site.tpl.html',
                controller: "SiteController",
                controllerAs: "site"
            })
            .state('main.site.home', {
                url: '/home',
                templateUrl: 'app/templates/home/home.tpl.html',
                controller: "HomeController",
                controllerAs: "home"
            });



    };


})(angular);