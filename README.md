# `angular-image`

Fix and report image errors. Provide a fallback image source if necessary.

### Usage

```html
<img ng-src="{{ user.image }}" ng-error="fixImage(user)">
```

```javascript
app.controller(function ($scope) {
  $scope.user = getUser()

  $scope.fixImage = function (user) {
    // report event or reload user resource
  }
})
```

In the meantime, render a fallback image.

```html
<img ng-error-src="/assets/errors/user-image/{{ size }}.png">
```

The `ng-error` invocation injects a special `$src` variable in case you want the exact image url that failed.

```html
<img src="/broken/path.png" ng-error="reportBrokenImage($src)">
```

```javascript
  $scope.reportBrokenImage(url) {
    // url == '/broken/path.png'
  }
```

### Real World

Why would you want this? Well with real-time frameworks like Firebase, there's the opportunity to avoid broken images from 3rd party sources. 

* Michael uploads a new profile pic to Hot Social Network.
* Jordan visits Michael's profile on your website.
* Jordan's browser sends a notice to the server that Michael's pic is broken.
* The server requests Michael's new profile from Hot Social Network, and writes to Firebase.
* Firebase automatically updates the image src on the next digest cycle. 
* Jordan notices a half-second delay in the profile pic loading instead of a broken pic. 

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