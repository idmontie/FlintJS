FlintJS
=======

[![Code Climate](https://codeclimate.com/github/idmontie/FlintJS/badges/gpa.svg)](https://codeclimate.com/github/idmontie/FlintJS)
[![Stories in Ready](https://badge.waffle.io/idmontie/FlintJS.svg?label=ready&title=Ready)](http://waffle.io/idmontie/FlintJS)

[![Github release](https://img.shields.io/github/release/idmontie/FlintJS.svg?style=flat)](https://github.com/idmontie/FlintJS/releases)
[![Github issues](https://img.shields.io/github/issues/idmontie/FlintJS.svg?style=flat)](https://github.com/idmontie/FlintJS/issues)
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat)](https://github.com/idmontie/FlintJS/blob/master/LICENSE.md)


MeteorJS loads all Javascript files in the following order:

> The JavaScript and CSS files in an application are loaded according to these rules:
> 
> Files in the lib directory at the root of your application are loaded first.
> 
> Files that match main.* are loaded after everything else.
> 
> Files in subdirectories are loaded before files in parent directories, so that files in the deepest subdirectory are loaded first (after lib), and files in the root directory are loaded last (other than main.*).
> 
> Within a directory, files are loaded in alphabetical order by filename.
> 
> These rules stack, so that within lib, for example, files are still loaded in alphabetical order; and if there are multiple files named main.js, the ones in subdirectories are loaded earlier.

Normally, this would be good enough.  But some projects need a better loading system.  FlintJS is made to fill that void.

FlintJS is used to allow the Javascript file to be loaded, but for the main logic to wait until necessary globals are defined by other Javascript files.

FlintJS is inefficient and should be only used when restructuring a project to adhere to MeteorJS's deep-first-*.main.js-last is just as bad of a solution.

Once MeteorJS natively implements custom module loading functionality, this project will be obsolete.

# Notes

Circular dependencies are not currently supported. In order to have a circular dependency, have the two files implement skeleton objects of each other
whose definitions will be filled in at a later time (a la C and C++);

# Installing

You can use the `flint.js` file in any JavaScript application.  For Meteor users, you just need to add the following package:

```cmd
meteor add idmontie:flint
```

# Documentation and Examples

```javascript
// Set up Flint to wait for PACKAGE, PACKAGE.Option, and PACKAGE.Option2
// to be defined.
Flint(function () {
  console.log("DONE!");
}, "PACKAGE", "PACKAGE.Option", "PACKAGE.Option2");


// In this example, we simulate latency with timeouts set to some arbitrary
// times.
//
// PACKAGE and PACKAGE.Option get defined in the first "request."
// PACAKGE.Option2 gets defined in a secondary "request."
setTimeout(function () {
  PACKAGE = {
    Option : "Late Defined"
  }

  setTimeout(function () {
    PACKAGE.Option2 = "Even later defined"
  }, 123);
}, 1234);
```

Globals can also be required without requiring the parents:

```javascript

Flint(function () {
  console.log("DONE!");
}, "PACKAGE.Option.DeepOption");
```

Objects can be listened to as well:

```javascript
var myObject = {};

Flint(function () {
  console.log("DONE!");
}, myObject, "Option");

myObject.Option = "set";
```


If you have a case where you might need to cancel a load wait, you can use the `new Flint()` syntax:

```javascript
var flint = new Flint(function () {
  console.log("DONE!");
}, "PACKAGE.Option", "PACKAGE.Option2");

flint.cancel();

```
