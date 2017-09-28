'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { PureComponent } from 'react';

function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

function toISOString() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + 'T' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
}

var InputDatetimeLocal = function (_PureComponent) {
    _inherits(InputDatetimeLocal, _PureComponent);

    function InputDatetimeLocal(props) {
        _classCallCheck(this, InputDatetimeLocal);

        var _this = _possibleConstructorReturn(this, (InputDatetimeLocal.__proto__ || Object.getPrototypeOf(InputDatetimeLocal)).call(this, props));

        _this.state = {
            value: props.value
        };

        _this.onChange = _this.onChange.bind(_this);
        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }

    _createClass(InputDatetimeLocal, [{
        key: 'onClick',
        value: function onClick() {
            this.refs.input.click(); // Android.
            this.refs.input.focus(); // iOS.
        }
    }, {
        key: 'onChange',
        value: function onChange(event) {
            var date = new Date(event.target.value);
            var timezoneOffset = date.getTimezoneOffset() / 60;

            if (timezoneOffset < 0) {
                date.setHours(date.getHours() + timezoneOffset);
            } else {
                date.setHours(date.getHours() - timezoneOffset);
            }

            var value = date.getTime();

            if (!isNaN(value)) {
                if (value < parseInt(this.props.min)) {
                    value = this.props.min;
                } else if (value > parseInt(this.props.max)) {
                    value = this.props.max;
                }

                this.setState({ value: value });

                this.props.onChange.call(this.props.parent, value, this);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: this.props.className, onClick: this.onClick },
                this.props.output || toISOString(new Date(this.props.value)),
                React.createElement('input', { className: 'hidden', type: 'datetime-local', ref: 'input', value: toISOString(new Date(this.props.value)),
                    name: this.props.name || '',
                    onChange: this.onChange /*min={toISOString(this.props.min)} max={toISOString(this.props.max, true)}*/ })
            );
        }
    }]);

    return InputDatetimeLocal;
}(PureComponent);

export default InputDatetimeLocal;
