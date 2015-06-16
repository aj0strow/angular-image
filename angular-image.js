angular.module('ngImage', [])

.directive('img', [
  '$parse',
  function ($parse) {
    function endsWith (url, path) {
      var index = url.length - path.length
      return url.indexOf(path, index) !== -1
    }
  
    return {
      restrict: 'E',
      link: function (scope, element, attributes) {        
        var fn = attributes.ngError && $parse(attributes.ngError)
        element.on('error', function (ev) {
          var src = this.src
        
          // If theres an ng-error callback then call it
          if (fn) {
            scope.$apply(function () {
              fn(scope, { $event: ev, $src: src })
            })
          }
        
          // If theres an ng-error-src then set it
          if (attributes.ngErrorSrc && !endsWith(src, attributes.ngErrorSrc)) {
            element.attr('src', attributes.ngErrorSrc)
          }
        })
      }
    }
  }
]);
