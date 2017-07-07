'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Provider = function (_React$Component) {
  _inherits(Provider, _React$Component);

  // Even though we're using flow, also use PropTypes so we can take advantage of developer warnings.
  function Provider(props) {
    _classCallCheck(this, Provider);

    var _this = _possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).call(this, props));

    if (!window.Stripe) {
      throw new Error('Please load Stripe.js (https://js.stripe.com/v3/) on this page to use react-stripe-elements.');
    }

    var _this$props = _this.props,
        apiKey = _this$props.apiKey,
        children = _this$props.children,
        options = _objectWithoutProperties(_this$props, ['apiKey', 'children']);

    _this._stripe = window.Stripe(apiKey, options);
    _this._didWarn = false;
    return _this;
  }

  _createClass(Provider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        stripe: this._stripe
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this._didWarn && this.props.apiKey !== nextProps.apiKey && window.console && window.console.error) {
        this._didWarn = true;
        console.error('StripeProvider does not support changing the apiKey parameter.'); // eslint-disable-line no-console
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.Children.only(this.props.children);
    }
  }]);

  return Provider;
}(_react2.default.Component);

Provider.propTypes = {
  apiKey: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.any
};
Provider.childContextTypes = {
  stripe: _propTypes2.default.object.isRequired
};
exports.default = Provider;