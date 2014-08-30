/**
 * Flint Test
 * 
 * FlintTest needs to be run after Flint has been loaded. Since
 * we are testing Flint, we really should use Flint to load FlintTest...
 * So, make sure to run FlintTest after Flint is loaded.  The current
 * directory structure will actually load in Flint AFTER FlintTest due
 * to the nature of how Meteor loads JS files in.
 *
 * @package Test
 */
(function () {
  /**
   * FlintTest
   *
   * Tests the functionalities of Flint using ShouldJS for asserts.
   *
   * @constructor
   */
  FlintTest = function () {
    /** 
     * A growing array that will hold true/false for whether that test is 
     * complete/incomplete.  When all true, all tests are complete.
     */
    this.tests = [];
  };

  /**
   * Run all of the tests.  Tests are defined as any other function in FlintTests's
   * prototype that are not "runTest" or "cleanUp".  Pretty bad, but it works.
   *
   * runTests will also "wait" for all tests to be completed before giving the user
   * a popup that says "All tests completed!" This should happen whether or not
   * Flint passes all of its tests.
   *
   * This will call cleanUp when done waiting.
   */
  FlintTest.prototype.runTests = function () {
    var self = this;
    for (property in self) {
      if (typeof self[property] == "function" &&
          property != "runTests" &&
          property != "cleanUp") {

        self[property]();
      }
    }

    /**
     * Anonymous funciton
     *
     * Wait for all tests to complete
     */
    var wait = function ()  {
      var done = true;
      for (var i = 0; i < self.tests.length; i++) {
        if (!self.tests[i]) {
          done = false;
        }
      }
      if (done) {
        alert("All tests completed!");
        self.cleanUp();
      } else {
        setTimeout(wait, 100);
      }
    };

    wait();
  };

  /**
   * Clean up the global namespace. 
   * Will be called internally after tests are complete.
   */
  FlintTest.prototype.cleanUp = function () {
    delete window.TEST1;
    delete window.TEST2;
    delete window.TEST3;
    delete window.TEST4;
  };

  /**
   * Test the "waiting" functionality of Flint.
   *
   */
  FlintTest.prototype.testThatFlintCanWait = function () {
    var self = this;
    var index = self.tests.length;
    self.tests[index] = false;

    var required = [
      "TEST1",
      "TEST2.INNER"
    ];

    var testValue = 0;

    Flint(function () {
      testValue = 1;
    }, required);

    testValue.should.equal(0);

    setTimeout(function () {
      TEST1 = true;
      TEST2 = {
        "INNER" : true
      };
    }, 2000);

    setTimeout(function () {
      testValue.should.equal(1);
      self.tests[index] = true;
    }, 3000);
  };

  /**
   * Test that you can cancel a Flint request.
   */
  FlintTest.prototype.testThatFlintCanCancel = function () {
    var self = this;
    var index = self.tests.length;
    self.tests[index] = false;

    var required = [
      "TEST3"
    ];

    var testValue = 0;

    var instance = new Flint(function () {
      testValue = 1;
    }, required);

    testValue.should.equal(0);

    instance.cancel();
    TEST3 = "set";

    setTimeout(function () {
      testValue.should.equal(0);
      self.tests[index] = true;
    }, 1000);
  };

  /**
   * Test that Flint supports Object waiting.
   */
  FlintTest.prototype.testThatFlintSupportsObjects = function () {
    var self = this;
    var index = self.tests.length;
    self.tests[index] = false;

    var required = [
      "TEST3"
    ];

    var testValue = 0;
    var testObject = {};

    Flint(function () {
      testValue = 1;
    }, testObject, required);

    testValue.should.equal(0);

    setTimeout(function () {
      TEST3 = "fake out";
    }, 1000);

    setTimeout(function () {
      testValue.should.equal(0);
    }, 1500);

    setTimeout(function () {
      testObject.TEST3 = "for real";
    }, 2000);

    setTimeout(function () {
      testValue.should.equal(1);
      self.tests[index] = true;
    }, 2500);
    
  };

})();