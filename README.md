FlintJS
=======

Special module "loader" for Meteor.

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