import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules';

export default function WrapRootElement({ element }: { element: ReactElement }) {
  // 전체 프로젝트 Wrapper
  const store = createStore(rootReducer);
  return <Provider store={store}>{element}</Provider>;
}
