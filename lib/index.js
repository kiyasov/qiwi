"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _axios = _interopRequireDefault(require("axios"));

var _lodash = _interopRequireDefault(require("lodash"));

var QiwiBot = function QiwiBot(props) {
  var _this = this;

  (0, _classCallCheck2.default)(this, QiwiBot);
  (0, _defineProperty2.default)(this, "sendAuthenticatedRequest",
  /*#__PURE__*/
  function () {
    var _ref2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(_ref) {
      var _ref$method, method, url, _ref$data, data, accessToken, _ref3, response;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref$method = _ref.method, method = _ref$method === void 0 ? "post" : _ref$method, url = _ref.url, _ref$data = _ref.data, data = _ref$data === void 0 ? {} : _ref$data;
              accessToken = _this.props.accessToken;
              _context.prev = 2;
              _context.next = 5;
              return (0, _axios.default)({
                method: method,
                url: "https://edge.qiwi.com".concat(url),
                headers: {
                  Authorization: "Bearer " + accessToken
                },
                data: data
              });

            case 5:
              _ref3 = _context.sent;
              response = _ref3.data;
              return _context.abrupt("return", response);

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](2);

              if (!_context.t0.response) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", {
                status: _context.t0.response.status,
                statusText: _context.t0.response.statusText,
                data: _context.t0.response.data
              });

            case 16:
              if (!_context.t0.request) {
                _context.next = 18;
                break;
              }

              return _context.abrupt("return", _context.t0.request);

            case 18:
              return _context.abrupt("return", _context.t0.message);

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[2, 10]]);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "transactionsInfo",
  /*#__PURE__*/
  function () {
    var _ref4 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(transactionId) {
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this.sendAuthenticatedRequest({
                method: "get",
                url: "/payment-history/v2/transactions/".concat(transactionId)
              });

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x2) {
      return _ref4.apply(this, arguments);
    };
  }());
  (0, _defineProperty2.default)(this, "accountInfo",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3() {
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _this.sendAuthenticatedRequest({
              method: "get",
              url: "/person-profile/v1/profile/current"
            });

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  })));
  (0, _defineProperty2.default)(this, "balanceInfo",
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4() {
    var personId;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            personId = _this.props.personId;
            _context4.next = 3;
            return _this.sendAuthenticatedRequest({
              method: "get",
              url: "/funding-sources/v2/persons/".concat(personId, "/accounts")
            });

          case 3:
            return _context4.abrupt("return", _context4.sent);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  })));
  (0, _defineProperty2.default)(this, "processPayment",
  /*#__PURE__*/
  function () {
    var _ref8 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee5(_ref7) {
      var pattern_id, data, response, isPay, _ref9, errorCode, error, status;

      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              pattern_id = _ref7.pattern_id, data = _ref7.data;
              _context5.next = 3;
              return _this.sendAuthenticatedRequest({
                url: "/sinap/api/v2/terms/".concat(pattern_id, "/payments"),
                data: data
              });

            case 3:
              response = _context5.sent;
              isPay = false;

            case 5:
              _context5.next = 7;
              return _this.transactionsInfo(response.transaction.id);

            case 7:
              _ref9 = _context5.sent;
              errorCode = _ref9.errorCode;
              error = _ref9.error;
              status = _ref9.status;

              if (!(_lodash.default.toInteger(errorCode) !== 0)) {
                _context5.next = 13;
                break;
              }

              throw new Error(error);

            case 13:
              if (status !== "WAITING") {
                isPay = true;
              }

            case 14:
              if (!isPay) {
                _context5.next = 5;
                break;
              }

            case 15:
              return _context5.abrupt("return", response);

            case 16:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function (_x3) {
      return _ref8.apply(this, arguments);
    };
  }());
  this.props = props;
};

exports.default = QiwiBot;