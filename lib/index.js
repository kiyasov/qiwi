"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var QiwiBot = function QiwiBot(props) {
  var _this = this;

  _classCallCheck(this, QiwiBot);

  _defineProperty(this, "sendAuthenticatedRequest",
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref) {
      var _ref$method, method, url, _ref$data, data, accessToken, _ref3, response;

      return regeneratorRuntime.wrap(function _callee$(_context) {
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

  _defineProperty(this, "accountInfo",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _this.sendAuthenticatedRequest({
              method: "get",
              url: "/person-profile/v1/profile/current"
            });

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })));

  _defineProperty(this, "balanceInfo",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var personId;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            personId = _this.props.personId;
            _context3.next = 3;
            return _this.sendAuthenticatedRequest({
              method: "get",
              url: "/funding-sources/v2/persons/".concat(personId, "/accounts")
            });

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  })));

  _defineProperty(this, "processPayment",
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(_ref6) {
      var pattern_id, data;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              pattern_id = _ref6.pattern_id, data = _ref6.data;
              _context4.next = 3;
              return _this.sendAuthenticatedRequest({
                url: "/sinap/api/v2/terms/".concat(pattern_id, "/payments"),
                data: data
              });

            case 3:
              return _context4.abrupt("return", _context4.sent);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function (_x2) {
      return _ref7.apply(this, arguments);
    };
  }());

  this.props = props;
};

exports.default = QiwiBot;