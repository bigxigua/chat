import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import './global/global.js' 
import store from './store/configureStore.js';

import './scss/main.scss'
import '../node_modules/uiw-iconfont/fonts/w-iconfont.css'

import Bundle from './Page/bundle.jsx'

import Index from 'bundle-loader?lazy!./Page/index/index.js';
import Login from './Page/login/login.js';
import Register from './Page/register/register.js'

TBZ.calcRootSize();

const IndexBundle = () => (
	<Bundle load={Index}>
		{(IndexBundle) => <IndexBundle />}
	</Bundle>
);

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render(){
		return (
			<div>
				<Router>
						<div className='container'>
							<Route exact path="/" component={IndexBundle} />
							<Route path="/login" component={Login} />
							<Route path="/register" component={Register} />
						</div>		
				</Router>
			</div>
		)
	}
}


ReactDOM.render(
	<Provider store={store}>
		<div>
			<App />
		</div>
	</Provider>,
	document.getElementById('root')
);
