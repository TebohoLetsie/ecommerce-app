import React from "react"
import './bootstrap.min.css'
import {Provider} from 'react-redux'
import store from './store'
import './index.css'
import ReactDOM from "react-dom"
import App from "./App";





ReactDOM.render(
<Provider store={store}>
<App />
</Provider>
,document.getElementById("root"));