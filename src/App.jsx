import React, { Component } from 'react';
import './styles/app.styl';
// App can't be stateless component
export default class App extends Component {
    constructor(...args) {
        super(...args);
        this.state = {

        };
    }

    render() {
        return (
            <div className="app">
            hello World
          </div>
        );
    }
}
