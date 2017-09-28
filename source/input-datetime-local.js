'use strict';

import React, {PureComponent} from 'react';


function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

function toISOString(date = new Date()) {
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds());
}

export default class InputDatetimeLocal extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.refs.input.click(); // Android.
        this.refs.input.focus(); // iOS.
    }

    onChange(event) {
        let date = new Date(event.target.value);
        let timezoneOffset = date.getTimezoneOffset() / 60;

        if (timezoneOffset < 0) {
            date.setHours(date.getHours() + timezoneOffset);
        } else {
            date.setHours(date.getHours() - timezoneOffset);
        }

        let value = date.getTime();

        if (!isNaN(value)) {
            if (value < parseInt(this.props.min)) {
                value = this.props.min;
            } else if (value > parseInt(this.props.max)) {
                value = this.props.max;
            }

            this.setState({ value });

            this.props.onChange.call(this.props.parent, value, this);
        }
    }

    render() {
        return (
            <div className={this.props.className} onClick={this.onClick}>
                {this.props.output || toISOString(new Date(this.props.value))}
                <input className="hidden" type={this.props.type || "datetime-local"} ref="input" value={toISOString(new Date(this.props.value))}
                       name={this.props.name || ''}
                       onChange={this.onChange} /*min={toISOString(this.props.min)} max={toISOString(this.props.max, true)}*/ />
            </div>
        )
    }
}

