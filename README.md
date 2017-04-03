# react-input-datetime-local
Native call <input type='datetime-local'> and display date by own format.

For building you can use [Webpack](https://webpack.github.io/) or something like it.

## Install
``` js
npm install react-input-datetime-local --save-dev
```

## Usage
Create your style file:
``` css
.my-class input {
    position: absolute;
    left: -10000px;
    top: -10000px;
}
```

and then create .js file:
``` js
import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import InputDatetimeLocal from 'react-input-datetime-local';


function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

function myFormat(date) {
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
                    output={myFormat(new Date(this.state.date))}
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

```

Add to html page you generated script and open page:
```
<script src='my-bundle.js'></script>
```

## API
### className
Add css class to generated html.

### output
Add output value with specific format.

### onChange
Adds the listener function. Triggered when value is change.

### parent
Parent of component (needs to call onChange event with parent context).

### value
Value of input.

### min and max
Min and max value which user can set in input.