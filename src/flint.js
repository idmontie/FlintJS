/**
 * Flint
 * By: Ivan Montiel
 *
 */
(function () {
  var root = this;

  /**
   * Don't run on Meteor Server instances
   */
  if (typeof Meteor !== 'undefined') {
    if ( Meteor.isServer ) {
      return;
    }
  }

  /**
   * Wait for globals to be defined by other scripts being loaded.
   * 
   * Usage: Flint(function () { ... }, object (optional), global1, global2...);
   */
  window.Flint = function (callback) {
    var self = this;
    var args = arguments;
    var watch = root;
    var parse = function (input) {
      if (input instanceof Array) {
        return input.map(function (part) {
          return parse(part);
        }).reduce(function (a, b) {
          return a && b;
        });
      }
      else {
        // Support dot notation in argument
        var arg = input.split('.');
        var deepValue = watch[arg[0]];
        if (typeof deepValue == 'undefined') {
          return false;
        }

        for (var j = 1; j < arg.length; j++) {
          deepValue = deepValue[arg[j]];

          if (typeof deepValue == 'undefined') {
            return false;
          }
        }

        return true;
      }
    };


    if (arguments.length == 0) {
      return;
    }

    if (arguments.length == 1)  {
      callback();
      return;
    }

    var index = 1;

    if (typeof arguments[1] === "object" &&
       !(arguments[1] instanceof Array)) {
      watch = arguments[1];
      index = 2;
    }

    var defined = true;
    for (var i = index; i < arguments.length; i++) {
      defined = parse(arguments[i]);

      if (!defined) {
        break;
      }
    }

    if (!defined) {
      self.timeout = setTimeout(function () {
        Flint.apply(self, args);
      }, 10);
      return self;
    }

    callback();
  };

  Flint.prototype.cancel = function () {
    clearTimeout(this.timeout);
  }
})();