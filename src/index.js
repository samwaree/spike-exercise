import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import { Switch, Route } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store, history } from './redux/store'
import 'typeface-roboto'

window.store = store

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </ConnectedRouter>
    </Provider>), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
