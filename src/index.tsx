import ReactDOM from 'react-dom'
// import { config } from 'dotenv'
import 'react-datepicker/dist/react-datepicker.css'
// import './adminlte.min.css'
import ExternalApp from './manifest'
import App from './core/App'
import * as serviceWorker from './serviceWorker'

if (process.env.NODE_ENV !== 'development') {
  // console mati
  console.log = function () {}
}

const exApp = ExternalApp()
// config()

ReactDOM.render(
  App(exApp),
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
