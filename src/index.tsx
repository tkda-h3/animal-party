import * as React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import App from 'components/App'
import AppReducer from 'modules/App/'
import registerServiceWorker from 'registerServiceWorker';
import 'style/index.css';

const store = createStore(AppReducer);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker();
