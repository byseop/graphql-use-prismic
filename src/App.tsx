import React from 'react';
import Test from './components/Test';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules';

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <Test />
    </Provider>
  );
}

export default App;
