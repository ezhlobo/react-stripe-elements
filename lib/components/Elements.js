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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Elements = function (_React$Component) {
  _inherits(Elements, _React$Component);

  function Elements(props, context) {
    _classCallCheck(this, Elements);

    var _this = _possibleConstructorReturn(this, (Elements.__proto__ || Object.getPrototypeOf(Elements)).call(this, props, context));

    _this.handleRegisterElement = function (type, element) {
      _this.setState(function (prevState) {
        return {
          registeredElements: [].concat(_toConsumableArray(prevState.registeredElements), [{ type: type, element: element }])
        };
      });
    };

    _this.handleUnregisterElement = function (el) {
      _this.setState(function (prevState) {
        return {
          registeredElements: prevState.registeredElements.filter(function (_ref) {
            var element = _ref.element;
            return element !== el;
          })
        };
      });
    };

    var _this$props = _this.props,
        children = _this$props.children,
        options = _objectWithoutProperties(_this$props, ['children']);

    _this._elements = _this.context.stripe.elements(options);

    _this.state = {
      registeredElements: []
    };
    return _this;
  }

  _createClass(Elements, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        elements: this._elements,
        registerElement: this.handleRegisterElement,
        unregisterElement: this.handleUnregisterElement,
        registeredElements: this.state.registeredElements
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.Children.only(this.props.children);
    }
  }]);

  return Elements;
}(_react2.default.Component);

Elements.childContextTypes = {
  elements: _propTypes2.default.object.isRequired,
  registerElement: _propTypes2.default.func.isRequired,
  unregisterElement: _propTypes2.default.func.isRequired,
  registeredElements: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    type: _propTypes2.default.string.isRequired,
    element: _propTypes2.default.object.isRequired
  })).isRequired
};
Elements.contextTypes = {
  stripe: _propTypes2.default.object.isRequired
};
exports.default = Elements;