/**
 * Flint Test
 * 
 * Test Flint with Should for unit tests and Blanket for
 * code coverage.  Good thing meteor loads in /src before
 * /test... or we would need Flint to test Flint...
 */
(function () {
  FlintTest = function () {
    this.tests = [];
  };

  FlintTest.prototype.runTests = function () {
    var self = this;
    for (property in self) {
      if (typeof self[property] == "function" &&
        property != "runTests") {

        self[property]();
      }
    }

    // Wait for all tests to complete...
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

  FlintTest.prototype.cleanUp = function () {
    delete window.TEST1;
    delete window.TEST2;
    delete window.TEST3;
  };

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

    testValue.should.equal(0);
    self.tests[index] = true;
  };

  
})();