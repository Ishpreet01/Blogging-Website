import React from 'react'; //main library
import ReactDOM from 'react-dom/client'; //helps to run the application on the browser
import './index.css';
import App from './App';  //the code written in app.js gets imported and rendered here in an element which has id=root
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
