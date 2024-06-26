import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './index.css';
import { store } from './app/store'; 
import { Provider } from 'react-redux'; 

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
