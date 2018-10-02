import React from 'react';
import ReactDOM from 'react-dom';


// importa el App.js (archivo principal del frontend app)
import App from './App'; 



// el objeto App se va a montar en donde haya un div con id = app.
ReactDOM.render(<App/>, document.getElementById('app')); 