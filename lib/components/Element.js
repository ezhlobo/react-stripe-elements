'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shallowEqual = require('../utils/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var noop = function noop() {};

var Element = function Element(type) {
  var _class, _temp;

  var hocOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _temp = _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class(props, context) {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props, context));

      _this.handleRef = function (ref) {
        _this._ref = ref;
      };

      var options = _this._extractOptions(_this.props);
      _this._element = _this.context.elements.create(type, options);
      _this._setupEventListeners();
      _this._options = options;
      return _this;
    }

    _createClass(_class, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this._element.mount(this._ref);
        if (hocOptions.sourceType) {
          this.context.registerElement(hocOptions.sourceType, this._element);
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var options = this._extractOptions(nextProps);
        if (Object.keys(options).length !== 0 && !(0, _shallowEqual2.default)(options, this._options)) {
          this._options = options;
          this._element.update(options);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this._element.destroy();
        this.context.unregisterElement(this._element);
      }
    }, {
      key: '_setupEventListeners',
      value: function _setupEventListeners() {
        var _this2 = this;

        this._element.on('ready', function () {
          _this2.props.elementRef(_this2._element);
          _this2.props.onReady();
        });

        this._element.on('change', function (change) {
          _this2.props.onChange(change);
        });

        this._element.on('blur', function () {
          var _props;

          return (_props = _this2.props).onBlur.apply(_props, arguments);
        });
        this._element.on('focus', function () {
          var _props2;

          return (_props2 = _this2.props).onFocus.apply(_props2, arguments);
        });
      }
    }, {
      key: '_extractOptions',
      value: function _extractOptions(props) {
        var elementRef = props.elementRef,
            onChange = props.onChange,
            onFocus = props.onFocus,
            onBlur = props.onBlur,
            onReady = props.onReady,
            options = _objectWithoutProperties(props, ['elementRef', 'onChange', 'onFocus', 'onBlur', 'onReady']);

        return options;
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement('span', { ref: this.handleRef });
      }
    }]);

    return _class;
  }(_react2.default.Component), _class.propTypes = {
    elementRef: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onBlur: _propTypes2.default.func,
    onFocus: _propTypes2.default.func,
    onReady: _propTypes2.default.func
  }, _class.defaultProps = {
    elementRef: noop,
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    onReady: noop
  }, _class.contextTypes = {
    elements: _propTypes2.default.object.isRequired,
    registerElement: _propTypes2.default.func.isRequired,
    unregisterElement: _propTypes2.default.func.isRequired
  }, _temp;
};

exports.default = Element;