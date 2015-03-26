# `angular-image`

Fix and report image load errors. Provide a fallback image src if desired.

### Report Image Failure

The jquery error event is exposed as `$event` and the failed image url is exposed as `$src`.

```html
<img ng-src="{{ user.image }}" ng-error="report($event, $src)">
```

```javascript
app.controller(function ($scope) {
  $scope.user = getUser()

  $scope.report = function (ev, src) {
    // reload user resource
  }
})
```

You can specify a fallback image src with interpolation.

```html
<img ng-src="{{ user.image }}" ng-error-src="/fallback/{{ user.type }}.png">
```

The `ng-error` invocation injects a special `$src` variable in case you want the exact image url that failed.

### Real Use Case

Why would you want to catch image load errors? For my use case, I want to replace broken social media profile pictures. If the image is broken, it sends an http request to refresh the image on the server, and then replaces the image with the correct url. 

In practice, this means that instead of a completely broken or missing image, it just looks like it took a little longer to load than usual. With something real-time like Firebase, it's hard to tell what loaded correctly the first time and what needed to be corrected. 

### Install

Install the package.

```sh
$ bower install --save angular-image
```

Include the script.

```
bower_components/angular-image/angular-image.js
```

Add the `ngImage` dependency.

```javascript
angular.module('myApp', [ 'ngImage' ])
```

**MIT License**. 
