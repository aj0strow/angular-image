;(function (angular) {
  var module = angular.module('ngImage', [])

  module.directive('img', function () {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
        element.on('error', function () {
          if (attrs.ngError) {
            scope.$eval(attrs.ngError, { $src: this.src })
          }
          var errorSrc = attrs.ngErrorSrc
          if (errorSrc && !endsWith(this.src, errorSrc)) {
            element.attr('src', errorSrc)
          }
        })
      }
    }

    function endsWith (url, path) {
      var index = url.length - path.length
      return url.indexOf(path, index) !== -1
    }
  })
})(window.angular);
