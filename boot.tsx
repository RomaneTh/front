import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './src/components/Routes';

// Polyfills
import 'whatwg-fetch';
import './src/polyfills/object-assign';
import './src/polyfills/array-find';

// Styles
import './src/styles/global.css';

ReactDOM.render(
    <Router>
        <Routes />
    </Router>,
    document.getElementById("app")
);

// Allow Hot Module Reloading
declare var module: any;
if (module.hot) {
    module.hot.accept();
}
