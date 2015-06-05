angular.module('ngImage', [])

.directive('img', [ '$parse', function ($parse) {
  function endsWith (url, path) {
    var index = url.length - path.length
    return url.indexOf(path, index) !== -1
  }
  
  return {
    restrict: 'E',
    compile: function (__element, attr) {
      var fn = attr.ngError && $parse(attr.ngError)
      return function (scope, element) {
        element.on('error', function (ev) {
          var src = this.src
          
          // If theres an ng-error callback then call it
          if (fn) {
            scope.$apply(function () {
              fn(scope, { $event: ev, $src: src })
            })
          }
          
          // If theres an ng-error-src then set it
          if (attr.ngErrorSrc && !endsWith(src, attr.ngErrorSrc)) {
            element.attr('src', attr.ngErrorSrc)
          }
        })
      }
    }
  }
} ])
