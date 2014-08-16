FlintJS
=======

Special module "loader" for Meteor.

FlintJS is made to support MeteorJS's lack of module loading.  By waiting for certain globals to be defined, files can be loaded by Meteor without their contents being executed.

FlintJS is inefficient and should be only used when restructuring a project to adhere to MeteorJS's deep-first-*.main.js-last is just as bas of a solution.

Once MeteorJS natively implements custom module loading functionality, this project will be obsolete.

Usage
=====

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