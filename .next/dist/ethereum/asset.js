'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _Asset = require('./build/Asset.json');

var _Asset2 = _interopRequireDefault(_Asset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (address) {
  return new _web2.default.eth.Contract(JSON.parse(_Asset2.default.interface), address);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL2Fzc2V0LmpzIl0sIm5hbWVzIjpbIndlYjMiLCJBc3NldCIsImFkZHJlc3MiLCJldGgiLCJDb250cmFjdCIsIkpTT04iLCJwYXJzZSIsImludGVyZmFjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQUFBTyxBQUFQLEFBQWlCLEFBQWpCOzs7O0FBQ0EsQUFBTyxBQUFQLEFBQWtCLEFBQWxCLEFBRUE7Ozs7OztrQkFBZSxVQUFDLEFBQUQsU0FBYSxBQUMxQjtTQUFPLElBQUksY0FBSyxBQUFMLElBQVMsQUFBYixTQUNMLEtBQUssQUFBTCxNQUFXLGdCQUFNLEFBQWpCLEFBREssWUFFTCxBQUZLLEFBQVAsQUFJRDtBQUxEIiwiZmlsZSI6ImFzc2V0LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9NYXJsb24vUHJvamVjdHMvZXRoZXJldW1fcHJvamVjdHMvU3VwcGx5Q2hhaW5NYW5hZ2VtZW50In0=