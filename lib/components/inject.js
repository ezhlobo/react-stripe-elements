'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

// react-redux does a bunch of stuff with pure components / checking if it needs to re-render.
// not sure if we need to do the same.
var inject = function inject(WrappedComponent) {
  var _class, _temp;

  return _temp = _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class(props, context) {
      _classCallCheck(this, _class);

      if (!context || !context.registeredElements) {
        throw new Error('It looks like you are trying to inject Stripe context outside of an Elements context.\nPlease be sure the component that calls createSource or createToken is within an <Elements> component.');
      }

      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props, context));

      _this.findElement = function (specifiedType) {
        // Find the correct one!
        var allElements = _this.context.registeredElements || [];
        var matchingElements = specifiedType && typeof specifiedType === 'string' ? allElements.filter(function (_ref) {
          var type = _ref.type;
          return type === specifiedType;
        }) : allElements;

        if (matchingElements.length === 1) {
          return matchingElements[0].element;
        } else {
          throw new Error('You did not specify the type of Source or Token to create.\n        We could not infer which Element you want to use for this operation.');
        }
      };

      _this.wrappedCreateToken = function () {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        if (options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
          var type = options.type,
              rest = _objectWithoutProperties(options, ['type']);

          var element = _this.findElement(type);
          return _this.context.stripe.createToken(element, rest);
        } else {
          throw new Error('Invalid options passed to createToken. Expected an object, got ' + (options === null ? 'null' : typeof options === 'undefined' ? 'undefined' : _typeof(options)) + '.');
        }
      };

      _this.wrappedCreateSource = function (options) {
        if (options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
          var type = options.type,
              rest = _objectWithoutProperties(options, ['type']); // eslint-disable-line no-unused-vars


          var element = _this.findElement(type);
          return _this.context.stripe.createSource(element, rest);
        } else {
          throw new Error('Invalid options passed to createToken. Expected an object, got ' + (typeof options === 'undefined' ? 'undefined' : _typeof(options)) + '.');
        }
      };

      return _this;
    }

    _createClass(_class, [{
      key: 'stripeProps',
      value: function stripeProps() {
        return _extends({}, this.context.stripe, {
          // These are the only functions that take elements.
          createToken: this.wrappedCreateToken,
          createSource: this.wrappedCreateSource
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, { stripe: this.stripeProps() }));
      }
    }]);

    return _class;
  }(_react2.default.Component), _class.contextTypes = {
    stripe: _propTypes2.default.object.isRequired,
    registeredElements: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      element: _propTypes2.default.object.isRequired,
      type: _propTypes2.default.string.isRequired
    }))
  }, _class.displayName = 'InjectStripe(' + (WrappedComponent.displayName || WrappedComponent.name || 'Component') + ')', _temp;
};

exports.default = inject;