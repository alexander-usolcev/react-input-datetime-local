'use strict';

import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import InputDatetimeLocal from './input-datetime-local';

function myFormat(date) {
    function pad(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }

    return 'myFormat is: ' + date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds());
}

class App extends PureComponent {
    constructor() {
        super();

        this.state = {
            date: Date.now()
        };

        this.updateState = this.updateState.bind(this);
    }

    updateState(date) {
        this.setState({ date });
    }

    render() {
        return (
            <div>
                Click the date below in phone (android or ios): <br/>
                <InputDatetimeLocal
                    className="my-class"
                    text={myFormat(new Date(this.state.date))}
                    parent={this}
                    value={this.state.date}
                    min={this.state.date - 2592000000 * 10} // 300 days.
                    max={Date.now()}
                    onChange={this.updateState}
                />

                <br/>

                min: Date.now() - 300 days <br />
                max: Date.now() <br />

            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app'));



