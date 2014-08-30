// Test

(function () {
  RunExample = function () {
    var required = [
      "GLOBAL1",
      "GLOBAL2.Test",
      "GLOBAL2.Test2"
    ];

    Flint(function () {
      alert(required.join(' '));
    }, required);


    setTimeout(function () {
      GLOBAL1 = {};
      GLOBAL2 = {
        Test : "Data1",
        Test2 : "Data2"
      };
    }, 1234);
  };
})();
