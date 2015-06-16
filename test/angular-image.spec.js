describe('ngImage', function () {
  var $injector = angular.injector([ 'ng', 'ngImage' ])
  var $rootScope = $injector.get('$rootScope')
  var $compile = $injector.get('$compile')
  
  function pathname (url) {
    var a = document.createElement('a')
    a.href = url
    return a.pathname
  }
  
  describe('img directive', function () {
    it('should not trigger for image load', function (done) {
      var scope = $rootScope.$new()
      var markup = '<img src="http://placehold.it/10x10" ng-error="raise()">'
      scope.raise = function () {
        done(new Error('error should not trigger on load'))
      }
      var element = $compile(markup)(scope)        
      scope.$digest()
      element.on('load', function () {
        done()
      })
    })
    
    it('should expose $src to callback', function (done) {
      var scope = $rootScope.$new()
      var markup = '<img src="/missing.png" ng-error="report($src)">'
      scope.report = function (src) {
        scope.src = src
      }
      scope.$watch('src', function (src) {        
        if (src) {
          assert.equal(pathname(src), '/missing.png')
          done()
        }
      })
      var element = $compile(markup)(scope)
      scope.$digest()
    })
    
    it('should expose $event to callback', function (done) {
      var scope = $rootScope.$new()
      var markup = '<img src="/missing.png" ng-error="report($event)">'
      scope.report = function (ev) {
        scope.ev = ev
      }
      scope.$watch('ev', function (ev) {
        if (ev) {
          assert.equal(ev.type, 'error')
          done()
        }
      })
      var element = $compile(markup)(scope)
      scope.$digest()
    })
    
    it('should replace image src with error src', function (done) {
      var scope = $rootScope.$new()
      var markup = '<img src="/missing.png" ng-error-src="http://placehold.it/10x10">'
      var element = $compile(markup)(scope)
      element.on('load', function () {
        done()
      })
      scope.$digest()
    })
    
    it('should interpolate error src', function (done) {
      var scope = $rootScope.$new()
      var markup = '<img src="/missing.png" ng-error-src="http://placehold.it/{{ size }}">'
      var element = $compile(markup)(scope)
      element.on('load', function () {
        assert.equal('http://placehold.it/10x10', element[0].src)
        done()
      })
      scope.size = '10x10'
      scope.$digest()
    })
    
    // Without checking the image src for a repeat, you have an infinite loop
    // where it errors, a new image src is set (the same one), it errors, a
    // new image src is set ..
    it('should not infinite loop error src', function (done) {
      var scope = $rootScope.$new()
      var markup = '<img src="/missing.png" ng-error="report()" ng-error-src="/also/missing.png">'
      var element = $compile(markup)(scope)
      var count = 0
      scope.report = function () {
        count += 1
        assert(count <= 2)
      }
      
      // Is there a way to validate no more pending requests?
      setTimeout(done, 100)
      scope.$digest()
    })
  })
})
