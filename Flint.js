/**
 * Flint
 * By: Ivan Montiel
 *
 * TODO support reference checks
 * TODO support undefined parents of deep checks
 * TODO support cancelling by using `new Flint();`
 */
(function () {
  /**
   * Wait for globals to be defined by other scripts being loaded.
   * 
   * Usage: Flint(function () { ... }, global1, global2);
   * 
   */
  Flint = function (callback) {
    var self = this;
    var args = arguments;

    if (arguments.length == 0) {
      return;
    }

    if (arguments.length == 1)  {
      callback();
      return;
    }

    var defined = true;
    for (var i = 1; i < arguments.length; i++) {
      // Support dot notation in argument
      var arg = arguments[i].split('.');
      var deepValue = window[arg[0]];

      for (var j = 1; j < arg.length; j++) {
        deepValue = deepValue[arg[j]];
      }

      if (typeof deepValue == 'undefined') {
        defined = false;
        break;
      }
    }

    if (!defined) {
      setTimeout(function () {
        Flint.apply(self, args);
      }, 10);
      return;
    }

    callback();
  };

})();