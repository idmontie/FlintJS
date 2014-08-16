/**
 * Flint
 * By: Ivan Montiel
 *
 * TODO support reference checks
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
      if (typeof window[arguments[i]] == 'undefined') {
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