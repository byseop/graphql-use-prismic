import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules';
import MainRoute from './route/MainRoute';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainRoute />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
