describe('ngImage', function () {
  describe('img', function () {
    it('should catch load errors', function () {
      var scope = angular.element('test-error').scope()
      var done = scope.$watch('url', function (url) {
        var path = url.replace(/^https?:\/\/[^/]+/, '')
        assert.equal(path, '/missing/image.png')
        done()
      })
    })

    it('should interpolate error src', function () {
      var scope = angular.element('test-error').scope()
      var done = scope.$watch('called', function (called) {
        if (!called) { return }
        var img = angular.element('test-error-src img')
        assert.equal(img.attr('src'), '/errors/user.png')
        done()
      })      
    })
  })
})
