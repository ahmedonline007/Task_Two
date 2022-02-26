import React, { Component } from 'react';
import Router from './router';
import 'toastr/build/toastr.min.css';


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Router />
        );
    }
}
