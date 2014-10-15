var app = angular.module('test', [ 'ngImage' ])

app.directive('testControl', function () {
  return {
    template: '<img src="http://placehold.it/350x150" ng-error="raise()">',
    controller: function ($scope) {
      $scope.raise = function () {
        throw new Error('Control case raised.')
      }
    },
  }
})

app.directive('testError', function () {
  return {
    template: '<img src="/missing/image.png" ng-error="report($src)">',
    controller: function ($scope) {
      $scope.report = function (url) {
        $scope.url = url
      }
    },
  }
})

app.directive('testErrorSrc', function () {
  return {
    template: '<img ng-src="/missing/{{ type }}.png" ng-error="called = true" ng-error-src="/errors/{{ type }}.png">',
    controller: function ($scope) {
      $scope.called = false
      $scope.type = 'user'
    },
  }
})
