'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Layout = require('../../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _asset = require('../../ethereum/asset');

var _asset2 = _interopRequireDefault(_asset);

var _factory = require('../../ethereum/factory');

var _factory2 = _interopRequireDefault(_factory);

var _semanticUiReact = require('semantic-ui-react');

var _web = require('../../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _routes = require('../../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/Marlon/Projects/ethereum_projects/SupplyChainManagement/pages/assets/show.js?entry';

var QRCode = require('qrcode.react');


var AssetShow = function (_Component) {
  (0, _inherits3.default)(AssetShow, _Component);

  function AssetShow() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AssetShow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AssetShow.__proto__ || (0, _getPrototypeOf2.default)(AssetShow)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      name: '',
      weightUse: '',
      weight: '',
      description: '',
      errorMessage: '',
      loading: false,
      recipient: ''
    }, _this.onTransfer = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event) {
        var asset, accounts;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                event.preventDefault();
                asset = (0, _asset2.default)(_this.props.asset);

                _this.setState({ loading: true, errorMessage: '' });

                _context.prev = 3;
                _context.next = 6;
                return _web2.default.eth.getAccounts();

              case 6:
                accounts = _context.sent;
                _context.next = 9;
                return asset.methods.transferAsset(_this.state.recipient).send({
                  from: accounts[0]
                });

              case 9:
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context['catch'](3);

                _this.setState({ errorMessage: _context.t0.message });

              case 14:

                _this.setState({ loading: false });

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2, [[3, 11]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.onProcess = function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(event) {
        var accounts;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                event.preventDefault();
                _this.setState({ loading: true, errorMessage: '' });

                _context2.prev = 2;
                _context2.next = 5;
                return _web2.default.eth.getAccounts();

              case 5:
                accounts = _context2.sent;
                _context2.next = 8;
                return _factory2.default.methods.processAsset(_this.state.weightUse, _this.state.name, _this.state.description, _this.state.weight, _this.props.asset).send({
                  from: accounts[0]
                });

              case 8:
                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](2);

                _this.setState({ errorMessage: _context2.t0.message });

              case 13:

                _this.setState({ loading: false });

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[2, 10]]);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AssetShow, [{
    key: 'renderEvents',
    value: function renderEvents() {
      var items = this.props.events.map(function (event) {
        var seconds = event.returnValues.now || event.returnValues.triggerTime;
        var date = new Date(seconds * 1000);
        return {
          header: date + ': ' + event.event,
          meta: _react2.default.createElement(_semanticUiReact.List, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 55
            }
          }, _react2.default.createElement(_semanticUiReact.List.Item, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 56
            }
          }, 'Transaction Hash: ', event.transactionHash), _react2.default.createElement(_semanticUiReact.List.Item, {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 57
            }
          }, 'Event triggered by: ', event.returnValues.sourceAddr)),
          description: _react2.default.createElement(_routes.Link, { route: 'https://rinkeby.etherscan.io/tx/' + event.transactionHash, __source: {
              fileName: _jsxFileName,
              lineNumber: 61
            }
          }, _react2.default.createElement('a', {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 62
            }
          }, 'View Event on Etherscan')),
          fluid: true
        };
      }); //Iterate ove array and trigger function

      return _react2.default.createElement(_semanticUiReact.Card.Group, { items: items, __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        }
      });
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var items = this.props.children.map(function (child) {
        return _react2.default.createElement('div', {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 75
          }
        }, _react2.default.createElement(_semanticUiReact.List.Item, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 76
          }
        }, _react2.default.createElement(_semanticUiReact.List.Content, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 77
          }
        }, _react2.default.createElement(_routes.Link, { route: '/assets/' + child, __source: {
            fileName: _jsxFileName,
            lineNumber: 78
          }
        }, _react2.default.createElement('a', {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 79
          }
        }, child)))));
      });
      return _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        }
      }, _react2.default.createElement('h4', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 88
        }
      }, 'List of Children'), _react2.default.createElement(_semanticUiReact.List, { items: items, divided: true, verticalAlign: 'middle', __source: {
          fileName: _jsxFileName,
          lineNumber: 89
        }
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(_Layout2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        }
      }, _react2.default.createElement('h3', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 134
        }
      }, this.props.asset), _react2.default.createElement(_semanticUiReact.Grid, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 135
        }
      }, _react2.default.createElement(_semanticUiReact.Grid.Column, { mobile: 16, tablet: 16, computer: 2, __source: {
          fileName: _jsxFileName,
          lineNumber: 136
        }
      }, _react2.default.createElement(QRCode, { value: this.props.asset, __source: {
          fileName: _jsxFileName,
          lineNumber: 137
        }
      })), _react2.default.createElement(_semanticUiReact.Grid.Column, { mobile: 16, tablet: 8, computer: 8, className: 'ui sticky', __source: {
          fileName: _jsxFileName,
          lineNumber: 139
        }
      }, _react2.default.createElement('h4', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 140
        }
      }, 'Asset Details'), _react2.default.createElement(_semanticUiReact.List, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 141
        }
      }, _react2.default.createElement(_semanticUiReact.List.Item, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 142
        }
      }, 'Name: ', this.props.name), _react2.default.createElement(_semanticUiReact.List.Item, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 143
        }
      }, 'Owner: ', this.props.owner), _react2.default.createElement(_semanticUiReact.List.Item, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 144
        }
      }, 'Description: ', this.props.description), _react2.default.createElement(_semanticUiReact.List.Item, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 145
        }
      }, 'Weight left: ', this.props.weight, ' kg'), _react2.default.createElement(_semanticUiReact.List.Item, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 146
        }
      }, 'Parent Asset: ', this.props.parentAsset))), _react2.default.createElement(_semanticUiReact.Grid.Column, { mobile: 16, tablet: 8, computer: 6, __source: {
          fileName: _jsxFileName,
          lineNumber: 149
        }
      }, this.renderChildren()), _react2.default.createElement(_semanticUiReact.Grid.Column, { mobile: 16, tablet: 8, computer: 8, className: 'ui sticky', __source: {
          fileName: _jsxFileName,
          lineNumber: 152
        }
      }, _react2.default.createElement(_semanticUiReact.Modal, { trigger: _react2.default.createElement(_semanticUiReact.Button, { floated: 'right', content: 'Transfer Asset', icon: 'send', primary: true, loading: this.state.loading, __source: {
            fileName: _jsxFileName,
            lineNumber: 154
          }
        }), __source: {
          fileName: _jsxFileName,
          lineNumber: 154
        }
      }, _react2.default.createElement(_semanticUiReact.Header, { icon: 'send', content: 'Please enter Address of recipient.', __source: {
          fileName: _jsxFileName,
          lineNumber: 155
        }
      }), _react2.default.createElement(_semanticUiReact.Modal.Content, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 156
        }
      }, _react2.default.createElement(_semanticUiReact.Form, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 158
        }
      }, _react2.default.createElement(_semanticUiReact.Form.Field, { required: true, __source: {
          fileName: _jsxFileName,
          lineNumber: 159
        }
      }, _react2.default.createElement('label', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 160
        }
      }, 'Recipient'), _react2.default.createElement(_semanticUiReact.Input, {
        placeholder: '0x84hg76jg73...',
        value: this.state.recipient,
        onChange: function onChange(event) {
          return _this3.setState({ recipient: event.target.value });
        },
        required: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 161
        }
      })))), _react2.default.createElement(_semanticUiReact.Modal.Actions, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 172
        }
      }, _react2.default.createElement(_semanticUiReact.Button, { onClick: this.onTransfer, color: 'green', __source: {
          fileName: _jsxFileName,
          lineNumber: 173
        }
      }, 'Transfer!')))), _react2.default.createElement(_semanticUiReact.Grid.Column, { mobile: 16, tablet: 8, computer: 8, __source: {
          fileName: _jsxFileName,
          lineNumber: 179
        }
      }, _react2.default.createElement(_semanticUiReact.Modal, { trigger: _react2.default.createElement(_semanticUiReact.Button, { floated: 'left', content: 'Process Asset', icon: 'setting', primary: true, loading: this.state.loading, __source: {
            fileName: _jsxFileName,
            lineNumber: 181
          }
        }), __source: {
          fileName: _jsxFileName,
          lineNumber: 181
        }
      }, _react2.default.createElement(_semanticUiReact.Header, { icon: 'send', content: 'Please enter Address of recipient.', __source: {
          fileName: _jsxFileName,
          lineNumber: 182
        }
      }), _react2.default.createElement(_semanticUiReact.Modal.Content, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 183
        }
      }, _react2.default.createElement(_semanticUiReact.Form, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 185
        }
      }, _react2.default.createElement(_semanticUiReact.Form.Group, { widths: 'equal', __source: {
          fileName: _jsxFileName,
          lineNumber: 186
        }
      }, _react2.default.createElement(_semanticUiReact.Form.Field, { required: true, __source: {
          fileName: _jsxFileName,
          lineNumber: 187
        }
      }, _react2.default.createElement('label', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 188
        }
      }, 'Weight Use'), _react2.default.createElement(_semanticUiReact.Input, {
        placeholder: 'e.g. 100',
        value: this.state.weightUse,
        onChange: function onChange(event) {
          return _this3.setState({ weightUse: event.target.value });
        },
        label: 'kg',
        labelPosition: 'right',
        required: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 189
        }
      })), _react2.default.createElement(_semanticUiReact.Form.Field, { required: true, __source: {
          fileName: _jsxFileName,
          lineNumber: 198
        }
      }, _react2.default.createElement('label', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 199
        }
      }, 'Asset name'), _react2.default.createElement(_semanticUiReact.Input, {
        placeholder: 'e.g. Cow',
        value: this.state.name,
        onChange: function onChange(event) {
          return _this3.setState({ name: event.target.value });
        },
        required: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 200
        }
      })), _react2.default.createElement(_semanticUiReact.Form.Field, { required: true, __source: {
          fileName: _jsxFileName,
          lineNumber: 207
        }
      }, _react2.default.createElement('label', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 208
        }
      }, 'Weight'), _react2.default.createElement(_semanticUiReact.Input, {
        placeholder: 'e.g. 100',
        value: this.state.weight,
        onChange: function onChange(event) {
          return _this3.setState({ weight: event.target.value });
        },
        label: 'kg',
        labelPosition: 'right',
        required: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 209
        }
      }))), _react2.default.createElement(_semanticUiReact.Form.TextArea, {
        label: 'Description',
        placeholder: 'Tell us more about the asset...',
        value: this.state.description,
        onChange: function onChange(event) {
          return _this3.setState({ description: event.target.value });
        },
        required: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 219
        }
      }))), _react2.default.createElement(_semanticUiReact.Modal.Actions, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 230
        }
      }, _react2.default.createElement(_semanticUiReact.Button, { onClick: this.onProcess, color: 'green', __source: {
          fileName: _jsxFileName,
          lineNumber: 231
        }
      }, 'Transfer!')))), _react2.default.createElement(_semanticUiReact.Grid.Column, { mobile: 16, tablet: 16, computer: 16, __source: {
          fileName: _jsxFileName,
          lineNumber: 238
        }
      }, this.renderEvents())));
    }
  }], [{
    key: 'getInitialProps',

    //Before Component is rendered, getInitialProps is called
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(props) {
        var asset, summary, pastEvents;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                asset = (0, _asset2.default)(props.query.address);
                //console.log(asset);

                _context3.next = 3;
                return asset.methods.getAssetAttributes().call();

              case 3:
                summary = _context3.sent;
                _context3.next = 6;
                return asset.getPastEvents('allEvents', {
                  filter: {},
                  fromBlock: 0,
                  toBlock: 'latest'
                }, function (error, events) {
                  return events;
                });

              case 6:
                pastEvents = _context3.sent;
                return _context3.abrupt('return', {
                  asset: asset._address,
                  owner: summary[0],
                  name: summary[1],
                  description: summary[2],
                  weight: summary[3],
                  parentAsset: summary[4],
                  stage: summary[5],
                  creationTime: summary[6],
                  children: summary[7],
                  events: pastEvents,
                  assetABI: asset
                });

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getInitialProps(_x3) {
        return _ref4.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return AssetShow;
}(_react.Component);

exports.default = AssetShow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2Fzc2V0cy9zaG93LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiTGF5b3V0IiwiQXNzZXQiLCJmYWN0b3J5IiwiTGlzdCIsIkNhcmQiLCJHcmlkIiwiQnV0dG9uIiwiTW9kYWwiLCJGb3JtIiwiSW5wdXQiLCJNZXNzYWdlIiwiSGVhZGVyIiwiUVJDb2RlIiwicmVxdWlyZSIsIndlYjMiLCJMaW5rIiwiQXNzZXRTaG93Iiwic3RhdGUiLCJuYW1lIiwid2VpZ2h0VXNlIiwid2VpZ2h0IiwiZGVzY3JpcHRpb24iLCJlcnJvck1lc3NhZ2UiLCJsb2FkaW5nIiwicmVjaXBpZW50Iiwib25UcmFuc2ZlciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJhc3NldCIsInByb3BzIiwic2V0U3RhdGUiLCJldGgiLCJnZXRBY2NvdW50cyIsImFjY291bnRzIiwibWV0aG9kcyIsInRyYW5zZmVyQXNzZXQiLCJzZW5kIiwiZnJvbSIsIm1lc3NhZ2UiLCJvblByb2Nlc3MiLCJwcm9jZXNzQXNzZXQiLCJpdGVtcyIsImV2ZW50cyIsIm1hcCIsInNlY29uZHMiLCJyZXR1cm5WYWx1ZXMiLCJub3ciLCJ0cmlnZ2VyVGltZSIsImRhdGUiLCJEYXRlIiwiaGVhZGVyIiwibWV0YSIsInRyYW5zYWN0aW9uSGFzaCIsInNvdXJjZUFkZHIiLCJmbHVpZCIsImNoaWxkcmVuIiwiY2hpbGQiLCJvd25lciIsInBhcmVudEFzc2V0IiwicmVuZGVyQ2hpbGRyZW4iLCJ0YXJnZXQiLCJ2YWx1ZSIsInJlbmRlckV2ZW50cyIsInF1ZXJ5IiwiYWRkcmVzcyIsImdldEFzc2V0QXR0cmlidXRlcyIsImNhbGwiLCJzdW1tYXJ5IiwiZ2V0UGFzdEV2ZW50cyIsImZpbHRlciIsImZyb21CbG9jayIsInRvQmxvY2siLCJlcnJvciIsInBhc3RFdmVudHMiLCJfYWRkcmVzcyIsInN0YWdlIiwiY3JlYXRpb25UaW1lIiwiYXNzZXRBQkkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7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RSxhQUFhLE1BQUEsQUFBTSxPQUE1QyxBQUFTLEFBQWMsQUFBNEI7QUFKL0QsQUFLRTtrQkFMRjs7b0JBQUE7c0JBdENOLEFBRUUsQUFFRSxBQWtDRSxBQVdKO0FBWEk7QUFDRSw0QkFVTCxjQUFELHVCQUFBLEFBQU87O29CQUFQO3NCQUFBLEFBQ0U7QUFERjtBQUFBLHlCQUNFLEFBQUMseUNBQU8sU0FBUyxLQUFqQixBQUFzQixXQUFXLE9BQWpDLEFBQXVDO29CQUF2QztzQkFBQTtBQUFBO1NBaEdSLEFBNENFLEFBRUUsQUFpREUsQUFDRSxBQU9OLGlDQUFDLGNBQUQsc0JBQUEsQUFBTSxVQUFPLFFBQWIsQUFBcUIsSUFBSSxRQUF6QixBQUFpQyxJQUFJLFVBQXJDLEFBQStDO29CQUEvQztzQkFBQSxBQUNHO0FBREg7Y0ExR04sQUFDRSxBQUVFLEFBdUdFLEFBQ0csQUFBSyxBQU1mOzs7U0FoT0Q7Ozs7NkcsQUFDNkI7Ozs7O21CQUNyQjtBLHdCQUFRLHFCQUFNLE1BQUEsQUFBTSxNQUFaLEEsQUFBa0IsQUFDaEM7Ozs7dUJBQ3NCLE1BQUEsQUFBTSxRQUFOLEFBQWMscUIsQUFBZCxBQUFtQzs7bUJBQW5EO0E7OzZCQUVtQixBQUFNLGNBQU4sQUFBb0I7MEJBQWEsQUFDNUMsQUFDUjs2QkFGb0QsQUFFekMsQUFDWDsyQkFIbUIsQUFBaUMsQUFHM0M7QUFIMkMsQUFDcEQsaUJBRG1CLEVBSXBCLFVBQUEsQUFBUyxPQUFULEFBQWdCLFFBQU8sQUFBRTt5QkFBQSxBQUFPLEFBQVM7QUFKckIsQTs7bUJBQW5CO0E7O3lCQU9HLE1BREgsQUFDUyxBQUNiO3lCQUFPLFFBRkgsQUFFRyxBQUFRLEFBQ2Y7d0JBQU0sUUFIRixBQUdFLEFBQVEsQUFDZDsrQkFBYSxRQUpULEFBSVMsQUFBUSxBQUNyQjswQkFBUSxRQUxKLEFBS0ksQUFBUSxBQUNoQjsrQkFBYSxRQU5ULEFBTVMsQUFBUSxBQUNyQjt5QkFBTyxRQVBILEFBT0csQUFBUSxBQUNmO2dDQUFjLFFBUlYsQUFRVSxBQUFRLEFBQ3RCOzRCQUFVLFFBVE4sQUFTTSxBQUFRLEFBQ2xCOzBCQVZJLEFBVUksQUFDUjs0QixBQVhJLEFBV007QUFYTixBQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeEJrQixBLEFBOE94Qjs7a0JBQUEsQUFBZSIsImZpbGUiOiJzaG93LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy9NYXJsb24vUHJvamVjdHMvZXRoZXJldW1fcHJvamVjdHMvU3VwcGx5Q2hhaW5NYW5hZ2VtZW50In0=