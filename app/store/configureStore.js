import { createStore, applyMiddleware } from 'redux'; 
import thunk from 'redux-thunk';
import reducer from '../reducers';


const store = createStore(
	reducer,
	applyMiddleware(thunk)
);

// const finalCreatStore = applyMiddleware(thunk)(createStore);
// const store = finalCreatStore(reducer);

let unsubscribe = store.subscribe( () => {
	
} );
export default store


